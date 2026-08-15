import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Wallet,
  Send,
  ArrowLeftRight,
  ArrowRight,
  Plus,
  Check,
  CreditCard,
  Bitcoin,
  Bot,
  Store,
  Truck,
  Percent,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Frame = {
  key: string;
  badge: string;
  titleTop: string;
  titleAccent: string;
  titleBottom: string;
  description: string;
  bullets: string[];
  cta: { label: string; to: string };
  icon: LucideIcon;
  orb: string;
  accentText: string;
  image: string;
};

const FRAMES: Frame[] = [
  {
    key: "shop",
    badge: "01 · Shop",
    titleTop: "Browse the",
    titleAccent: "catalog",
    titleBottom: "like a pro",
    description:
      "Hardware, software and IT services in one fast storefront. Filter by category, compare prices, and add what you need to your cart in a tap.",
    bullets: ["Service & hardware catalog", "Transparent KES/USD pricing", "Smart category filters"],
    cta: { label: "Open Shop", to: "/shop" },
    icon: ShoppingBag,
    orb: "bg-gradient-to-br from-primary/40 to-cyan-500/20",
    accentText: "text-primary",
    image:
      "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    key: "pay",
    badge: "02 · Pay",
    titleTop: "Pay the way",
    titleAccent: "you want",
    titleBottom: "in Kenya",
    description:
      "M-Pesa, cards via Paystack, or Bitcoin. Weekly subscriptions auto-bill, receipts are saved, and your order confirms instantly.",
    bullets: ["M-Pesa STK push & subscriptions", "Card payments via Paystack", "Bitcoin accepted"],
    cta: { label: "Go to Checkout", to: "/pay" },
    icon: Wallet,
    orb: "bg-gradient-to-br from-accent/40 to-red-500/20",
    accentText: "text-accent",
    image:
      "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    key: "telegram",
    badge: "03 · Telegram",
    titleTop: "Chat with",
    titleAccent: "DIVA AI",
    titleBottom: "anywhere",
    description:
      "Our local AI assistant lives right inside Telegram. Ask questions in English or Swahili, get support, and run the whole store — no app install needed.",
    bullets: ["English & Swahili answers", "Instant 24/7 support", "Runs as a Telegram Mini App"],
    cta: { label: "Talk to DIVA", to: "/ai-assistant" },
    icon: Send,
    orb: "bg-gradient-to-br from-violet-500/40 to-fuchsia-500/20",
    accentText: "text-violet-400 dark:text-violet-300",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    key: "trade",
    badge: "04 · Trade",
    titleTop: "Source, supply &",
    titleAccent: "grow",
    titleBottom: "your network",
    description:
      "Buy hardware in bulk, become a reseller, or partner with us on campus, ISP and corporate rollouts across East Africa.",
    bullets: ["Bulk hardware supply", "Reseller & partner margins", "Campus & corporate rollouts"],
    cta: { label: "Explore Trade", to: "/trade" },
    icon: ArrowLeftRight,
    orb: "bg-gradient-to-br from-emerald-400/40 to-teal-500/20",
    accentText: "text-emerald-500 dark:text-emerald-400",
    image:
      "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

/* ------------------------------ Mock app screens ------------------------------ */

function ShopMock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Best sellers
        </p>
        <div className="flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-2.5 py-1">
          <ShoppingBag className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-bold text-primary">3</span>
        </div>
      </div>
      {[
        { name: "Laptop Repair", price: "KES 2,500", grad: "from-slate-500 to-slate-700" },
        { name: "CCTV · 4 Cameras", price: "KES 22,000", grad: "from-yellow-500 to-amber-500" },
        { name: "Custom Website", price: "KES 25,000", grad: "from-green-500 to-emerald-500" },
      ].map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.12 }}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.grad} flex items-center justify-center flex-shrink-0`}>
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.price}</p>
          </div>
          <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function PayMock() {
  const methods = [
    { name: "M-Pesa STK", sub: "Instant · Safaricom", icon: Send, grad: "from-green-500 to-emerald-500", delay: 0.2 },
    { name: "Paystack Card", sub: "Visa · Mastercard", icon: CreditCard, grad: "from-primary to-cyan-500", delay: 0.32 },
    { name: "Bitcoin", sub: "Global · Secure", icon: Bitcoin, grad: "from-orange-500 to-amber-500", delay: 0.44 },
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Choose payment method
      </p>
      {methods.map((m) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: m.delay }}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${m.grad} flex items-center justify-center flex-shrink-0`}>
            <m.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">{m.name}</p>
            <p className="text-xs text-muted-foreground">{m.sub}</p>
          </div>
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="rounded-xl bg-gradient-to-r from-primary to-accent p-[1px]"
      >
        <div className="rounded-[10px] bg-card/90 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total due</p>
            <p className="font-display font-bold text-lg">KES 27,500</p>
          </div>
          <span className="text-sm font-bold text-primary">Pay Now</span>
        </div>
      </motion.div>
    </div>
  );
}

