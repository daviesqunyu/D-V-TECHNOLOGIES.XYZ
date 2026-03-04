import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Bot,
  User,
  Send,
  Loader2,
  Sparkles,
  Trash2,
  Code,
  FileText,
  Calculator,
  Globe,
  Briefcase,
  Palette,
  Brain,
  MessageSquare,
  Copy,
  Check,
  Zap,
} from "lucide-react";
import { api, authHeaders } from "@/lib/api";
import { SEOHead } from "@/components/SEOHead";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Keep the assistant focused and simple around D&V Technologies.
const capabilities = [
  { icon: Zap, label: "D&V Services", color: "text-primary" },
  { icon: Briefcase, label: "Packages & Pricing", color: "text-orange-400" },
  { icon: MessageSquare, label: "Project & Support Questions", color: "text-blue-400" },
  { icon: Globe, label: "How to Work With D&V", color: "text-purple-400" },
];

const quickPrompts = [
  { text: "What services does D&V Technologies offer?", icon: MessageSquare },
  { text: "Explain the Basic, Premium, and Exclusive packages.", icon: Briefcase },
  { text: "How can I contact D&V Technologies for a new project?", icon: MessageSquare },
  { text: "Do you work with businesses outside Nairobi or Kenya?", icon: Globe },
];

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-3 bg-[#0d1117] border border-border/50">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border/30">
        <span className="text-xs text-muted-foreground font-mono">{lang || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className={`${className || ""} text-[#e6edf3]`}>{children}</code>
      </pre>
    </div>
  );
}

const AIAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: messageText.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const allMessages = [...messages, userMsg];

    try {
      const resp = await fetch(api.aiChat, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ messages: allMessages }),
      });

      if (!resp.ok) {
        const raw = await resp.text().catch(() => "");
        try {
          const parsed = JSON.parse(raw) as { error?: string; message?: string };
          throw new Error(
            parsed.error || parsed.message || `AI request failed (${resp.status})`
          );
        } catch {
          throw new Error(raw || `AI request failed (${resp.status})`);
        }
      }

      const data = (await resp.json().catch(() => null)) as
        | { content?: string }
        | { error?: string }
        | null;

      const assistantText =
        (data && "content" in data && data.content) ||
        (data && "error" in data && data.error) ||
        "";

      if (!assistantText) {
        throw new Error("AI response was empty.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Chat error:", error);
      }
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead
        title="AI Assistant | D&V Technologies"
        description="Use the D&V Technologies AI assistant for writing, coding, analysis, and business support tasks."
        canonicalPath="/ai-assistant"
      />
      <Navbar />
      <main id="main-content" className="flex-1 pt-20 lg:pt-24 flex flex-col">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col flex-1 max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-3">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-medium text-primary text-sm">
                Simple AI assistant for D&V Technologies
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">D&V AI Assistant</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Ask clear questions about D&V Technologies &mdash; our services, packages,
              pricing, and how to get started with your project.
            </p>
          </motion.div>

          {/* Chat Container */}
          <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden min-h-[550px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-4">
                  {/* Logo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Bot className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-2">
                    Ask anything about D&V Technologies
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-lg">
                    I&apos;m here to help you understand D&V Technologies: what we do,
                    our pricing, and the best way we can support your business.
                  </p>

                  {/* Capability pills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-lg">
                    {capabilities.map((cap) => (
                      <div
                        key={cap.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs font-medium"
                      >
                        <cap.icon className={`w-3 h-3 ${cap.color}`} />
                        {cap.label}
                      </div>
                    ))}
                  </div>

                  {/* Quick prompts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl w-full">
                    {quickPrompts.map((q) => (
                      <button
                        key={q.text}
                        onClick={() => sendMessage(q.text)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/30 hover:bg-primary/10 hover:border-primary/30 border border-border/30 text-left text-sm transition-all group"
                      >
                        <q.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors line-clamp-1">
                          {q.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <AnimatePresence initial={false}>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${
                          msg.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            msg.role === "user"
                              ? "chat-message-user text-primary-foreground"
                              : "chat-message-assistant"
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
                                  pre({ children }) {
                                    return <>{children}</>;
                                  },
                                }}
                              >
                                {msg.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          )}
                        </div>
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-4 h-4 text-accent" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading &&
                    messages[messages.length - 1]?.role === "user" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="chat-message-assistant rounded-2xl px-4 py-3 flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-xs text-muted-foreground">
                            Thinking...
                          </span>
                        </div>
                      </motion.div>
                    )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-4">
              <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about D&V services, pricing, or how to start a project..."
                    className="resize-none bg-muted/50 min-h-[48px] max-h-40 pr-4 text-sm"
                    rows={1}
                    disabled={isLoading}
                  />
                </div>
                {messages.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={clearChat}
                    className="flex-shrink-0 h-10 w-10"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="hero"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 h-10 w-10"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-muted-foreground">
                  Shift+Enter for new line
                </p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  D&V AI &mdash; GPT-4o &mdash; dvtechnologies.xyz
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIAssistant;
