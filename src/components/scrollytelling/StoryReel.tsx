import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Wallet,
  Send,
  ArrowRight,
  Check,
  CreditCard,
  Bitcoin,
  Bot,
  Store,
  Truck,
  Percent,
  Monitor,
  Wrench,
  Wifi,
  Globe,
  Shield,
  Cloud,
  Camera,
  Brain,
  Laptop,
  HardDrive,
  Building2,
  Smartphone,
  Headphones,
  Cpu,
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

/* ------------------------------- What We Do ------------------------------- */

const DO_ITEMS = [
  { icon: Monitor, label: "Managed IT Support", sub: "24/7 remote & on-site", grad: "from-primary to-cyan-500", d: 0.2 },
  { icon: Globe, label: "Software & Web", sub: "Websites, apps & ERP", grad: "from-green-500 to-emerald-500", d: 0.32 },
  { icon: Wifi, label: "Networks & Security", sub: "Wi-Fi, cabling, firewalls", grad: "from-cyan-500 to-blue-500", d: 0.44 },
  { icon: Cloud, label: "Cloud & Data", sub: "Migration, backups, BI", grad: "from-sky-500 to-indigo-500", d: 0.56 },
];

function DoPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        What we handle for you
      </p>
      {DO_ITEMS.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: item.d }}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.grad} flex items-center justify-center flex-shrink-0`}>
            <item.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.sub}</p>
          </div>
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* --------------------------------- Services ------------------------------- */

const SERVICE_CHIPS = [
  { icon: Monitor, label: "IT Support", grad: "from-primary to-cyan-500" },
  { icon: Wrench, label: "Hardware", grad: "from-accent to-orange-500" },
  { icon: Wifi, label: "Networking", grad: "from-cyan-500 to-blue-500" },
  { icon: Globe, label: "Web & Apps", grad: "from-green-500 to-emerald-500" },
  { icon: Cloud, label: "Cloud", grad: "from-sky-500 to-indigo-500" },
  { icon: Shield, label: "Security", grad: "from-red-500 to-orange-500" },
  { icon: Camera, label: "CCTV", grad: "from-yellow-500 to-amber-500" },
  { icon: Brain, label: "AI & Data", grad: "from-violet-500 to-fuchsia-500" },
];

function ServicesPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Twelve practice areas, one team
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {SERVICE_CHIPS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.06 }}
            className="flex items-center gap-2.5 rounded-xl bg-card/80 border border-border/70 p-3"
          >
            <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.grad} flex items-center justify-center flex-shrink-0`}>
              <s.icon className="w-4 h-4 text-white" />
            </span>
            <span className="text-sm font-semibold leading-tight">{s.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="rounded-xl bg-gradient-to-r from-primary to-accent p-[1px]"
      >
        <div className="rounded-[10px] bg-card/90 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Start with any single service</p>
            <p className="font-display font-bold text-sm">No lock-in · Fixed quotes</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </motion.div>
    </div>
  );
}

/* --------------------------------- Products ------------------------------- */

const PRODUCTS = [
  { name: "Refurbished Laptops", price: "from KES 28,000", grad: "from-blue-500 to-cyan-500", icon: Laptop, d: 0.2 },
  { name: "CCTV Kit · 4 Cams", price: "KES 22,000", grad: "from-yellow-500 to-amber-500", icon: Camera, d: 0.32 },
  { name: "Server & Rack Supply", price: "from KES 145,000", grad: "from-slate-500 to-slate-800", icon: HardDrive, d: 0.44 },
];

function ProductsPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        In stock, with warranty & setup
      </p>
      {PRODUCTS.map((p) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: p.d }}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.grad} flex items-center justify-center flex-shrink-0`}>
            <p.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{p.name}</p>
            <p className="text-xs text-muted-foreground">{p.price}</p>
          </div>
          <ShoppingBag className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58 }}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 p-3"
      >
        <span className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
          <Cpu className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Wi-Fi · UPS · POS & more</p>
          <p className="text-xs text-muted-foreground">Browse the full catalog</p>
        </div>
        <Store className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </div>
  );
}

/* -------------------------------- Live Tools ------------------------------ */

const TOOLS = [
  { name: "M-Pesa STK", sub: "Instant · subscriptions", icon: Smartphone, grad: "from-green-500 to-emerald-500", d: 0.2 },
  { name: "Cards via Paystack", sub: "Visa · Mastercard", icon: CreditCard, grad: "from-primary to-cyan-500", d: 0.32 },
  { name: "Bitcoin", sub: "Global · secure", icon: Bitcoin, grad: "from-orange-500 to-amber-500", d: 0.44 },
  { name: "DIVA AI", sub: "Chat on Telegram · 24/7", icon: Bot, grad: "from-violet-500 to-fuchsia-500", d: 0.56 },
];

function ToolsPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Pay your way, chat to get help
      </p>
      {TOOLS.map((t) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: t.d }}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.grad} flex items-center justify-center flex-shrink-0`}>
            <t.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.sub}</p>
          </div>
          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 p-3"
      >
        <span className="w-9 h-9 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center">
          <Headphones className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">24/7 human support</p>
          <p className="text-xs text-muted-foreground">WhatsApp · phone · on-site</p>
        </div>
        <Send className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </div>
  );
}

/* --------------------------------- Partner -------------------------------- */

const PARTNER_ROWS = [
  { label: "Bulk hardware supply", value: "Wholesale", icon: Truck, grad: "from-emerald-500 to-teal-500", d: 0.2 },
  { label: "Reseller margins", value: "up to 25%", icon: Percent, grad: "from-cyan-500 to-blue-500", d: 0.32 },
  { label: "Campus & corporate rollouts", value: "East Africa", icon: Building2, grad: "from-indigo-500 to-violet-500", d: 0.44 },
];

function PartnerPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Grow with us
      </p>
      {PARTNER_ROWS.map((r) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: r.d }}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.grad} flex items-center justify-center flex-shrink-0`}>
            <r.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{r.label}</p>
            <p className="text-xs text-muted-foreground">{r.value}</p>
          </div>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58 }}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 p-3"
      >
        <span className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
          <Wallet className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Fixed quotes · dedicated manager</p>
          <p className="text-xs text-muted-foreground">Transparent, no surprises</p>
        </div>
        <Store className="w-4 h-4 text-muted-foreground" />
      </motion.div>
    </div>
  );
}

const FRAMES: Frame[] = [
  {
    key: "do",
    badge: "01 · What We Do",
    titleTop: "One team for",
    titleAccent: "your entire",
    titleBottom: "technology stack",
    description:
      "From daily IT support to full digital transformation — we design, build and run the systems that keep modern businesses moving.",
    bullets: ["Managed IT & 24/7 support", "Software, web & mobile apps", "Networks, cloud & security", "AI, data & automation"],
    cta: { label: "Explore Services", to: "/services" },
    icon: Monitor,
    orb: "bg-gradient-to-br from-primary/40 to-cyan-500/20",
    accentText: "text-primary",
    image:
      "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    key: "services",
    badge: "02 · Services",
    titleTop: "Every service",
    titleAccent: "under one",
    titleBottom: "roof",
    description:
      "Twelve practice areas, one accountable team. Pick a single service or hand us your entire IT — we run it end to end.",
    bullets: ["IT support & hardware repairs", "Web, e-commerce & apps", "CCTV, cabling & Wi-Fi", "ERP, analytics & AI"],
    cta: { label: "View All Services", to: "/services" },
    icon: Wrench,
    orb: "bg-gradient-to-br from-accent/40 to-orange-500/20",
    accentText: "text-accent",
    image:
      "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    key: "products",
    badge: "03 · Products",
    titleTop: "Hardware &",
    titleAccent: "products",
    titleBottom: "ready to buy",
    description:
      "Quality-checked laptops, CCTV kits, servers, Wi-Fi, UPS backup and more — delivered with warranty, setup and support.",
    bullets: ["Refurbished laptops from KES 28,000", "CCTV kits from KES 22,000", "Servers, racks & storage", "Warranty + setup included"],
    cta: { label: "Open Shop", to: "/shop" },
    icon: ShoppingBag,
    orb: "bg-gradient-to-br from-emerald-400/40 to-teal-500/20",
    accentText: "text-emerald-500 dark:text-emerald-400",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo-18105.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    key: "tools",
    badge: "04 · Live Tools",
    titleTop: "Tools your",
    titleAccent: "customers can",
    titleBottom: "use today",
    description:
      "Pay with M-Pesa, cards or Bitcoin. Chat with DIVA AI on Telegram or WhatsApp. Everything is live — right now.",
    bullets: ["M-Pesa STK push & subscriptions", "Cards via Paystack · Bitcoin", "DIVA AI on Telegram", "Instant digital delivery"],
    cta: { label: "Explore Payments", to: "/pay" },
    icon: Wallet,
    orb: "bg-gradient-to-br from-violet-500/40 to-fuchsia-500/20",
    accentText: "text-violet-400 dark:text-violet-300",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    key: "partner",
    badge: "05 · Partner",
    titleTop: "Let's build your",
    titleAccent: "next",
    titleBottom: "advantage",
    description:
      "Bulk supply, reseller margins, campus and corporate rollouts. Tell us what you're building — we'll handle the technology.",
    bullets: ["Bulk hardware supply & reseller margins", "Campus, ISP & corporate rollouts", "Dedicated account manager", "Fixed transparent quotes"],
    cta: { label: "Partner With Us", to: "/trade" },
    icon: Truck,
    orb: "bg-gradient-to-br from-emerald-400/40 to-teal-500/20",
    accentText: "text-emerald-500 dark:text-emerald-400",
    image:
      "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

function FramePanel({ frame }: { frame: Frame }) {
  switch (frame.key) {
    case "do":
      return <DoPanel />;
    case "services":
      return <ServicesPanel />;
    case "products":
      return <ProductsPanel />;
    case "tools":
      return <ToolsPanel />;
    case "partner":
      return <PartnerPanel />;
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
    <section ref={ref} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Shared backdrop */}
        <div className="absolute inset-0 hero-pattern opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />

        {/* Cinematic vignette */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.35) 100%)",
          }}
          aria-hidden="true"
        />

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
                scale: isActive ? 1 : 1.04,
                filter: isActive ? "blur(0px)" : "blur(6px)",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10 pointer-events-none"
              aria-hidden={!isActive}
            >
              {/* frame orb */}
              <div className={`absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-50 ${frame.orb}`} />
              <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-30 ${frame.orb}`} />

              {/* Cinematic background image (slow Ken Burns zoom while active) */}
              <div className="absolute inset-0" aria-hidden="true">
                <motion.img
                  src={frame.image}
                  alt=""
                  loading="lazy"
                  animate={{ scale: isActive ? 1.14 : 1.05 }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/55 dark:bg-black/55" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
              </div>

              <div className="container mx-auto px-4 lg:px-8 h-full">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full pt-24 pb-20">
                  {/* Copy */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 24 }}
                    transition={{ duration: 0.6, delay: isActive ? 0.05 : 0 }}
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6">
                      <Icon className={`w-4 h-4 ${frame.accentText}`} />
                      <span className={`text-sm font-medium ${frame.accentText}`}>{frame.badge}</span>
                    </div>
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
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
                  </motion.div>

                  {/* Live panel */}
                  <div className="hidden sm:block">
                    <motion.div
                      animate={{ rotateY: isActive ? 0 : -8, rotateX: isActive ? 0 : 6 }}
                      transition={{ duration: 0.6 }}
                      className="relative rounded-3xl p-[1px] bg-gradient-to-br from-border via-primary/40 to-border shadow-2xl"
                      style={{ perspective: 1200 }}
                    >
                      <div className="rounded-[calc(1.5rem-1px)] bg-background/90 backdrop-blur-xl overflow-hidden">
                        {/* window chrome */}
                        <div className="flex items-center gap-1.5 px-4 pt-4 pb-2.5 border-b border-border/60">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                          <span className="ml-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            dvtechnologies.xyz
                          </span>
                        </div>
                        <div className="p-6 lg:p-8">
                          <FramePanel frame={frame} />
                        </div>
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
