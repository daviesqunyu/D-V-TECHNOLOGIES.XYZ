import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Code2,
  Bot,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { PricingSection } from "@/components/sections/PricingSection";
import { SEOHead } from "@/components/SEOHead";
import { servicesData, type ServiceItem } from "@/data/services";

type Bucket = "all" | "build" | "automate" | "run";

const BUCKETS: { id: Bucket; label: string; blurb: string; icon: LucideIcon }[] = [
  { id: "all", label: "All", blurb: "Every practice area", icon: Briefcase },
  { id: "build", label: "Build", blurb: "Web, apps & systems", icon: Code2 },
  { id: "automate", label: "Automate", blurb: "AI agents & data", icon: Bot },
  { id: "run", label: "Run", blurb: "IT, networks & security", icon: Wrench },
];

/** Map existing service categories into clear buyer-facing buckets */
function getBucket(service: ServiceItem): Exclude<Bucket, "all"> {
  const cat = service.category.toLowerCase();
  if (cat === "software") return "build";
  if (cat === "ai" || cat === "iot") return "automate";
  return "run";
}

export default function Services() {
  const [bucket, setBucket] = useState<Bucket>("all");

  const filtered = useMemo(() => {
    if (bucket === "all") return servicesData;
    return servicesData.filter((s) => getBucket(s) === bucket);
  }, [bucket]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Services | D&V Technologies"
        description="Web & mobile apps, AI business agents, IT support, networking, cloud and security — delivered end to end by D&V Technologies."
        canonicalPath="/services"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="relative py-14 lg:py-20 hero-pattern overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">What we do</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We build web and mobile apps, set up AI agents for your business, and run the IT
                that keeps you online — clear offers, no jargon.
              </p>
            </div>
          </div>
        </section>

        {/* Featured offers */}
        <section className="pb-4 lg:pb-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
              <Link
                to="/services/web-app-development"
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Web & mobile apps
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Business sites, booking systems, e-commerce, and mobile apps — with M-Pesa and
                  card payments when you need them.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  View details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
              <Link
                to="/services/ai-machine-learning"
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center mb-4">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  AI chatbots & business agents
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  WhatsApp, Telegram, or web agents that answer customers, take leads, and help
                  your team — in English and Swahili.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  View details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Easy-scroll service grid */}
        <section className="py-12 lg:py-16 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  Browse by what you need
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  {filtered.length} service{filtered.length === 1 ? "" : "s"} — scroll normally, tap any card.
                </p>
              </div>
            </div>

            <div
              className="flex flex-wrap gap-2 mb-10"
              role="tablist"
              aria-label="Filter services"
            >
              {BUCKETS.map((b) => {
                const Icon = b.icon;
                const active = bucket === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setBucket(b.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {b.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {filtered.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.24) }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="block h-full rounded-2xl border border-border bg-background p-6 hover:border-primary/40 hover:shadow-md transition-all group"
                      aria-label={`View details for ${service.title}`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                        {BUCKETS.find((b) => b.id === getBucket(service))?.label}
                      </p>
                      <h3 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-1.5 mb-5">
                        {service.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                        View details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <PricingSection />

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="glass-card rounded-3xl p-8 lg:p-16 text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Need something specific?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Tell us what you want to build or fix — a website, an app, an AI agent, or day-to-day
                IT. We’ll reply with a clear next step.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Contact us
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="https://wa.me/254759075816" target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" size="lg">
                    WhatsApp us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
