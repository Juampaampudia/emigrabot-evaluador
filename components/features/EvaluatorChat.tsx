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
      Interview flow (never skip steps):
        1. Time in Spain.
        2. LEGAL STATUS DEEP DIVE: always confirm the exact permit/visa (tourist, irregular, student, arraigo, etc.), whether it is valid or expired, and when it expires.
           - Ask follow-up questions until you have a precise picture of their legal situation before moving to any other topic.
           - If the answer is vague, explicitly ask for clarifications (type of document, expiry date, if they are overstaying, etc.).
        3. Job offer/funds.
        4. Criminal record.
      Keep a professional but warm tone.
      Summaries must explicitly mention the legal status you gathered.
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Voice Assistant Overlay */}
      {isVoiceMode && (
          <VoiceAssistant
            onClose={() => setIsVoiceMode(false)}
            onComplete={onComplete}
          />
      )}

      {/* Chat Container with Glassmorphism */}
      <Card className="flex flex-col overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl rounded-2xl h-[650px] relative">
        {/* Chat Header */}
        <div className="bg-primary/90 backdrop-blur-sm p-4 sm:p-5 flex items-center justify-between text-white border-b border-white/10">
          <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-full">
                <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">{t('nav_evaluator')}</h3>
                <p className="text-xs sm:text-sm text-gray-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"/>
                  {language === 'es' ? 'En línea' : 'Online'}
                </p>
              </div>
          </div>

          <Button
              size="sm"
              className="bg-secondary hover:bg-secondary-hover text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => setIsVoiceMode(true)}
          >
              <Headphones size={16} className="mr-2" />
              {t('voice_start')}
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-transparent via-white/5 to-white/10" ref={scrollRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-3 animate-slide-up", msg.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md",
                msg.role === 'bot' ? "bg-primary-dark text-white" : "bg-gray-200 text-gray-700"
              )}>
                {msg.role === 'bot' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={cn(
                "max-w-[75%] p-3.5 rounded-2xl text-sm shadow-lg backdrop-blur-sm",
                msg.role === 'bot'
                  ? "bg-gray-700/70 text-white rounded-tl-none border border-gray-600/30"
                  : "bg-primary text-white rounded-tr-none"
              )}>
                {msg.content}
                <div className={cn("text-[10px] mt-1.5 opacity-70", msg.role === 'user' ? "text-right" : "")}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 animate-slide-up">
               <div className="w-9 h-9 rounded-full bg-primary-dark text-white flex items-center justify-center shrink-0 shadow-md">
                 <Bot size={18} />
               </div>
               <div className="bg-gray-700/70 backdrop-blur-sm p-3.5 rounded-2xl rounded-tl-none shadow-lg flex gap-1.5 items-center border border-gray-600/30">
                 <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"/>
                 <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}/>
                 <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}/>
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-5 bg-primary-dark/80 backdrop-blur-md border-t border-white/10">
          <div className="flex gap-3 p-1 bg-primary-dark rounded-xl border-2 border-secondary shadow-2xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chat_placeholder')}
              disabled={isTyping}
              className="flex-1 bg-transparent border-0 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            />
            <Button
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className="bg-gray-600 hover:bg-gray-500 text-white border-0 rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