function TelegramMock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 pb-1 border-b border-border/70">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </span>
        <div>
          <p className="text-sm font-bold leading-none">DIVA Assistant</p>
          <p className="text-[10px] text-emerald-500 font-medium">online · Mini App</p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm"
      >
        Uko na shida na laptop yako? Niambie dalili. 💻
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-3.5 py-2.5 text-sm"
      >
        Screen inatitika na laptop haiwashi. Inaweza kuwa na battery issue.
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.48 }}
        className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm"
      >
        Safi! Book a repair slot for today at 3 PM? 👍
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-1.5 max-w-[60%] rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-foreground/60"
          />
        ))}
      </motion.div>
    </div>
  );
}

function TradeMock() {
  const rows = [
    { name: "Bulk hardware order", sub: "24 laptops · city campus", value: "+18%", grad: "from-emerald-500 to-teal-500", delay: 0.2 },
    { name: "Reseller margin", sub: "ISP partnership · zone 4", value: "+12%", grad: "from-cyan-500 to-blue-500", delay: 0.32 },
    { name: "Structured cabling", sub: "Office rollout · 3 floors", value: "KES 450k", grad: "from-indigo-500 to-violet-500", delay: 0.44 },
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Marketplace activity
      </p>
      {rows.map((r) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: r.delay }}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.grad} flex items-center justify-center flex-shrink-0`}>
            <Truck className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.sub}</p>
          </div>
          <span className="text-sm font-bold text-emerald-500">{r.value}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56 }}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 p-3"
      >
        <span className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
          <Percent className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Partner margins up to 25%</p>
          <p className="text-xs text-muted-foreground">Apply to become a reseller</p>
        </div>
        <Store className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </div>
  );
}

function FrameMock({ frame }: { frame: Frame }) {
  switch (frame.key) {
    case "shop":
      return <ShopMock />;
    case "pay":
      return <PayMock />;
    case "telegram":
      return <TelegramMock />;
    case "trade":
      return <TradeMock />;
    default:
      return null;
  }
}

/* --------------------------------- Reel --------------------------------- */

export function StoryReel() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(FRAMES.length - 1, Math.max(0, Math.floor(v * FRAMES.length)));
    setActive(idx);
  });

  return (
    <section ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Shared backdrop */}
        <div className="absolute inset-0 hero-pattern opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />

        {/* Top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-border/60 z-20">
          <motion.div
            style={{ width: progress }}
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
          />
        </div>

        {/* Frames */}
        {FRAMES.map((frame, i) => {
          const isActive = i === active;
          const Icon = frame.icon;
          return (
            <motion.div
              key={frame.key}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 1.06,
                y: isActive ? 0 : 36,
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10 pointer-events-none"
              aria-hidden={!isActive}
            >
              {/* frame orb */}
              <div className={`absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-50 ${frame.orb}`} />
              <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30 ${frame.orb}`} />

              {/* frame background image */}
              <div className="absolute inset-0" aria-hidden="true">
                <img
                  src={frame.image}
                  alt=""
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform ease-out [transition-duration:1200ms] ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-background/60 dark:bg-black/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="container mx-auto px-4 lg:px-8 h-full">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full pt-24 pb-20">
                  {/* Copy */}
                  <div className={isActive ? "" : "opacity-0"}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
                      <Icon className={`w-4 h-4 ${frame.accentText}`} />
                      <span className={`text-sm font-medium ${frame.accentText}`}>{frame.badge}</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                      {frame.titleTop}{" "}
                      <span className={`gradient-text ${frame.accentText}`}>{frame.titleAccent}</span>
                      <br />
                      {frame.titleBottom}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6 max-w-xl leading-relaxed">
                      {frame.description}
                    </p>
                    <ul className="space-y-2.5 mb-8">
                      {frame.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-sm font-medium">
                          <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${frame.orb} flex items-center justify-center`}>
                            <Check className={`w-3 h-3 ${frame.accentText}`} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link to={frame.cta.to} className="pointer-events-auto inline-block">
                      <Button variant="hero" size="lg" className="group">
                        {frame.cta.label}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>

                  {/* Mock screen */}
                  <div className="hidden sm:block">
                    <motion.div
                      animate={{ rotateY: isActive ? 0 : -8, rotateX: isActive ? 0 : 6 }}
                      transition={{ duration: 0.6 }}
                      className="relative rounded-3xl p-[1px] bg-gradient-to-br from-border via-primary/40 to-border shadow-2xl"
                      style={{ perspective: 1200 }}
                    >
                      <div className="rounded-[calc(1.5rem-1px)] bg-background/90 backdrop-blur-xl p-6 lg:p-8">
                        <FrameMock frame={frame} />
                      </div>
                      {/* corner accent */}
                      <div className={`absolute -top-3 -right-3 w-16 h-16 rounded-2xl bg-gradient-to-br ${frame.orb} blur-xl`} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Frame counter */}
        <div className="absolute bottom-8 right-4 lg:right-8 z-20 flex items-center gap-3">
          <span className="font-display text-4xl lg:text-6xl font-black text-foreground/10 tabular-nums">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-2">
            {FRAMES.map((frame, i) => (
              <span
                key={frame.key}
                className={`block h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-8 bg-gradient-to-r from-primary to-accent" : "w-3 bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Vertical scroll progress rail (desktop) */}
        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 items-center">
          {FRAMES.map((frame, i) => (
            <span
              key={frame.key}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === active ? "bg-primary scale-125" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
