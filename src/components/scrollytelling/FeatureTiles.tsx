import { motion } from "framer-motion";
import {
  Bot,
  Headphones,
  CreditCard,
  Send,
  Shield,
  Cloud,
  Zap,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TILES: { icon: LucideIcon; title: string; description: string; gradient: string }[] = [
  {
    icon: Bot,
    title: "DIVA AI Assistant",
    description:
      "Local AI trained on our knowledge base — answers in English and Swahili, 24/7, with no API keys.",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Headphones,
    title: "24/7 Human Support",
    description:
      "Real engineers on WhatsApp, phone and on-site. A ticket becomes a fix, not a promise.",
    gradient: "from-primary to-cyan-500",
  },
  {
    icon: CreditCard,
    title: "Pay Your Way",
    description:
      "M-Pesa, Paystack cards or Bitcoin — with weekly subscription plans and saved receipts.",
    gradient: "from-accent to-orange-500",
  },
  {
    icon: Send,
    title: "Telegram Mini App",
    description:
      "Shop, pay and chat inside Telegram. No installs — the whole store fits in a chat.",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Security Built-In",
    description:
      "Firewalls, audits and staff training baked into every plan we ship for your business.",
    gradient: "from-red-500 to-orange-500",
  },
  {
    icon: Cloud,
    title: "Cloud & Backups",
    description:
      "Automated off-site backups with tested recovery, so downtime never becomes data loss.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Zap,
    title: "Same-Day On-Site",
    description:
      "Engineers who can be at your office the same day — not next quarter.",
    gradient: "from-amber-400 to-yellow-500",
  },
  {
    icon: Building2,
    title: "Enterprise ERP & AI",
    description:
      "Business systems, automation and machine learning that scale from startup to corporate.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

function Tile({ tile, index }: { tile: (typeof TILES)[number]; index: number }) {
  const Icon = tile.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border/80 via-border/30 to-border/80 hover:from-primary/60 hover:via-primary/30 hover:to-primary/60 transition-all duration-500"
    >
      <div className="relative rounded-[calc(1rem-1px)] bg-card/90 p-6 h-full overflow-hidden">
        <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${tile.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tile.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-display text-lg font-semibold mb-2">{tile.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{tile.description}</p>
      </div>
    </motion.div>
  );
}

export function FeatureTiles() {
  return (
    <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden="true" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-6">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent uppercase tracking-wide">
              Live Features &amp; Tools
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Built to <span className="gradient-text">feel alive</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            24/7 support, instant payments, on-site engineers and an AI that never sleeps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {TILES.map((tile, i) => (
            <Tile key={tile.title} tile={tile} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
