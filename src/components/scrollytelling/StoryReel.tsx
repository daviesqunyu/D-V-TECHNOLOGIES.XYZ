import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Wallet,
  ArrowRight,
  Check,
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
  { icon: Monitor, label: "Managed IT Support", sub: "24/7 remote & on-site", grad: "from-primary to-cyan-500" },
  { icon: Globe, label: "Software & Web", sub: "Websites, apps & ERP", grad: "from-green-500 to-emerald-500" },
  { icon: Wifi, label: "Networks & Security", sub: "Wi-Fi, cabling, firewalls", grad: "from-cyan-500 to-blue-500" },
  { icon: Cloud, label: "Cloud & Data", sub: "Migration, backups, BI", grad: "from-sky-500 to-indigo-500" },
];

function DoPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        What we handle for you
      </p>
      {DO_ITEMS.map((item) => (
        <div
          key={item.label}
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
        </div>
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
        {SERVICE_CHIPS.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-2.5 rounded-xl bg-card/80 border border-border/70 p-3"
          >
            <span className={`w-9 h-9 rounded-lg bg-gradient-to-br ${s.grad} flex items-center justify-center flex-shrink-0`}>
              <s.icon className="w-4 h-4 text-white" />
            </span>
            <span className="text-sm font-semibold leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-gradient-to-r from-primary to-accent p-[1px]">
        <div className="rounded-[10px] bg-card/90 px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Start with any single service</p>
            <p className="font-display font-bold text-sm">No lock-in · Fixed quotes</p>
          </div>
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Products ------------------------------- */

const PRODUCTS = [
  { name: "Refurbished Laptops", price: "Quotation on request", grad: "from-blue-500 to-cyan-500", icon: Laptop },
  { name: "CCTV installation", price: "Site survey & quotation", grad: "from-yellow-500 to-amber-500", icon: Camera },
  { name: "Server & rack supply", price: "Quoted to specification", grad: "from-slate-500 to-slate-800", icon: HardDrive },
];

function ProductsPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        In stock, with warranty & setup
      </p>
      {PRODUCTS.map((p) => (
        <div
          key={p.name}
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
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 p-3">
        <span className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
          <Cpu className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Wi-Fi · UPS · POS & more</p>
          <p className="text-xs text-muted-foreground">Browse the full catalog</p>
        </div>
        <Store className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
}

/* --------------------------------- Partner -------------------------------- */

const PARTNER_ROWS = [
  { label: "Bulk hardware supply", value: "Wholesale", icon: Truck, grad: "from-emerald-500 to-teal-500" },
  { label: "Reseller margins", value: "up to 25%", icon: Percent, grad: "from-cyan-500 to-blue-500" },
  { label: "Campus & corporate rollouts", value: "East Africa", icon: Building2, grad: "from-indigo-500 to-violet-500" },
];

function PartnerPanel() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Grow with us
      </p>
      {PARTNER_ROWS.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-3 rounded-xl bg-card/80 border border-border/70 p-3"
        >
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${r.grad} flex items-center justify-center flex-shrink-0`}>
            <r.icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{r.label}</p>
            <p className="text-xs text-muted-foreground">{r.value}</p>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 p-3">
        <span className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
          <Wallet className="w-4 h-4" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Fixed quotes · dedicated manager</p>
          <p className="text-xs text-muted-foreground">Transparent, no surprises</p>
        </div>
        <Store className="w-4 h-4 text-muted-foreground" />
      </div>
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
      "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "products",
    badge: "03 · Products",
    titleTop: "Hardware &",
    titleAccent: "products",
    titleBottom: "ready to buy",
    description:
      "Quality-checked laptops, CCTV kits, servers, Wi-Fi, UPS backup and more — delivered with warranty, setup and support.",
    bullets: ["Refurbished laptops — quoted to your specs", "CCTV install — after site survey", "Servers, racks & storage on quotation", "Warranty and setup included"],
    cta: { label: "Open Shop", to: "/shop" },
    icon: ShoppingBag,
    orb: "bg-gradient-to-br from-emerald-400/40 to-teal-500/20",
    accentText: "text-emerald-500 dark:text-emerald-400",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo-18105.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "partner",
    badge: "04 · Partner",
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
      "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
    case "partner":
      return <PartnerPanel />;
    default:
      return null;
  }
}

function StorySlide({
  frame,
  index,
  active,
  shouldLoad,
}: {
  frame: Frame;
  index: number;
  active: number;
  shouldLoad: boolean;
}) {
  const Icon = frame.icon;
  const isActive = index === active;

  return (
    <div
      aria-label={frame.badge}
      aria-hidden={!isActive}
      className={`absolute inset-0 ${isActive ? "z-10 visible" : "z-0 invisible"}`}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {shouldLoad ? (
          <img
            src={frame.image}
            alt=""
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            draggable={false}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-background/55 dark:bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className={`absolute -top-20 -right-20 w-[28rem] h-[28rem] rounded-full blur-2xl opacity-40 ${frame.orb}`} aria-hidden="true" />
      <div className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-2xl opacity-25 ${frame.orb}`} aria-hidden="true" />

      <div className="container relative mx-auto px-4 lg:px-8 h-full flex items-center py-24 lg:py-20 pointer-events-none">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          <div>
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
            <Link
              to={frame.cta.to}
              tabIndex={isActive ? 0 : -1}
              className={`inline-block ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
            >
              <Button variant="hero" size="lg" className="group">
                {frame.cta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="hidden sm:block">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-border via-primary/40 to-border shadow-2xl">
              <div className="rounded-[calc(1.5rem-1px)] bg-background/95 overflow-hidden">
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
              <div className={`absolute -top-3 -right-3 w-16 h-16 rounded-2xl bg-gradient-to-br ${frame.orb} blur-xl`} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoryReel() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [loadedThrough, setLoadedThrough] = useState(1); // index 0 + next
  const count = FRAMES.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count - 1e-6)));
    setActive((prev) => (prev === idx ? prev : idx));
    setLoadedThrough((prev) => Math.max(prev, Math.min(count - 1, idx + 1)));
  });

  return (
    // Sticky reel: scroll advances 01→05. Short track keeps it responsive (no fade).
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-30" aria-hidden="true" />
        <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />

        <div className="absolute top-0 left-0 right-0 h-1 bg-border/60 z-30">
          <motion.div
            style={{ width: progress }}
            className="h-full bg-gradient-to-r from-primary via-accent to-primary"
          />
        </div>

        {FRAMES.map((frame, i) => (
          <StorySlide
            key={frame.key}
            frame={frame}
            index={i}
            active={active}
            shouldLoad={i <= loadedThrough}
          />
        ))}

        <div className="absolute bottom-8 right-4 lg:right-8 z-30 flex items-center gap-3 pointer-events-none">
          <span className="font-display text-4xl lg:text-6xl font-black text-foreground/10 tabular-nums">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-2">
            {FRAMES.map((frame, i) => (
              <span
                key={frame.key}
                className={`block h-1.5 rounded-full ${
                  i === active ? "w-8 bg-gradient-to-r from-primary to-accent" : "w-3 bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 items-center pointer-events-none z-30">
          {FRAMES.map((frame, i) => (
            <span
              key={frame.key}
              className={`w-2 h-2 rounded-full ${
                i === active ? "bg-primary scale-125" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
