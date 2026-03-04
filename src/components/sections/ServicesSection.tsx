import { motion } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/services";

export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-24 py-20 lg:py-32 bg-card relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center opacity-60 dark:opacity-70"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background/93" />
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/10 rounded-full blur-3xl" />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass-card rounded-2xl p-6 lg:p-8 hover:border-primary/40 transition-all duration-500"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block h-full flex flex-col"
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl font-semibold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-1">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    View details <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
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
