import { motion } from "framer-motion";
import { Brain, MessageSquare, TrendingUp, Code, Coffee, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const aiFeatures = [
  {
    icon: Brain,
    title: "Smart Business Support",
    description: "Use AI to answer common client questions and guide them to the right D&V solution.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat for Your Site",
    description: "Simple assistants that help visitors understand your services, pricing, and next steps.",
  },
  {
    icon: TrendingUp,
    title: "Insights & Reporting",
    description: "Turn your data into clear dashboards and reports for better decisions.",
  },
  {
    icon: Code,
    title: "Custom Integrations",
    description: "Connect AI into your existing systems, websites, and internal tools.",
  },
  {
    icon: Coffee,
    title: "Local & Remote Support",
    description: "Hands-on help for Kenyan businesses plus remote support for clients worldwide.",
  },
  {
    icon: Bot,
    title: "Process Automation",
    description: "Automate repetitive tasks and workflows so your team can focus on real work.",
  },
];

export function AISection() {
  return (
    <section id="ai" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI & Innovation</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            AI Features & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Practical, business-ready AI from D&amp;V Technologies &mdash; focused on real results
            for Kenyan and African businesses, not just buzzwords.
          </p>
        </motion.div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group gradient-border p-6 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Assistant CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-card rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto">
            <Bot className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="font-display text-2xl lg:text-3xl font-bold mb-4">
              Talk to the D&amp;V AI Assistant
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Ask simple questions about D&amp;V Technologies &mdash; services, pricing, and how we can
              help your business grow.
            </p>
            <Link to="/ai-assistant">
              <Button variant="hero" size="lg" className="pulse-glow">
                <Bot className="w-5 h-5" />
                Start Chatting
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
