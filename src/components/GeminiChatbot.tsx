import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  Cpu,
  Zap,
  Flame,
  CornerDownLeft,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: (prefillService?: string) => void;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [model, setModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon'>('gemini-3.8-flash');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'initial',
      role: 'model',
      content:
        "Hello! I'm Sammy Leumas's interactive Studio Copilot powered by Gemini. Ask me about Sammy's featured projects (InvoiceFlow, SL-LAUNCHER, SL-TAXI-DRIVER), engineering approach, services, or how to collaborate on a new build starting at $500.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      // Send conversation history to server endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned status ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "I couldn't process that response. Please try asking again.";

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMsg(err?.message || 'Failed to connect to the Gemini service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'initial',
        role: 'model',
        content:
          "Conversation cleared. How can I assist you with Sammy's portfolio, technical case studies, or design offerings?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorMsg(null);
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samplePrompts = [
    'Tell me about InvoiceFlow & SL-TAXI-DRIVER',
    'What services are available for a $500 project?',
    "Explain Sammy's working philosophy",
    'How do SL-TECHCO and SL-DESIGN collaborate?',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl h-[88vh] sm:h-[680px] bg-[#0E1018] border border-white/15 rounded-t-3xl sm:rounded-3xl flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#131622] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Sammy&apos;s Studio Copilot</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">
                  Gemini AI
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Multi-Turn Creative &amp; Technical Assistant
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={clearChat}
              title="Reset Conversation"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close Chat"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selector Bar */}
        <div className="px-4 py-2.5 bg-[#0A0C13] border-b border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500 uppercase tracking-wider text-[10px] hidden sm:inline">
            Model Engine:
          </span>
          <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-start">
            <button
              type="button"
              onClick={() => setModel('gemini-3.8-flash')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-[11px] ${
                model === 'gemini-3.8-flash'
                  ? 'bg-[#38BDF8] text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>3.8-Flash (General)</span>
            </button>

            <button
              type="button"
              onClick={() => setModel('gemini-3.1-flash-lite')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-[11px] ${
                model === 'gemini-3.1-flash-lite'
                  ? 'bg-emerald-400 text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>3.1-Lite (Fast)</span>
            </button>

            <button
              type="button"
              onClick={() => setModel('gemini-4-argon')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-[11px] ${
                model === 'gemini-4-argon'
                  ? 'bg-purple-400 text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>4-Argon (Complex)</span>
            </button>
          </div>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center shrink-0 text-[#38BDF8] mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-white text-slate-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-[#151824] border border-white/10 text-slate-200 rounded-tl-none shadow-lg'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  <div
                    className={`mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-mono ${
                      isUser
                        ? 'border-slate-200/50 text-slate-500'
                        : 'border-white/5 text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => copyMessage(msg.id, msg.content)}
                        className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center shrink-0 text-[#38BDF8]">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-[#151824] border border-white/10 text-xs sm:text-sm text-slate-300 rounded-tl-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[#38BDF8] animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                />
                <span className="text-[11px] font-mono text-slate-400 ml-1">
                  Synthesizing with {model}...
                </span>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center justify-between">
              <span>{errorMsg}</span>
              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="inline-flex items-center gap-1 underline font-mono cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        {messages.length <= 2 && !isLoading && (
          <div className="px-4 py-2 border-t border-white/5 flex gap-1.5 overflow-x-auto pb-2">
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/25 text-[11px] text-slate-300 whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-[#111420] border-t border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask anything about Sammy's work or technology..."
              className="flex-1 bg-[#090A0F] border border-white/15 focus:border-[#38BDF8] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 active:scale-95 disabled:opacity-40 transition-all cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 font-mono">
            <span>Powered by Gemini · Full conversation history</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenContact('Inquiry via Gemini Copilot');
              }}
              className="hover:text-white underline cursor-pointer"
            >
              Open Direct Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatbot;
