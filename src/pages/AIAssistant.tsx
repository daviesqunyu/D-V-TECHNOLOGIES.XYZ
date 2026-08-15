import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";
import { localAIRespond } from "@/lib/localAI";
import { chatWithAI, type ChatMessage } from "@/lib/api";
import { QUICK_PROMPTS } from "@/data/dvKnowledge";
import {
  Send,
  Trash2,
  Sparkles,
  Copy,
  Check,
  Zap,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Bot,
  User,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  followUps?: string[];
  id: string;
};

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") || "code";
  return (
    <div className="relative rounded-lg overflow-hidden my-2 bg-[#0d1117] border border-border/50 text-xs">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-border/30">
        <span className="text-muted-foreground font-mono">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(children); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-sm leading-relaxed">
        <code className={`${className || ""} text-[#e6edf3]`}>{children}</code>
      </pre>
    </div>
  );
}

const TYPING_DELAY_MS = 600;

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 140) + "px";
    }
  }, [input]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setInput("");

    const userMsg: Message = {
      role: "user",
      content: trimmed,
      id: `u-${Date.now()}`,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const minDelay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    try {
      // Try the hosted AI (OpenAI/Cloudflare) first — fast, "thinking" delay included.
      const started = Date.now();
      const history: ChatMessage[] = messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));
      const remote = await chatWithAI([...history, { role: "user", content: trimmed }]);
      const elapsed = Date.now() - started;
      if (elapsed < TYPING_DELAY_MS) await minDelay(TYPING_DELAY_MS - elapsed);

      const botMsg: Message = {
        role: "assistant",
        content: remote || "Sorry, I didn't catch that. Please try again.",
        id: `a-${Date.now()}`,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Offline / unconfigured — fall back to the on-device knowledge base.
      const delay = Math.min(TYPING_DELAY_MS + trimmed.length * 2, 1800);
      await minDelay(delay);
      const { response, followUps } = localAIRespond(trimmed);
      const botMsg: Message = {
        role: "assistant",
        content: response,
        followUps,
        id: `a-${Date.now()}`,
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="DIVA — D&V AI Assistant | D&V Technologies"
        description="Ask DIVA, D&V Technologies' intelligent assistant, about our services, pricing, contact info, and how to get started."
        canonicalPath="/ai-assistant"
      />
      <Navbar />

      <main id="main-content" className="flex-1 pt-20 lg:pt-24 flex flex-col">
        {/* Hero strip */}
        <div className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5 border-b border-border/50 py-8 lg:py-12">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated DIVA icon */}
              <div className="relative inline-flex mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "conic-gradient(from 0deg, #00e5ff, #a000ff, #ff6b00, #00e5ff)",
                    padding: "2px",
                  }}
                >
                  <div className="w-full h-full rounded-[14px] bg-background" />
                </motion.div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-primary" />
                  </motion.div>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-white" />
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                <span className="gradient-text">DIVA</span>{" "}
                <span className="text-foreground/60 font-normal text-2xl md:text-3xl">— D&V AI Assistant</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
                Ask me anything about D&V Technologies — services, pricing, location, contact, payments, and more.
                I know everything about this company.
              </p>

              {/* Quick contact bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-muted-foreground">
                <a href="https://wa.me/254719576326" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
                  <Phone className="w-3.5 h-3.5" /> +254 719 576 326
                </a>
                <a href="mailto:info@dvtechnologies.xyz"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" /> info@dvtechnologies.xyz
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Lower Kabete, Nairobi
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 container mx-auto px-4 lg:px-8 py-6 flex flex-col max-w-4xl">
          <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden" style={{ minHeight: 520 }}>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
              {messages.length === 0 ? (
                /* Welcome screen */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-8"
                >
                  <h3 className="font-display text-xl font-bold mb-1">What would you like to know?</h3>
                  <p className="text-muted-foreground text-sm mb-8 max-w-md">
                    I'm fully trained on D&V Technologies — ask about services, pricing, contact, how to pay, or anything else.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
                    {QUICK_PROMPTS.map((q) => (
                      <motion.button
                        key={q.text}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => sendMessage(q.text)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:border-primary/30 border border-border/40 text-left text-sm transition-all group"
                      >
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {q.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {/* Bot avatar */}
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}

                        <div className="flex flex-col gap-2 max-w-[88%]">
                          {/* Bubble */}
                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              msg.role === "user"
                                ? "chat-message-user text-primary-foreground rounded-tr-sm"
                                : "chat-message-assistant rounded-tl-sm"
                            }`}
                          >
                            {msg.role === "assistant" ? (
                              <div className="prose-chat text-sm leading-relaxed">
                                <ReactMarkdown
                                  components={{
                                    code({ className, children, ...props }) {
                                      const isInline = !className;
                                      if (isInline) {
                                        return (
                                          <code
                                            className="bg-muted/50 px-1.5 py-0.5 rounded text-primary text-[13px] font-mono"
                                            {...props}
                                          >
                                            {children}
                                          </code>
                                        );
                                      }
                                      return (
                                        <CodeBlock className={className}>
                                          {String(children).replace(/\n$/, "")}
                                        </CodeBlock>
                                      );
                                    },
                                    pre({ children }) { return <>{children}</>; },
                                  }}
                                >
                                  {msg.content}
                                </ReactMarkdown>
                              </div>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                            )}
                          </div>

                          {/* Follow-up suggestion chips */}
                          {msg.role === "assistant" && msg.followUps && msg.followUps.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {msg.followUps.slice(0, 3).map((fu) => (
                                <button
                                  key={fu}
                                  onClick={() => sendMessage(fu)}
                                  className="text-xs px-3 py-1 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                                >
                                  {fu}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* User avatar */}
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="chat-message-assistant rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 rounded-full bg-primary/60"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input bar */}
            <div className="border-t border-border/60 p-4 bg-background/50 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about D&V services, pricing, contact, location…"
                    className="resize-none bg-muted/40 min-h-[46px] max-h-36 pr-3 text-sm rounded-xl border-border/50 focus:border-primary/50"
                    rows={1}
                    disabled={isTyping}
                  />
                </div>
                {messages.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setMessages([])}
                    className="h-10 w-10 flex-shrink-0 rounded-xl"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="hero"
                  size="icon"
                  disabled={!input.trim() || isTyping}
                  className="h-10 w-10 flex-shrink-0 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-[10px] text-muted-foreground">Shift+Enter for new line</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  DIVA — Powered by D&V Knowledge Base
                </p>
              </div>
            </div>
          </div>

          {/* Bottom info strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center"
          >
            {[
              { icon: Zap, label: "Always Online", sub: "No API keys — instant replies" },
              { icon: Sparkles, label: "D&V Knowledge", sub: "Trained on all our services & info" },
              { icon: Phone, label: "Need More Help?", sub: "WhatsApp +254 719 576 326" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 text-left">
                <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIAssistant;
