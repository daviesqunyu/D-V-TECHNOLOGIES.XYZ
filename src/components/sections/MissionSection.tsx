import { motion } from "framer-motion";
import { Target, Eye, Heart, Rocket } from "lucide-react";

export function MissionSection() {
  return (
    <section id="mission" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1800')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/80 to-background/90" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
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
            
            {/* Values */}
            <div className="space-y-4">
              {[
                { icon: Eye, title: "Vision", text: "Silicon Savannah by 2030" },
                { icon: Heart, title: "Passion", text: "Excellence in every solution" },
                { icon: Rocket, title: "Innovation", text: "AI, IoT & Digital Transformation" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
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

          {/* Visual — real photo collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main large image */}
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-primary/20">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="African tech professionals collaborating"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-3xl" />
            </div>

            {/* Floating stat card — bottom left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -left-6 bg-card border border-primary/30 rounded-2xl p-4 shadow-xl backdrop-blur-sm"
            >
              <p className="font-display text-3xl font-bold gradient-text">100+</p>
              <p className="text-xs text-muted-foreground">Businesses Served</p>
            </motion.div>

            {/* Floating tag — top right */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-semibold">Silicon Savannah 2030</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
