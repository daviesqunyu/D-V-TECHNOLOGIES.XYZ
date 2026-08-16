import { motion } from "framer-motion";
import { Shield, Zap, Headphones, Globe } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Reliable & Secure",
    text: "Enterprise-grade security and 24/7 support so your business stays protected.",
    img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Zap,
    title: "Fast & Innovative",
    text: "Modern tech stack and AI-powered solutions for speed and efficiency.",
    img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Real people and AI assistant ready to help whenever you need it.",
    img: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    icon: Globe,
    title: "Local & Global",
    text: "Rooted in Nairobi with reach across Kenya and East Africa.",
    img: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-24 lg:py-32 relative overflow-hidden">
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
              className="glass-card rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg group"
            >
              {/* Card image */}
              <div className="h-40 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              {/* Card content */}
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 -mt-10 relative z-10 border border-primary/20 backdrop-blur-sm bg-card">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team photo strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-3 lg:gap-4 h-48 lg:h-64 rounded-2xl overflow-hidden border border-primary/20"
        >
          {[
            "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=700",
            "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=700",
            "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=700",
          ].map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img
                src={src}
                alt="D&V Technologies team at work"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
