import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { CalendarDays, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "How Nairobi Businesses Can Adopt AI Responsibly in 2026",
    category: "AI",
    excerpt:
      "A practical guide to introducing AI automation without compromising governance, data quality, or customer trust.",
    date: "2026-02-16",
  },
  {
    title: "Cybersecurity Baseline for SMEs: 10 Controls That Matter",
    category: "Cybersecurity",
    excerpt:
      "The minimum security controls every growing business should have before scaling cloud apps and remote teams.",
    date: "2026-02-16",
  },
  {
    title: "Modern Software Delivery: From MVP to Reliable Production",
    category: "Engineering",
    excerpt:
      "What teams should standardize early: code quality, CI/CD, observability, testing, and release governance.",
    date: "2026-02-16",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Insights Blog | D&V Technologies"
        description="Read insights from D&V Technologies on AI, cybersecurity, cloud delivery, and software engineering best practices."
        canonicalPath="/blog"
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
                Insights <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Strategic technology insights for founders, IT leads, and operations teams.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-6">
              {posts.map((post, idx) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card rounded-2xl border border-border p-6 lg:p-8"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-xs font-medium rounded-full px-3 py-1 bg-primary/10 text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium"
                  >
                    Read article
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
