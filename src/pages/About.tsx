import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Users, Target, Rocket, Shield } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven Delivery",
    text: "We build practical, measurable solutions that improve operations, revenue, and customer experience.",
  },
  {
    icon: Rocket,
    title: "Startup Speed, Enterprise Quality",
    text: "Our team combines rapid execution with production-grade engineering, testing, and security standards.",
  },
  {
    icon: Shield,
    title: "Security by Default",
    text: "From access controls to deployment hardening, we design systems that protect client data and trust.",
  },
  {
    icon: Users,
    title: "Client-Centric Partnership",
    text: "We collaborate closely with your team, offering clear communication, documentation, and support.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About D&V Technologies | Nairobi Tech Company"
        description="Learn about D&V Technologies, a Nairobi-based engineering team delivering software, AI, cybersecurity, and IT solutions for growth-focused businesses."
        canonicalPath="/about"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24 hero-pattern">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About <span className="gradient-text">D&V Technologies</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We are a Nairobi-based technology company helping businesses scale with reliable
                software, cloud infrastructure, cybersecurity, and AI automation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 items-start">
              <div className="glass-card rounded-2xl p-7 border border-border">
                <h2 className="font-display text-3xl font-bold mb-4">Who We Are</h2>
                <p className="text-muted-foreground mb-4">
                  D&V Technologies delivers end-to-end digital transformation for SMEs, startups,
                  and enterprise teams across Kenya and East Africa. Our expertise spans modern web
                  applications, backend systems, AI integration, managed IT support, and security.
                </p>
                <p className="text-muted-foreground">
                  We focus on practical outcomes: faster operations, better customer experiences,
                  and resilient systems you can trust in production.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-7 border border-border">
                <h2 className="font-display text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground mb-4">
                  To help power Nairobi’s growth into a leading global innovation hub by building
                  technology systems that are reliable, secure, and scalable.
                </p>
                <p className="text-muted-foreground">
                  We partner with organizations that want long-term technical excellence, not just
                  quick fixes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-10 text-center">
              Our Core Values
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="glass-card rounded-2xl p-6 border border-border"
                >
                  <value.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
