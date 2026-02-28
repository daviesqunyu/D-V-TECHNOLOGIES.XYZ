import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BriefcaseBusiness, MapPin, Clock3 } from "lucide-react";

const roles = [
  {
    title: "Frontend Engineer (React)",
    location: "Nairobi / Hybrid",
    type: "Full-time",
    summary: "Build high-performance, accessible interfaces for web and admin platforms.",
  },
  {
    title: "Backend Engineer (Node/Deno + SQL)",
    location: "Nairobi / Remote",
    type: "Full-time",
    summary: "Design secure APIs, data pipelines, and resilient backend services.",
  },
  {
    title: "Cybersecurity Analyst",
    location: "Nairobi / On-site",
    type: "Contract",
    summary: "Lead hardening reviews, vulnerability assessments, and incident response support.",
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Careers | Join D&V Technologies"
        description="Join D&V Technologies and help build secure, scalable digital products across Nairobi and East Africa."
        canonicalPath="/careers"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24 hero-pattern">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Build With <span className="gradient-text">Us</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We are hiring engineers and problem-solvers passionate about real business impact.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6">
              {roles.map((role, idx) => (
                <motion.article
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-2xl border border-border p-6 lg:p-8"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="font-display text-2xl font-semibold">{role.title}</h2>
                    <BriefcaseBusiness className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground mb-4">{role.summary}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {role.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="w-4 h-4" />
                      {role.type}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
