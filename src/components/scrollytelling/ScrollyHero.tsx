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
  { icon: Wifi, label: "Networks", top: "18%", left: "6%", grad: "from-cyan-500 to-blue-500", d: 0.9, delay: 0 },
  { icon: Shield, label: "Security", top: "26%", right: "8%", grad: "from-emerald-500 to-teal-500", d: 1.1, delay: 0.4 },
  { icon: Cloud, label: "Cloud", bottom: "24%", left: "10%", grad: "from-sky-500 to-indigo-500", d: 1.3, delay: 0.8 },
  { icon: Brain, label: "AI & DIVA", top: "64%", right: "14%", grad: "from-fuchsia-500 to-violet-600", d: 0.8, delay: 0.2 },
  { icon: Cpu, label: "Hardware", top: "44%", right: "4%", grad: "from-orange-500 to-rose-500", d: 1.2, delay: 0.6 },
  { icon: Laptop, label: "Repairs", bottom: "34%", left: "4%", grad: "from-slate-500 to-slate-700", d: 1.0, delay: 1.0 },
  { icon: Router, label: "Wi-Fi 6", top: "12%", right: "28%", grad: "from-teal-500 to-emerald-500", d: 1.4, delay: 1.3 },
  { icon: HardDrive, label: "Backups", bottom: "16%", right: "26%", grad: "from-amber-500 to-orange-600", d: 0.7, delay: 1.6 },
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

function FloatingChip({
  chip,
  progress,
  tint,
}: {
  chip: (typeof FLOATING_CHIPS)[number];
  progress: MotionValue<number>;
  tint: MotionValue<number>;
}) {
  const Icon = chip.icon;
  const parallax = useTransform(progress, [0, 1], [0, -160 * chip.d]);
  const rotateX = useTransform(tint, [0, 1], [-8, 10]);
  const rotateY = useTransform(tint, [0, 1], [10, -12]);
  const { top, left, right, bottom } = chip;
  return (
    <motion.div
      style={{ top, left, right, bottom, y: parallax }}
      className="absolute z-[3] hidden md:block [transform-style:preserve-3d] pointer-events-none"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5 + chip.delay, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
        className="flex items-center gap-2.5 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md px-3.5 py-2.5 shadow-xl shadow-black/20"
      >
        <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${chip.grad} flex items-center justify-center shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </span>
        <span className="text-xs font-semibold pr-1">{chip.label}</span>
      </motion.div>
    </motion.div>
  );
}

export function ScrollyHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Mouse-driven 3D tilt (0 = center, ±1 = edges).
  const tint = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // As you scroll the hero zooms, blurs and fades away — like a video panel releasing.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const blur = useTransform(scrollYProgress, [0, 0.6, 1], ["blur(0px)", "blur(3px)", "blur(12px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen min-h-[640px] overflow-hidden scroll-mt-0 flex items-center justify-center"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})`, scale }}
      />
      <motion.div
        className="absolute inset-0 bg-background/70 z-[1]"
        style={{ opacity }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none hero-pattern z-[2]" aria-hidden="true">
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating 3D tech chips */}
      <div className="absolute inset-0 z-[3] pointer-events-none" aria-hidden="true">
        {FLOATING_CHIPS.map((chip) => (
          <FloatingChip key={chip.label} chip={chip} progress={scrollYProgress} tint={tint} />
        ))}
      </div>

      <motion.div
        style={{ opacity, y, filter: blur }}
        className="container relative z-10 mx-auto px-4 lg:px-8 pt-20 lg:pt-24 pb-16"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-primary">Global Tech Partner · Live 24/7</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Future-ready technology for{" "}
            <span className="gradient-text">fast-moving</span>
            <br />
            businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3"
          >
            We design, build and run the technology that growing businesses depend on — IT support,
            software, networks, cloud, AI and security, delivered end to end.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base md:text-lg text-muted-foreground/90 max-w-3xl mx-auto mb-8"
          >
            One team, every stack. From a single laptop to a full enterprise rollout — anywhere in the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/contact">
              <Button variant="hero" size="xl" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/ai-assistant">
              <Button variant="glass" size="xl">
                <Sparkles className="w-5 h-5" />
                Try AI Assistant
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { icon: Users, value: "100+", label: "Businesses Served" },
              { icon: Globe, value: "Global", label: "Delivery & Support" },
              { icon: Shield, value: "24/7", label: "Monitoring & Response" },
              { icon: Bot, value: "20+", label: "Products & Tools" },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-xl border border-border/60 bg-card/80 backdrop-blur p-4 md:p-5 text-center shadow-sm hover:border-primary/30 transition-colors"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2 opacity-90" />
                <p className="font-display text-xl md:text-2xl font-bold tabular-nums gradient-text">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Live tools marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="relative mt-12 overflow-hidden"
          >
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/80 to-transparent z-10 pointer-events-none" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-3 w-max"
            >
              {[...LIVE_TOOLS, ...LIVE_TOOLS].map((tool, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 rounded-full border border-border/60 bg-card/80 backdrop-blur px-4 py-2 shadow-lg"
                >
                  <span className={`w-7 h-7 rounded-lg bg-gradient-to-br ${tool.grad} flex items-center justify-center`}>
                    <tool.icon className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-xs font-semibold whitespace-nowrap">{tool.label}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              ))}
            </motion.div>
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
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
