import { motion } from "framer-motion";
import { Send, Users, Crown, ShoppingBag, ArrowRight, ExternalLink } from "lucide-react";
import {
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_PREMIUM_URL,
  WEBSTORE_URL,
} from "@/lib/promo";

const CARDS = [
  {
    icon: Users,
    title: "Main Channel",
    tagline: "Free updates & community",
    description:
      "Join our public channel for tech tips, offers, and day-to-day updates from D&V Technologies.",
    href: TELEGRAM_CHANNEL_URL,
    cta: "Join Main Channel",
    accent: "from-primary to-accent",
  },
  {
    icon: Crown,
    title: "Premium Channel",
    tagline: "Exclusive content & deals",
    description:
      "Early access to premium deals, signals, and members-only content. Join the inner circle.",
    href: TELEGRAM_PREMIUM_URL,
    cta: "Join Premium Channel",
    accent: "from-accent to-primary",
  },
  {
    icon: ShoppingBag,
    title: "Webstore",
    tagline: "Buy directly on Telegram",
    description:
      "Shop our catalog and pay instantly through our Telegram webstore bot — no sign-ups needed.",
    href: WEBSTORE_URL,
    cta: "Open Webstore",
    accent: "from-primary to-cyan-500",
  },
];

export function TelegramPromoSection() {
  return (
    <section id="telegram" className="scroll-mt-24 py-20 lg:py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Send className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Join Us on Telegram</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Follow, <span className="gradient-text">Shop &amp; Save</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay connected, grab exclusive deals, and shop our products directly on Telegram.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border via-border/40 to-border hover:from-primary/60 hover:via-primary/25 hover:to-primary/60 transition-all duration-500"
              >
                <div className="relative h-full rounded-[calc(1rem-1px)] bg-card p-6 lg:p-7 flex flex-col overflow-hidden">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 mb-1 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    <ExternalLink className="w-3 h-3" />
                    {card.tagline}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold px-4 py-2.5 group-hover:brightness-110 transition-all">
                    {card.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          Instant delivery on Telegram — secure payments via M-Pesa, cards &amp; crypto.
        </motion.p>
      </div>
    </section>
  );
}
