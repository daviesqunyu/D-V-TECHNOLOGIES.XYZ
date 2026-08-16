import { motion } from "framer-motion";
import { Cpu, ArrowRight, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/data/services";

/**
 * ServicesSection Component
 * Displays 12 key services in a responsive grid with smooth animations
 * Features:
 * - Animated entrance effects
 * - Gradient icons for each service
 * - Hover states and transitions
 * - Call-to-action button
 */
export function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-card relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Animated background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Background image with gradient overlay */}
        <div
          className="w-full h-full bg-cover bg-center opacity-60 dark:opacity-70"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80")',
            backgroundAttachment: "fixed",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/75 to-background/93" />
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <Cpu className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">Our Services</span>
          </div>

          {/* Heading */}
          <h2 id="services-heading" className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technology That <span className="gradient-text-accent">Works For You</span>
          </h2>

          {/* Subheading */}
          <p className="text-muted-foreground text-lg leading-relaxed">
            From IT support to digital transformation, we solve real-world problems
            with solutions designed for African businesses.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                variants={itemVariants}
                className="group h-full"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block h-full"
                  aria-label={`View details for ${service.title}`}
                >
                  <div className="glass-card rounded-2xl p-6 lg:p-8 h-full hover:border-primary/40 transition-all duration-500 hover:shadow-lg flex flex-col">
                    {/* Icon Container */}
                    <div className="mb-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg`}
                        aria-hidden="true"
                      >
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl lg:text-2xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features Preview */}
                    <div className="mb-6 flex-1">
                      <ul className="space-y-2 text-xs text-muted-foreground">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent mt-1" aria-hidden="true">
                              ✓
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {service.features.length > 2 && (
                        <p className="text-xs text-primary font-medium mt-2">
                          +{service.features.length - 2} more features →
                        </p>
                      )}
                    </div>

                    {/* CTA Link */}
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      View details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Gradient background for CTA */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-2xl blur-xl -z-10" />

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                    Ready to Transform Your Business?
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  All Services in One Place
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Browse our complete service catalog and find the perfect solution for your needs.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Link to="/services">
                  <Button
                    variant="hero"
                    size="lg"
                    className="group"
                    aria-label="View all services"
                  >
                    <TrendingUp className="w-5 h-5" />
                    View All Services
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
