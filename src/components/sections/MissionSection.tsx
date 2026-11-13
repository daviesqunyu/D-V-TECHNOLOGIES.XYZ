import { motion } from "framer-motion";
import { Target, Eye, Heart, Rocket, Shield, Zap, Headphones, Globe } from "lucide-react";

const VALUES = [
  { icon: Eye, title: "Vision", text: "Silicon Savannah by 2030" },
  { icon: Heart, title: "Passion", text: "Excellence in every solution" },
  { icon: Rocket, title: "Innovation", text: "AI, IoT & Digital Transformation" },
];

const WHY_US = [
  {
    icon: Shield,
    title: "Reliable & Secure",
    text: "Enterprise-grade security and 24/7 support.",
  },
  {
    icon: Zap,
    title: "Fast & Innovative",
    text: "Modern stack and AI-powered delivery.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Real people and DIVA AI when you need help.",
  },
  {
    icon: Globe,
    title: "Local & Global",
    text: "Rooted in Nairobi, serving East Africa and beyond.",
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/80 to-background/90" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
              <Target className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Our Mission</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Empowering Kenya's{" "}
              <span className="gradient-text-accent">Digital Future</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              To empower Kenyan businesses and communities through innovative technology,
              problem-solving, and a passion for excellence in AI, IoT, and digital transformation.
              We are committed to making Nairobi the Silicon Savannah of Africa by 2030.
            </p>

            <div className="space-y-4 mb-10">
              {VALUES.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-semibold">{item.title}:</span>{" "}
                    <span className="text-muted-foreground">{item.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-primary/20 relative">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="African tech professionals collaborating"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-card border border-primary/30 rounded-2xl p-4 shadow-xl">
              <p className="font-display text-xl font-bold gradient-text">Nairobi</p>
              <p className="text-xs text-muted-foreground">Based · serving East Africa & beyond</p>
            </div>

            <div className="absolute -top-4 -right-2 sm:-right-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-semibold">Silicon Savannah 2030</span>
            </div>
          </motion.div>
        </div>

        {/* Why choose us — kept here so it isn't a duplicate full section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-20 lg:mt-24"
          id="why-choose-us"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Why <span className="gradient-text">Choose Us</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Local expertise with world-class technology and support — without the noise.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border bg-background/70 p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-display font-semibold mb-1.5">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
