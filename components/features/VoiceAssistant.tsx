import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from "@google/genai";
import { Mic, MicOff, X, Activity } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage, LANGUAGES } from '../../lib/LanguageContext';
import { base64ToUint8Array, floatTo16BitPCM, arrayBufferToBase64 } from '../../lib/audioUtils';

interface VoiceAssistantProps {
  onClose: () => void;
  onComplete: (data: any) => void;
}

// Detect mobile devices and iOS
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose, onComplete }) => {
  const { language, t } = useLanguage();
  const [status, setStatus] = useState<'connecting' | 'listening' | 'speaking' | 'error'>('connecting');
  const [volume, setVolume] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Refs for audio handling to avoid re-renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | AudioWorkletNode | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null); // To store the active session
  const streamRef = useRef<MediaStream | null>(null);
  const useWorkletRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const startSession = async () => {
      try {
        if (!process.env.API_KEY) {
          throw new Error("API Key missing");
        }

        // 1. Request microphone permissions with mobile-friendly constraints
        console.log('[VoiceAssistant] Requesting microphone access...');

        const constraints: MediaStreamConstraints = {
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            // Mobile-optimized settings
            sampleRate: isIOS ? { ideal: 16000 } : 16000,
            channelCount: 1
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        console.log('[VoiceAssistant] Microphone access granted');

        // 2. Create AudioContext with mobile workarounds
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

        // Input Context (16kHz for Gemini)
        const inputCtx = new AudioContextClass({
          sampleRate: 16000,
          latencyHint: 'interactive'
        });
        audioContextRef.current = inputCtx;

        // CRITICAL for iOS: Resume AudioContext (it starts suspended on mobile)
        if (inputCtx.state === 'suspended') {
          console.log('[VoiceAssistant] Resuming input AudioContext...');
          await inputCtx.resume();
        }

        // Output Context (24kHz for Gemini response)
        const outputCtx = new AudioContextClass({
          sampleRate: 24000,
          latencyHint: 'interactive'
        });
        outputContextRef.current = outputCtx;

        // CRITICAL for iOS: Resume output AudioContext
        if (outputCtx.state === 'suspended') {
          console.log('[VoiceAssistant] Resuming output AudioContext...');
          await outputCtx.resume();
        }

        console.log('[VoiceAssistant] AudioContexts ready:', {
          inputState: inputCtx.state,
          outputState: outputCtx.state,
          isMobile,
          isIOS
        });

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        // Tool for completion (same as text chat)
        const evaluationTool: FunctionDeclaration = {
            name: "complete_evaluation",
            description: "Call this function when you have gathered enough information (nationality, time in Spain, status, job offer, criminal record) to evaluate the case.",
            parameters: {
              type: Type.OBJECT,
              properties: {
                viabilityScore: { type: Type.NUMBER, description: "0-100 score representing case viability" },
                summary: { type: Type.STRING, description: "A brief summary of the evaluation" }
              },
              required: ["viabilityScore", "summary"]
            }
        };

        const currentLangName = LANGUAGES.find(l => l.code === language)?.name || 'English';
        
        const systemPrompt = `
          You are EmigraBot, an immigration expert for Spain. Short spoken interview.
          Speak in: ${currentLangName} (${language}).
          Ask 1 by 1: Nationality, time in Spain, legal status, job offer, criminal record.
          Be brief and conversational. If you have all data, call 'complete_evaluation'.
        `;

        // 2. Connect to Live API
        const sessionPromise = ai.live.connect({
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          config: {
            responseModalities: [Modality.AUDIO],
            systemInstruction: systemPrompt,
            tools: [{ functionDeclarations: [evaluationTool] }],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
            }
          },
          callbacks: {
            onopen: async () => {
              if (isMounted) setStatus('listening');

              console.log('[VoiceAssistant] Session opened, setting up audio pipeline...');

              // Start streaming microphone data
              const source = inputCtx.createMediaStreamSource(stream);
              inputSourceRef.current = source;

              // Try to use AudioWorklet (modern, mobile-friendly)
              // Fallback to ScriptProcessorNode if not available
              let processor: AudioWorkletNode | ScriptProcessorNode;

              try {
                // Try AudioWorklet first (better for mobile)
                await inputCtx.audioWorklet.addModule('/audio-processor.js');
                processor = new AudioWorkletNode(inputCtx, 'audio-capture-processor');
                useWorkletRef.current = true;

                // Handle messages from AudioWorklet
                processor.port.onmessage = (event) => {
                  const inputData = event.data.audioData as Float32Array;

                  // Calculate volume for visualizer
                  let sum = 0;
                  for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
                  const rms = Math.sqrt(sum / inputData.length);
                  if (isMounted) setVolume(Math.min(rms * 5, 1));

                  // Convert to PCM 16-bit and send
                  const pcmData = floatTo16BitPCM(inputData);
                  const base64Data = arrayBufferToBase64(pcmData);

                  sessionPromise.then(session => {
                    session.sendRealtimeInput({
                      media: {
                        mimeType: "audio/pcm;rate=16000",
                        data: base64Data
                      }
                    });
                  });
                };

                console.log('[VoiceAssistant] Using AudioWorklet (optimal for mobile)');
              } catch (workletError) {
                // Fallback to ScriptProcessorNode (deprecated but widely supported)
                console.warn('[VoiceAssistant] AudioWorklet not available, using ScriptProcessorNode fallback', workletError);

                // Use smaller buffer for mobile (better latency)
                const bufferSize = isMobile ? 2048 : 4096;
                processor = inputCtx.createScriptProcessor(bufferSize, 1, 1);

                (processor as ScriptProcessorNode).onaudioprocess = (e) => {
                  const inputData = e.inputBuffer.getChannelData(0);

                  // Calculate volume for visualizer
                  let sum = 0;
                  for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
                  const rms = Math.sqrt(sum / inputData.length);
                  if (isMounted) setVolume(Math.min(rms * 5, 1));

                  // Convert to PCM 16-bit
                  const pcmData = floatTo16BitPCM(inputData);
                  const base64Data = arrayBufferToBase64(pcmData);

                  sessionPromise.then(session => {
                    session.sendRealtimeInput({
                      media: {
                        mimeType: "audio/pcm;rate=16000",
                        data: base64Data
                      }
                    });
                  });
                };
              }

              // Connect audio pipeline
              source.connect(processor);
              processor.connect(inputCtx.destination);

              processorRef.current = processor;
              console.log('[VoiceAssistant] Audio pipeline connected');
            },
            onmessage: async (msg: LiveServerMessage) => {
               // Handle Tool Calls (Completion)
               if (msg.toolCall) {
                   for (const call of msg.toolCall.functionCalls) {
                       if (call.name === 'complete_evaluation') {
                           const args = call.args as any;
                           sessionPromise.then(s => s.sendToolResponse({
                               functionResponses: {
                                   id: call.id,
                                   name: call.name,
                                   response: { result: "ok" }
                               }
                           }));
                           
                           // End session and trigger completion
                           if (isMounted) {
                               onClose();
                               onComplete({
                                   status: 'success',
                                   viability: args.viabilityScore,
                                   summary: args.summary
                               });
                           }
                           return;
                       }
                   }
               }

               // Handle Audio Output
               const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
               if (audioData) {
                 if (isMounted) setStatus('speaking');
                 
                 const audioCtx = outputContextRef.current;
                 if (!audioCtx) return;

                 const audioBytes = base64ToUint8Array(audioData);
                 
                 // Manual decoding of PCM 24kHz (1 channel)
                 // Or use decodeAudioData if header was present, but raw PCM needs manual buffer creation
                 // The API returns raw PCM 16-bit 24kHz usually.
                 // Let's interpret as Int16 Little Endian
                 const int16Data = new Int16Array(audioBytes.buffer);
                 const float32Data = new Float32Array(int16Data.length);
                 for (let i = 0; i < int16Data.length; i++) {
                     float32Data[i] = int16Data[i] / 32768.0;
                 }

                 const audioBuffer = audioCtx.createBuffer(1, float32Data.length, 24000);
                 audioBuffer.getChannelData(0).set(float32Data);

                 const source = audioCtx.createBufferSource();
                 source.buffer = audioBuffer;
                 source.connect(audioCtx.destination);
                 
                 // Schedule playback
                 const currentTime = audioCtx.currentTime;
                 const startTime = Math.max(currentTime, nextStartTimeRef.current);
                 source.start(startTime);
                 nextStartTimeRef.current = startTime + audioBuffer.duration;
                 
                 sourcesRef.current.add(source);
                 source.onended = () => {
                     sourcesRef.current.delete(source);
                     if (sourcesRef.current.size === 0 && isMounted) {
                         setStatus('listening');
                     }
                 };
               }
               
               // Handle Interruption
               if (msg.serverContent?.interrupted) {
                   sourcesRef.current.forEach(s => s.stop());
                   sourcesRef.current.clear();
                   nextStartTimeRef.current = 0;
                   if (isMounted) setStatus('listening');
               }
            },
            onclose: () => {
                console.log("Session closed");
            },
            onerror: (err) => {
                console.error("Live API Error", err);
                if (isMounted) setStatus('error');
            }
          }
        });
        
        sessionRef.current = await sessionPromise;

      } catch (e: any) {
        console.error("[VoiceAssistant] Failed to start voice session", e);

        if (isMounted) {
          setStatus('error');

          // Provide specific error messages for common mobile issues
          if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
            setErrorMessage(
              isIOS
                ? 'Por favor, permite el acceso al micrófono en Ajustes > Safari > Micrófono'
                : 'Permiso de micrófono denegado. Por favor, permite el acceso en la configuración de tu navegador.'
            );
          } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
            setErrorMessage('No se encontró ningún micrófono. Verifica que tu dispositivo tenga un micrófono habilitado.');
          } else if (e.name === 'NotReadableError' || e.name === 'TrackStartError') {
            setErrorMessage(
              'El micrófono está siendo usado por otra aplicación. Cierra otras apps que usen el micrófono e intenta de nuevo.'
            );
          } else if (e.message?.includes('API Key')) {
            setErrorMessage('Error de configuración: API Key no encontrada.');
          } else {
            setErrorMessage(
              isMobile
                ? 'Error al iniciar el asistente de voz. Intenta recargar la página o usa el modo de texto.'
                : 'Error al conectar con el asistente de voz. Por favor, verifica tu micrófono y conexión.'
            );
          }
        }
      }
    };

    startSession();

    return () => {
      isMounted = false;
      console.log('[VoiceAssistant] Cleaning up...');

      // Cleanup
      if (sessionRef.current) {
        try {
          // sessionRef.current.close(); // If available in future
        } catch (e) {
          console.warn('[VoiceAssistant] Error closing session:', e);
        }
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log('[VoiceAssistant] Stopped track:', track.kind);
        });
      }

      if (processorRef.current) {
        try {
          processorRef.current.disconnect();

          // Clean up based on processor type
          if (useWorkletRef.current) {
            // AudioWorkletNode cleanup
            const workletNode = processorRef.current as AudioWorkletNode;
            if (workletNode.port) {
              workletNode.port.onmessage = null;
            }
          } else {
            // ScriptProcessorNode cleanup
            const scriptNode = processorRef.current as ScriptProcessorNode;
            scriptNode.onaudioprocess = null;
          }
        } catch (e) {
          console.warn('[VoiceAssistant] Error disconnecting processor:', e);
        }
      }

      if (inputSourceRef.current) {
        try {
          inputSourceRef.current.disconnect();
        } catch (e) {
          console.warn('[VoiceAssistant] Error disconnecting source:', e);
        }
      }

      // Stop all audio sources
      sourcesRef.current.forEach(source => {
        try {
          source.stop();
        } catch (e) {
          // Source may already be stopped
        }
      });
      sourcesRef.current.clear();

      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => {
          console.warn('[VoiceAssistant] Error closing input context:', e);
        });
      }

      if (outputContextRef.current) {
        outputContextRef.current.close().catch(e => {
          console.warn('[VoiceAssistant] Error closing output context:', e);
        });
      }

      console.log('[VoiceAssistant] Cleanup complete');
    };
  }, [language, onComplete, onClose]);

  return (
    <div className="absolute inset-0 bg-primary/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white animate-fade-in rounded-lg">
       <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition">
         <X size={24} />
       </button>
       
       <div className="mb-8 relative">
          {/* Pulsing Visualizer */}
          <div 
             className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400 to-secondary flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all duration-100 ease-out"
             style={{ 
                 transform: `scale(${1 + volume * 0.5})`,
                 opacity: status === 'speaking' ? 1 : 0.8
             }}
          >
             <Mic size={48} className="text-white drop-shadow-md" />
          </div>
          
          {/* Ripple Effects */}
          {status === 'listening' && (
             <>
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
             </>
          )}
       </div>
       
       <h3 className="text-2xl font-bold mb-2">
           {status === 'connecting' && t('voice_connecting')}
           {status === 'listening' && t('voice_listening')}
           {status === 'speaking' && t('voice_speaking')}
           {status === 'error' && t('voice_error')}
       </h3>
       
       <p className="text-blue-200 text-sm max-w-md text-center px-4">
         {status === 'error'
           ? (errorMessage || "Por favor verifica tu micrófono y conexión.")
           : t('voice_listening')}
       </p>

       {status === 'error' && isMobile && (
         <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg max-w-md mx-4">
           <p className="text-yellow-200 text-xs text-center">
             💡 <strong>Consejo móvil:</strong> Asegúrate de que ninguna otra app esté usando el micrófono.
             {isIOS && ' En iOS, recarga la página después de conceder permisos.'}
           </p>
         </div>
       )}

       <div className="mt-12 flex gap-4">
          <Button variant="danger" className="rounded-full px-8" onClick={onClose}>
             <MicOff size={18} className="mr-2" /> {t('voice_end')}
          </Button>
       </div>
    </div>
  );
};