import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, Headphones } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Message } from '../../types';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { useLanguage, LANGUAGES } from '../../lib/LanguageContext';
import { VoiceAssistant } from './VoiceAssistant';

interface EvaluatorChatProps {
  onComplete: (data: any) => void;
}

export const EvaluatorChat: React.FC<EvaluatorChatProps> = ({ onComplete }) => {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  // Initialize/Reset Chat when language changes
  useEffect(() => {
    // Reset messages for the new language
    setMessages([{
      id: 'init',
      role: 'bot',
      content: t('chat_initial'),
      timestamp: new Date()
    }]);

    if (!process.env.API_KEY) {
      console.error("API_KEY is missing");
      return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

    // Construct dynamic system prompt based on language
    const currentLangName = LANGUAGES.find(l => l.code === language)?.name || 'English';
    
    const systemPrompt = `
      Act as EmigraBot, an expert immigration consultant for Spain.
      Your goal is to evaluate the viability of the user's case via a short interview.
      Current Language: ${currentLangName} (${language}). 
      YOU MUST SPEAK IN ${currentLangName.toUpperCase()}.
      
      The user has seen your greeting. Wait for their nationality.
      Ask questions ONE BY ONE. Do not overwhelm.
      Key questions: 1. Time in Spain, 2. Status (tourist/illegal/student), 3. Job offer/funds, 4. Criminal record.
      Keep a professional but warm tone.
      When you have the info, call 'complete_evaluation'.
    `;

    chatRef.current = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemPrompt,
        tools: [{ functionDeclarations: [evaluationTool] }],
      },
      history: [
        {
          role: 'model',
          parts: [{ text: t('chat_initial') }],
        }
      ]
    });
  }, [language]); // Re-run when language changes

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isTyping || !chatRef.current) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatRef.current.sendMessage({ message: text });
      
      // Handle Function Calls (Completion)
      const calls = result.functionCalls;
      if (calls && calls.length > 0) {
        const call = calls[0];
        if (call.name === 'complete_evaluation') {
          const args = call.args as any;
          
          // Show a final closing message
          const closingMsg = t('chat_analyzing');
          setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: closingMsg, timestamp: new Date() }]);
          
          setTimeout(() => {
             onComplete({ 
               status: 'success', 
               viability: args.viabilityScore, 
               summary: args.summary 
             });
          }, 1500);
          setIsTyping(false);
          return;
        }
      }

      // Handle Text Response
      if (result.text) {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: result.text, timestamp: new Date() }]);
      }

    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: t('chat_error'), timestamp: new Date() }]);
    }

    setIsTyping(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto h-[600px] flex flex-col overflow-hidden shadow-xl border-0 relative">
      {/* Voice Assistant Overlay */}
      {isVoiceMode && (
          <VoiceAssistant 
            onClose={() => setIsVoiceMode(false)} 
            onComplete={onComplete}
          />
      )}

      <div className="bg-primary p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
            <Bot className="w-6 h-6" />
            </div>
            <div>
            <h3 className="font-bold">{t('nav_evaluator')}</h3>
            <p className="text-xs text-blue-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse"/> {language === 'es' ? 'En línea' : 'Online'} (Gemini 2.5)
            </p>
            </div>
        </div>
        
        <Button 
            size="sm" 
            className="bg-secondary hover:bg-secondary/90 text-white border-0"
            onClick={() => setIsVoiceMode(true)}
        >
            <Headphones size={16} className="mr-2" />
            {t('voice_start')}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'bot' ? "bg-primary text-white" : "bg-gray-300 text-gray-600"
            )}>
              {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={cn(
              "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
              msg.role === 'bot' ? "bg-white text-text-primary rounded-tl-none" : "bg-primary text-white rounded-tr-none"
            )}>
              {msg.content}
              <div className={cn("text-[10px] mt-1 opacity-70", msg.role === 'user' ? "text-right" : "")}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0"><Bot size={16} /></div>
             <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"/>
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"/>
               <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"/>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('chat_placeholder')}
            disabled={isTyping}
            className="flex-1 bg-gray-100 border-0 rounded-lg px-4 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <Button onClick={() => handleSend()} disabled={isTyping || !input.trim()}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </Card>
  );
};