import { motion } from "framer-motion";
import { Brain, MessageSquare, TrendingUp, Code, Coffee, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const aiFeatures = [
  {
    icon: Brain,
    title: "Deep Learning",
    description: "Advanced neural networks for image, speech, and data recognition.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Chatbots, sentiment analysis, and language understanding for Swahili and English apps.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "Forecast trends and automate decisions for Kenyan businesses with AI-powered analytics.",
  },
  {
    icon: Code,
    title: "JavaScript AI",
    description: "Interactive AI features in web apps using TensorFlow.js and modern frameworks.",
  },
  {
    icon: Coffee,
    title: "Java AI",
    description: "Enterprise-grade AI solutions built with Java and open-source libraries.",
  },
  {
    icon: Bot,
    title: "Automation Bots",
    description: "Automate repetitive tasks and workflows with intelligent bots for Kenyan SMEs.",
  },
];

export function AISection() {
  return (
    <section id="ai" className="scroll-mt-24 py-20 lg:py-32 relative overflow-hidden">
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
            Cutting-edge artificial intelligence solutions designed for the African market. 
            From deep learning to automation.
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
              Try Our AI Assistant
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Chat with our intelligent AI assistant that knows everything about 
              D&V Technologies. Get instant answers about our services, pricing, and solutions.
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
