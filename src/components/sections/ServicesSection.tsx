import { motion } from "framer-motion";
import { Monitor, Wrench, Wifi, Building2, Cpu, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Monitor,
    title: "IT Support & Maintenance",
    description: "Comprehensive IT support to keep your business running smoothly. From troubleshooting to system optimization.",
    color: "from-primary to-primary/60",
  },
  {
    icon: Wrench,
    title: "Hardware Repair & Solutions",
    description: "Expert repair and maintenance for all your hardware needs. Computers, servers, and peripherals.",
    color: "from-accent to-accent/60",
  },
  {
    icon: Wifi,
    title: "Networking & Internet",
    description: "Reliable networking solutions and internet connectivity for homes and businesses across Kenya.",
    color: "from-primary to-accent",
  },
  {
    icon: Building2,
    title: "Business Solutions",
    description: "End-to-end digital transformation for enterprises. Cloud migration, ERP, and custom software.",
    color: "from-accent to-primary",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 py-20 lg:py-32 bg-card relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Our Services</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technology That <span className="gradient-text-accent">Works For You</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From IT support to digital transformation, we solve real-world problems 
            with solutions designed for African businesses.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass-card rounded-2xl p-6 lg:p-8 hover:border-primary/40 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl lg:text-2xl font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button variant="hero" size="lg">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
