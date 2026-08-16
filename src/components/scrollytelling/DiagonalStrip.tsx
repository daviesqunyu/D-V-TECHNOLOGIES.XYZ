import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Monitor,
  Wrench,
  Wifi,
  Building2,
  Shield,
  Globe,
  Camera,
  BarChart3,
  Cloud,
  Brain,
  CircuitBoard,
  LineChart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ITEMS: { label: string; icon: LucideIcon; gradient: string }[] = [
  { label: "IT Support", icon: Monitor, gradient: "from-primary to-cyan-500" },
  { label: "Hardware", icon: Wrench, gradient: "from-accent to-orange-500" },
  { label: "Networking", icon: Wifi, gradient: "from-cyan-500 to-blue-500" },
  { label: "ERP & Software", icon: Building2, gradient: "from-accent to-primary" },
  { label: "Security", icon: Shield, gradient: "from-red-500 to-orange-500" },
  { label: "Web & Apps", icon: Globe, gradient: "from-green-500 to-emerald-500" },
  { label: "CCTV", icon: Camera, gradient: "from-yellow-500 to-amber-500" },
  { label: "Analytics", icon: BarChart3, gradient: "from-violet-500 to-purple-500" },
  { label: "Cloud", icon: Cloud, gradient: "from-blue-500 to-cyan-500" },
  { label: "AI & ML", icon: Brain, gradient: "from-primary to-pink-500" },
  { label: "IoT", icon: CircuitBoard, gradient: "from-teal-500 to-cyan-500" },
  { label: "Data Science", icon: LineChart, gradient: "from-indigo-500 to-violet-500" },
];

function Chip({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  const Icon = item.icon;
  return (
    <div
      className="flex items-center gap-3 rounded-2xl px-5 py-3 bg-card/80 border border-border/70 shadow-lg backdrop-blur whitespace-nowrap"
      style={{ animationDelay: `${index * 0.5}s` }}
    >
      <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </span>
      <span className="font-display font-semibold text-sm">{item.label}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
    </div>
  );
}

export function DiagonalStrip() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // The two bands translate diagonally opposite each other while pinned in view.
  const rowA = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rowB = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const yA = useTransform(scrollYProgress, [0, 1], ["2%", "-6%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const bandA = [...ITEMS, ...ITEMS];
  const bandB = [...ITEMS].reverse();

  return (
    <section ref={ref} className="relative py-28 lg:py-40 overflow-hidden bg-card">
      <div className="absolute inset-0 hero-pattern opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center mb-14 lg:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
          <CircuitBoard className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">One Team, Every Stack</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          From desks to <span className="gradient-text">data centres</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every layer of technology a modern business needs — delivered as one connected service.
        </p>
      </div>

      <div className="relative -rotate-2">
        <motion.div style={{ x: rowA, y: yA }} className="flex gap-4 mb-4 w-max">
          {bandA.map((item, i) => (
            <Chip key={`${item.label}-${i}`} item={item} index={i} />
          ))}
        </motion.div>
        <motion.div style={{ x: rowB, y: yB }} className="flex gap-4 w-max opacity-80">
          {bandB.map((item, i) => (
            <Chip key={`${item.label}-${i}`} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
