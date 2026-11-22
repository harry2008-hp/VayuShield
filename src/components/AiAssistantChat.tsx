import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, ShieldCheck, AlertTriangle, RefreshCw } from 'lucide-react';
import { HouseholdProfile, EnvironmentalSnapshot } from '../types';
import { answerUserSmogQuery, ChatMessage } from '../infrastructure/ai/aiAssistant';

interface AiAssistantChatProps {
  profile: HouseholdProfile;
  env: EnvironmentalSnapshot;
  simpleMode: boolean;
}

export const AiAssistantChat: React.FC<AiAssistantChatProps> = ({ profile, env, simpleMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `Hello! I am **VayuShield AI**. In **${env.city}**, nocturnal radiative cooling has trapped severe smog at **${env.currentPblMeters}m** altitude. How can I help protect your household or plan your schedule today?`,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'How do I protect an infant or asthmatic child today?',
    'How do I build a DIY Corsi-Rosenthal box filter?',
    'When is it safe to open windows for ventilation?',
    'Do cloth or surgical masks protect against winter smog?',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await answerUserSmogQuery(text, profile, env);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response.text,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Sorry, I encountered an issue analyzing your request. Please try again.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4"
      aria-labelledby="ai-chat-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="ai-chat-heading" className="text-lg font-bold text-white tracking-tight">
              {simpleMode ? 'Ask the Clean Air AI' : 'GenAI Environmental Resilience Advisor'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Grounded in WHO air guidelines, ASHRAE standards, and verified atmospheric models.
          </p>
        </div>

        {/* Safety Badge */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/60 text-[11px] text-emerald-300 font-medium self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span>Non-Diagnostic Guardrail Active</span>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex flex-wrap gap-2 pt-1" role="region" aria-label="Quick questions">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 transition focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div 
        className="h-80 overflow-y-auto space-y-4 pr-1 focus:outline-none" 
        tabIndex={0}
        aria-label="Chat messages scroll area"
      >
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  isUser ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-emerald-400'
                }`}
                aria-hidden="true"
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>
                <div className={`text-[10px] mt-1.5 ${isUser ? 'text-emerald-200' : 'text-slate-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 animate-pulse p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            <span>Consulting atmospheric models and safety guardrails...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center space-x-2 pt-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={simpleMode ? 'Type a question about clean air...' : 'Ask about inversion timing, room air cleaning, or high-risk members...'}
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          aria-label="Chat input message"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center space-x-1 focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Send message"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </form>
    </section>
  );
};
