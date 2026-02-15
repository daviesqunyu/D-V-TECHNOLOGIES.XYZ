import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({
      title: "Thanks for subscribing!",
      description: "We'll send updates to " + email,
    });
    setEmail("");
  };

  return (
    <section id="newsletter" className="scroll-mt-24 py-20 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Stay Updated</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get <span className="gradient-text">News & Updates</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Subscribe for tech tips, product updates, and Silicon Savannah news.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-muted/50 border-border h-12"
            />
            <Button type="submit" variant="hero" size="lg" className="h-12 px-6">
              <Send className="w-5 h-5" />
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
