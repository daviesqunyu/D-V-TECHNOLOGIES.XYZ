import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Headphones,
  ArrowRight,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { PricingSection } from "@/components/sections/PricingSection";
import { SEOHead } from "@/components/SEOHead";
import { servicesData } from "@/data/services";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Services | D&V Technologies"
        description="Explore software engineering, AI, cybersecurity, cloud, networking, and managed IT services from D&V Technologies."
        canonicalPath="/services"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 hero-pattern overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">What we do</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Twelve practice areas, one accountable team — IT, hardware, software, data and AI,
                delivered end to end, anywhere in the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {servicesData.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-all group hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="block"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold mb-1">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 pl-16">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 pl-16 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                        View details
                        <ArrowRight className="w-4 h-4" />
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 lg:p-16 text-center"
            >
              <Headphones className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Every business is unique. Let's discuss your specific needs and
                create a tailored technology solution for your organization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/ai-assistant">
                  <Button variant="glass" size="lg">
                    Ask AI Assistant
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
