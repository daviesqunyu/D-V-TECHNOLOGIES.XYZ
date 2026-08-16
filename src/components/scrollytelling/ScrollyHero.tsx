import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Shield,
  Globe,
  Users,
  ChevronDown,
  Wifi,
  Cloud,
  Brain,
  Cpu,
  Laptop,
  HardDrive,
  Router,
  Bot,
  Smartphone,
  CreditCard,
  Bitcoin,
  Send,
  MessageCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const FLOATING_CHIPS = [
  { icon: Wifi, label: "Networks", top: "18%", left: "7%", grad: "from-cyan-500 to-blue-500", d: 0.9, delay: 0, tilt: "-rotate-3" },
  { icon: Shield, label: "Security", top: "22%", right: "10%", grad: "from-emerald-500 to-teal-500", d: 1.1, delay: 0.4, tilt: "rotate-2" },
  { icon: Cloud, label: "Cloud", bottom: "26%", left: "11%", grad: "from-sky-500 to-indigo-500", d: 1.3, delay: 0.8, tilt: "rotate-3" },
  { icon: Brain, label: "AI & DIVA", top: "60%", right: "13%", grad: "from-fuchsia-500 to-violet-600", d: 0.8, delay: 0.2, tilt: "-rotate-2" },
  { icon: Cpu, label: "Hardware", top: "42%", right: "5%", grad: "from-orange-500 to-rose-500", d: 1.2, delay: 0.6, tilt: "rotate-2" },
  { icon: Laptop, label: "Repairs", bottom: "32%", left: "5%", grad: "from-slate-500 to-slate-700", d: 1.0, delay: 1.0, tilt: "-rotate-2" },
  { icon: Router, label: "Wi-Fi 6", top: "12%", right: "30%", grad: "from-teal-500 to-emerald-500", d: 1.4, delay: 1.3, tilt: "rotate-3" },
  { icon: HardDrive, label: "Backups", bottom: "15%", right: "28%", grad: "from-amber-500 to-orange-600", d: 0.7, delay: 1.6, tilt: "-rotate-3" },
] as const;

const LIVE_TOOLS = [
  { icon: Smartphone, label: "M-Pesa", grad: "from-green-500 to-emerald-500" },
  { icon: CreditCard, label: "Paystack Cards", grad: "from-primary to-cyan-500" },
  { icon: Bitcoin, label: "Bitcoin", grad: "from-orange-500 to-amber-500" },
  { icon: Send, label: "Telegram", grad: "from-sky-500 to-blue-500" },
  { icon: MessageCircle, label: "WhatsApp", grad: "from-emerald-500 to-teal-500" },
  { icon: Bot, label: "DIVA AI", grad: "from-violet-500 to-fuchsia-500" },
  { icon: Shield, label: "Security", grad: "from-red-500 to-orange-500" },
  { icon: Cloud, label: "Cloud Backups", grad: "from-blue-500 to-cyan-400" },
] as const;

const STATS = [
  { icon: Users, value: "100+", label: "Businesses Served" },
  { icon: Globe, value: "Global", label: "Delivery & Support" },
  { icon: Shield, value: "24/7", label: "Monitoring & Response" },
  { icon: Bot, value: "20+", label: "Products & Tools" },
] as const;

function FloatingChip({
  chip,
  progress,
}: {
  chip: (typeof FLOATING_CHIPS)[number];
  progress: MotionValue<number>;
}) {
  const Icon = chip.icon;
  const parallax = useTransform(progress, [0, 1], [0, -140 * chip.d]);
  const { top, left, right, bottom } = chip;
  return (
    <motion.div
      style={{ top, left, right, bottom, y: parallax }}
      className={`absolute z-[3] hidden xl:block pointer-events-none ${chip.tilt}`}
    >
      <div
        className="float-sm flex items-center gap-2 rounded-xl border border-border/50 bg-card/70 backdrop-blur-md px-3 py-2 shadow-lg shadow-black/10"
        style={{ animationDelay: `${chip.delay}s` }}
      >
        <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${chip.grad} flex items-center justify-center shadow-md`}>
          <Icon className="w-4 h-4 text-white" />
        </span>
        <span className="text-xs font-semibold pr-1">{chip.label}</span>
      </div>
    </motion.div>
  );
}

export function ScrollyHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen min-h-[640px] overflow-hidden scroll-mt-0 flex items-center justify-center"
    >
      {/* Background image (transform-only scroll zoom) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url(${heroBg})`, scale }}
      />

      {/* Layered tint + vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/65 to-background/90 z-[1]" aria-hidden="true" />
      <div className="absolute inset-0 hero-pattern opacity-60 z-[1]" aria-hidden="true" />

      {/* Ambient orbs (CSS opacity pulse — no JS loop) */}
      <div className="absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
      </div>

      {/* Floating 3D tech chips (CSS float + scroll parallax only) */}
      <div className="absolute inset-0 z-[3] pointer-events-none" aria-hidden="true">
        {FLOATING_CHIPS.map((chip) => (
          <FloatingChip key={chip.label} chip={chip} progress={scrollYProgress} />
        ))}
      </div>

      <motion.div
        style={{ opacity, y }}
        className="container relative z-10 mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-7"
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-primary">Global Technology Partner · Live 24/7</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] tracking-tight mb-6"
          >
            Technology that moves
            <br />
            your <span className="gradient-text">business forward</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-9 leading-relaxed"
          >
            D&V Technologies designs, builds and runs the technology that growing businesses
            depend on — software, networks, cloud, AI and security — delivered end to end,
            anywhere in the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/ai-assistant" className="w-full sm:w-auto">
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                <Sparkles className="w-5 h-5" />
                Try AI Assistant
              </Button>
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur shadow-lg divide-x divide-y lg:divide-y-0 divide-border/60"
          >
            {STATS.map((stat, i) => (
              <div key={i} className="p-4 md:p-5 text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-90" />
                <p className="font-display text-xl md:text-2xl font-bold tabular-nums gradient-text">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Live tools marquee (CSS transform only) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="relative mt-9 overflow-hidden select-none"
          >
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="marquee flex gap-2.5 w-max pointer-events-none">
              {[...LIVE_TOOLS, ...LIVE_TOOLS].map((tool, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-card/70 backdrop-blur px-3.5 py-1.5 shadow-sm"
                >
                  <span className={`w-6 h-6 rounded-md bg-gradient-to-br ${tool.grad} flex items-center justify-center`}>
                    <tool.icon className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-xs font-semibold whitespace-nowrap">{tool.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Keep scrolling</span>
        <div className="float-sm">
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  );
}
