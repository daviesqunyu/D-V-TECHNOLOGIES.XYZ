import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api, authHeaders } from "@/lib/api";

type NewsletterResponse =
  | { success: true; message?: string }
  | { success?: false; error?: string; message?: string };

export function NewsletterSection() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    setLoading(true);
    try {
      const res = await fetch(api.newsletterSubscribe, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json().catch(() => null)) as NewsletterResponse | null;

      if (res.ok && data && data.success) {
        toast({
          title: data.message || "Thanks for subscribing!",
          description: `We'll send updates to ${trimmed}.`,
        });
        setEmail("");
      } else {
        toast({
          title: data?.error || data?.message || "Could not subscribe",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="scroll-mt-24 py-20 lg:py-32 bg-card relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/85 to-background/92" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Stay Updated</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            News & Updates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get occasional updates about new services, offers, and important announcements.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="h-12"
            autoComplete="email"
            required
            disabled={loading}
          />
          <Button type="submit" className="h-12" disabled={loading}>
            <Send className="w-4 h-4" />
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

