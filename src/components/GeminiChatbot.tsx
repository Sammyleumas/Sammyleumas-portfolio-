import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { PERSONAL_INFO } from '../data/portfolioData';

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
        "Hello! I'm Sammy Leumas's interactive Studio Copilot powered by Gemini. Ask me about Sammy's featured projects (InvoiceFlow, SL-LAUNCHER, SL-TAXI-DRIVER, SL-DESIGN 3D WEBSITE), creative engineering approach, services, or how to collaborate on a new build starting at $500.",
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

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history for the endpoint
      const conversationHistory = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));
      conversationHistory.push({
        role: 'user',
        parts: [{ text }],
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationHistory,
          model,
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.text || 'I apologize, but I could not formulate a response. Please try again.';

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      // Offline fallback: intelligent local response generator based on portfolio knowledge
      const lower = text.toLowerCase();
      let fallback = '';

      if (lower.includes('invoice') || lower.includes('invoiceflow')) {
        fallback =
          "InvoiceFlow is Sammy's multi-user invoicing and cashflow SaaS concept with real-time tax staging, customizable PDF generation, and automated payment status tracking. Live preview is available at https://invoicefl.base44.app.";
      } else if (lower.includes('sl-design') || lower.includes('3d website')) {
        fallback =
          "SL-DESIGN 3D WEBSITE is Sammy's interactive 3D studio experience featuring custom WebGL shaders, kinetic magnetic hover interactions, and spatial typography. Live at https://sl-design-five.vercel.app.";
      } else if (lower.includes('taxi') || lower.includes('driver') || lower.includes('game')) {
        fallback =
          "SL-TAXI-DRIVER is a 3D browser taxi simulator running at 60 FPS using Three.js and custom physics. Live demo is accessible at https://sl-taxi-driver.vercel.app and directly playable inside the case study modal!";
      } else if (lower.includes('launcher') || lower.includes('android')) {
        fallback =
          "SL-LAUNCHER is a high-performance Android launcher built with Kotlin and Jetpack Compose, maintaining 120 FPS gesture navigation under a 38MB memory footprint.";
      } else if (lower.includes('price') || lower.includes('budget') || lower.includes('cost')) {
        fallback =
          "Sammy accepts commissions with project budgets starting at $500 for focused deliverables, up to comprehensive enterprise builds. Use the Contact section to specify your scope!";
      } else if (lower.includes('hire') || lower.includes('contact') || lower.includes('email') || lower.includes('phone')) {
        fallback = `You can reach Sammy Leumas directly at ${PERSONAL_INFO.email} or call ${PERSONAL_INFO.formattedPhone}. Alternatively, click 'Let's Talk' to submit a project brief.`;
      } else {
        fallback =
          "Sammy Leumas is a Creative Technologist, Web Developer, and Digital Designer behind SL-TECHCO and SL-DESIGN. He specializes in full-stack web applications, interactive 3D/WebGL experiences, and bespoke UI systems.";
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: fallback,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'initial',
        role: 'model',
        content: "Chat history cleared. How can I assist you with Sammy Leumas's work and services?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const copyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-xl h-[88vh] sm:h-[680px] border rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden transition-colors"
            style={{
              backgroundColor: 'var(--surface-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--card-shadow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="px-5 py-4 border-b flex items-center justify-between"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="relative w-10 h-10 rounded-xl overflow-hidden border shrink-0"
                  style={{
                    backgroundColor: 'var(--surface-card)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                  />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center text-white"
                    style={{
                      backgroundColor: 'var(--primary-accent)',
                      borderColor: 'var(--surface-secondary)',
                    }}
                  >
                    <Sparkles className="w-2 h-2" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                      Sammy&apos;s Studio Copilot
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold"
                      style={{
                        backgroundColor: 'var(--badge-bg)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--primary-accent)',
                      }}
                    >
                      Gemini AI
                    </span>
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                    Multi-Turn Creative &amp; Technical Assistant
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={clearChat}
                  title="Reset Conversation"
                  className="p-2 rounded-xl transition-colors cursor-pointer opacity-70 hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  title="Close Chat"
                  className="p-2 rounded-xl transition-colors cursor-pointer opacity-70 hover:opacity-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Model Selector Bar */}
            <div
              className="px-4 py-2 border-b flex items-center justify-between text-xs font-mono"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              <span className="uppercase tracking-wider text-[10px] hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
                Model Engine:
              </span>
              <div className="flex items-center gap-1 w-full sm:w-auto justify-between sm:justify-start">
                {[
                  { id: 'gemini-3.8-flash', label: '3.8-Flash (General)', icon: Zap },
                  { id: 'gemini-3.1-flash-lite', label: '3.1-Lite (Fast)', icon: Flame },
                  { id: 'gemini-4-argon', label: '4-Argon (Complex)', icon: Cpu },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setModel(item.id as any)}
                    className="px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer text-[11px] font-semibold"
                    style={{
                      backgroundColor: model === item.id ? 'var(--primary-accent)' : 'transparent',
                      color: model === item.id ? '#FFFFFF' : 'var(--text-secondary)',
                    }}
                  >
                    <item.icon className="w-3 h-3" />
                    <span>{item.label}</span>
                  </button>
                ))}
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
                      <div
                        className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-1"
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--primary-accent)',
                        }}
                      >
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isUser ? 'rounded-tr-none' : 'rounded-tl-none border'
                      }`}
                      style={{
                        backgroundColor: isUser ? 'var(--primary-accent)' : 'var(--surface-secondary)',
                        color: isUser ? '#FFFFFF' : 'var(--text-primary)',
                        borderColor: isUser ? 'transparent' : 'var(--border-color)',
                      }}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      <div
                        className="mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-mono opacity-80"
                        style={{ borderColor: 'var(--border-color)' }}
                      >
                        <span>{msg.timestamp}</span>

                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => copyMessage(msg.id, msg.content)}
                            className="inline-flex items-center gap-1 hover:opacity-100 transition-opacity cursor-pointer"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3" style={{ color: 'var(--color-success)' }} />
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
                      <div
                        className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-1"
                        style={{
                          backgroundColor: 'var(--surface-secondary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3 items-center">
                  <div
                    className="w-8 h-8 rounded-xl border flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--primary-accent)',
                    }}
                  >
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <div
                    className="p-3 rounded-2xl border text-xs font-mono"
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Gemini is thinking...
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            <div
              className="px-4 py-2 border-t flex gap-2 overflow-x-auto"
              style={{
                backgroundColor: 'var(--surface-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              {[
                'Tell me about SL-DESIGN 3D WEBSITE',
                'What is your minimum project budget?',
                'Tell me about SL-TAXI-DRIVER',
                'How can I get in touch?',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSendMessage(suggestion)}
                  className="px-3 py-1 rounded-full border text-[11px] shrink-0 font-medium transition-colors cursor-pointer"
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div
              className="p-4 border-t flex items-center gap-2"
              style={{
                backgroundColor: 'var(--surface-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Sammy Leumas's Studio Copilot..."
                className="flex-1 border rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--surface-card)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 rounded-xl text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40"
                style={{ backgroundColor: 'var(--primary-accent)' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GeminiChatbot;
