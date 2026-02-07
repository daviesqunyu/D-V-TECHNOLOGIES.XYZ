import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Monitor,
  Wrench,
  Wifi,
  Building2,
  Server,
  Cloud,
  Shield,
  Headphones,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "IT Support & Maintenance",
    description: "Comprehensive IT support to keep your business running smoothly. From troubleshooting to system optimization, we've got you covered.",
    features: [
      "24/7 Remote & On-site Support",
      "System Monitoring & Optimization",
      "Software Updates & Patches",
      "Help Desk Services",
    ],
  },
  {
    icon: Wrench,
    title: "Hardware Repair & Solutions",
    description: "Expert repair and maintenance for all your hardware needs. Quick turnaround times and quality parts guaranteed.",
    features: [
      "Computer & Laptop Repairs",
      "Server Maintenance",
      "Printer & Peripheral Setup",
      "Hardware Upgrades",
    ],
  },
  {
    icon: Wifi,
    title: "Networking & Internet",
    description: "Reliable networking solutions and internet connectivity designed for Kenyan businesses and homes.",
    features: [
      "Network Design & Installation",
      "Wi-Fi Solutions",
      "Internet Connectivity Setup",
      "VPN & Security Configuration",
    ],
  },
  {
    icon: Building2,
    title: "Business Solutions",
    description: "End-to-end digital transformation for enterprises. Custom solutions tailored to your unique business needs.",
    features: [
      "ERP Implementation",
      "Custom Software Development",
      "Business Process Automation",
      "Digital Strategy Consulting",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Modern cloud solutions to scale your business. Migration, hosting, and management services.",
    features: [
      "Cloud Migration",
      "SaaS Implementation",
      "Data Backup & Recovery",
      "Cloud Infrastructure Management",
    ],
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Protect your business from digital threats with our comprehensive security solutions.",
    features: [
      "Security Audits",
      "Firewall Configuration",
      "Anti-virus & Anti-malware",
      "Security Training",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 hero-pattern">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Comprehensive IT, hardware, and software solutions designed for 
                modern businesses in Kenya and East Africa.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 lg:p-8 hover:border-primary/40 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl lg:text-2xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm lg:text-base">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
