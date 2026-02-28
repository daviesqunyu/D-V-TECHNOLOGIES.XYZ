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
  Cloud,
  Shield,
  Headphones,
  ArrowRight,
  CheckCircle,
  Globe,
  Camera,
  BarChart3,
  LineChart,
  CircuitBoard,
  Brain,
} from "lucide-react";
import { PricingSection } from "@/components/sections/PricingSection";
import { SEOHead } from "@/components/SEOHead";

const services = [
  {
    icon: Monitor,
    title: "IT Support & Maintenance",
    description: "Comprehensive 24/7 IT support to keep your business running smoothly. From troubleshooting to system optimization.",
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
      "Wi-Fi Solutions (Home & Business)",
      "Internet Connectivity Setup",
      "VPN & Security Configuration",
    ],
  },
  {
    icon: Building2,
    title: "Business Solutions & ERP",
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
    description: "Protect your business from digital threats with our comprehensive security solutions and staff training.",
    features: [
      "Security Audits & Penetration Testing",
      "Firewall & VPN Configuration",
      "Anti-virus & Anti-malware",
      "Staff Security Training",
    ],
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description: "Custom websites, e-commerce platforms, and mobile applications built with modern technologies.",
    features: [
      "Custom Websites & Landing Pages",
      "E-commerce Platforms",
      "Mobile Apps (React Native, Flutter)",
      "Progressive Web Apps (PWAs)",
    ],
  },
  {
    icon: Camera,
    title: "CCTV & Surveillance",
    description: "Security camera installation, remote monitoring, and smart surveillance for homes and offices.",
    features: [
      "IP Camera Installation",
      "Remote Monitoring Setup",
      "Smart Home Security",
      "Office Surveillance Systems",
    ],
  },
  {
    icon: BarChart3,
    title: "Data Analytics & BI",
    description: "Turn your data into actionable insights with business intelligence dashboards and analytics.",
    features: [
      "BI Dashboard Development",
      "Data Visualization",
      "Custom Reports & Analytics",
      "KPI Dashboards",
    ],
  },
  {
    icon: LineChart,
    title: "Data Science",
    description: "Statistical modeling, predictive analytics, and ML-driven insights for growth and operations.",
    features: [
      "Statistical Modeling & A/B Testing",
      "Data Pipelines & ETL",
      "Predictive Analytics",
      "ML for Business Insights",
    ],
  },
  {
    icon: CircuitBoard,
    title: "IoT Solutions",
    description: "Smart automation and sensor networks for offices, homes, and industrial applications.",
    features: [
      "Smart Office/Home Automation",
      "Sensor Networks & Monitoring",
      "Industrial IoT Integration",
      "Asset Tracking Systems",
    ],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Cutting-edge AI solutions including deep learning, NLP, and intelligent automation for African businesses.",
    features: [
      "Deep Learning & Neural Networks",
      "NLP (Swahili & English)",
      "Predictive Analytics",
      "Intelligent Automation Bots",
    ],
  },
];

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
                12 comprehensive IT, hardware, software, data, and AI solutions designed for 
                modern businesses in Kenya and East Africa.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-6 hover:border-primary/40 transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-6 h-6 text-primary-foreground" />
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
                </motion.div>
              ))}
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
