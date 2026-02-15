import { motion } from "framer-motion";
import { Shield, Zap, Headphones, Globe } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Reliable & Secure",
    text: "Enterprise-grade security and 24/7 support so your business stays protected.",
  },
  {
    icon: Zap,
    title: "Fast & Innovative",
    text: "Modern tech stack and AI-powered solutions for speed and efficiency.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Real people and AI assistant ready to help whenever you need it.",
  },
  {
    icon: Globe,
    title: "Local & Global",
    text: "Rooted in Nairobi with reach across Kenya and East Africa.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="scroll-mt-24 py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-40" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We combine local expertise with world-class technology and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 lg:p-8 text-center hover:border-primary/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
