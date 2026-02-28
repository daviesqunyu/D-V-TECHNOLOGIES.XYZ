import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { BadgeCheck, BarChart3, Shield, ShoppingCart } from "lucide-react";

const projects = [
  {
    icon: ShoppingCart,
    title: "Retail eCommerce Platform",
    sector: "Retail",
    summary:
      "Built a high-performance online storefront with payment integrations, inventory sync, and analytics dashboards.",
    outcome: "Increased online conversion by 37% within 3 months.",
  },
  {
    icon: Shield,
    title: "Cybersecurity Hardening Program",
    sector: "Financial Services",
    summary:
      "Implemented endpoint protection, role-based access controls, and incident response workflows across teams.",
    outcome: "Reduced high-risk findings by 82% after security audit cycle.",
  },
  {
    icon: BarChart3,
    title: "Operations Intelligence Dashboard",
    sector: "Logistics",
    summary:
      "Created live KPI dashboards and forecasting pipelines to track fleet performance and SLA compliance.",
    outcome: "Cut reporting time from days to minutes with real-time metrics.",
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Portfolio | D&V Technologies Projects"
        description="Explore selected D&V Technologies projects across software engineering, cybersecurity, analytics, and digital transformation."
        canonicalPath="/portfolio"
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
                Project <span className="gradient-text">Portfolio</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Real-world delivery across product engineering, cybersecurity, and AI-enabled
                business operations.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6">
              {projects.map((project, idx) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-2xl border border-border p-6 lg:p-8"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <project.icon className="w-6 h-6 text-primary" />
                      <h2 className="font-display text-2xl font-semibold">{project.title}</h2>
                    </div>
                    <span className="text-xs font-medium rounded-full px-3 py-1 bg-primary/10 text-primary">
                      {project.sector}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{project.summary}</p>
                  <p className="flex items-center gap-2 text-sm">
                    <BadgeCheck className="w-4 h-4 text-emerald-500" />
                    <span>{project.outcome}</span>
                  </p>
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
