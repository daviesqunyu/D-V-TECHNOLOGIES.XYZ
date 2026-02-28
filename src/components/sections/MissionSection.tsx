import { motion } from "framer-motion";
import { Target, Eye, Heart, Rocket } from "lucide-react";

export function MissionSection() {
  return (
    <section id="mission" className="scroll-mt-24 py-20 lg:py-32 bg-card relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')",
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

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-1">
              <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center relative overflow-hidden">
                {/* Animated circles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-8 border-2 border-dashed border-primary/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-16 border-2 border-dashed border-accent/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-24 border-2 border-dashed border-primary/30 rounded-full"
                />
                
                {/* Center content */}
                <div className="text-center z-10">
                  <p className="font-display text-6xl lg:text-8xl font-bold gradient-text">2030</p>
                  <p className="text-muted-foreground mt-2">Silicon Savannah Vision</p>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-12 right-12 w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center"
                >
                  <Rocket className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute bottom-12 left-12 w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center"
                >
                  <Target className="w-8 h-8 text-accent" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
