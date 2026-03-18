import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function LogoIcon({ size = 44 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: size, height: size, rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      className="relative flex items-center justify-center cursor-pointer select-none"
    >
      {/* === Rotating conic-gradient ring === */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size }}
        className="absolute inset-0 rounded-[14px]"
      >
        <div
          className="w-full h-full rounded-[14px]"
          style={{
            background: "conic-gradient(from 0deg, #00e5ff 0%, #a000ff 35%, #ff6b00 65%, #00ff88 85%, #00e5ff 100%)",
            padding: "2.5px",
          }}
        >
          <div className="w-full h-full rounded-[12px] bg-[#06060f]" />
        </div>
      </motion.div>

      {/* === Outer ambient glow (slow pulse) === */}
      <motion.div
        animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-[14px] blur-xl"
        style={{
          inset: -4,
          background: "radial-gradient(ellipse, rgba(0,229,255,0.5) 0%, rgba(160,0,255,0.3) 60%, transparent 100%)",
        }}
      />

      {/* === Inner base: dark + grid === */}
      <div
        className="absolute rounded-[11px] overflow-hidden"
        style={{ inset: 3, background: "#06060f" }}
      >
        <svg width="100%" height="100%" className="absolute inset-0 opacity-15">
          <defs>
            <pattern id="ng" width="7" height="7" patternUnits="userSpaceOnUse">
              <path d="M 7 0 L 0 0 0 7" fill="none" stroke="#00e5ff" strokeWidth="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ng)" />
        </svg>

        {/* radial centre glow on the bg */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 55%, rgba(0,229,255,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* === DV Letters === */}
      <motion.div
        animate={{ filter: ["drop-shadow(0 0 4px #00e5ff)", "drop-shadow(0 0 10px #a000ff)", "drop-shadow(0 0 4px #00e5ff)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
        style={{ width: size * 0.76, height: size * 0.76 }}
      >
        <svg viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            {/* Main gradient — D */}
            <linearGradient id="gD" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            {/* Main gradient — V */}
            <linearGradient id="gV" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a000ff" />
              <stop offset="100%" stopColor="#ff6b00" />
            </linearGradient>
            {/* Glow filter — strong */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
              <feFlood floodColor="#00e5ff" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowV" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
              <feFlood floodColor="#a000ff" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── D letter — filled shape with counter hole (even-odd) ── */}
          {/* Outer fill: soft gradient background for D body */}
          <path
            d="M2 2 L2 36 L16 36 C28 36 34 29 34 19 C34 9 28 2 16 2 Z"
            fill="url(#gD)"
            fillOpacity="0.18"
          />
          {/* D outline — thick stroke */}
          <path
            d="M2 2 L2 36 L16 36 C28 36 34 29 34 19 C34 9 28 2 16 2 Z
               M7 8 L15 8 C24 8 28 13 28 19 C28 25 24 30 15 30 L7 30 Z"
            fill="url(#gD)"
            fillOpacity="0.65"
            fillRule="evenodd"
            filter="url(#glow)"
          />
          {/* D — bright stroke on top for crispness */}
          <path
            d="M2 2 L2 36 L16 36 C28 36 34 29 34 19 C34 9 28 2 16 2 Z"
            fill="none"
            stroke="url(#gD)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <path
            d="M7 8 L15 8 C24 8 28 13 28 19 C28 25 24 30 15 30 L7 30 Z"
            fill="none"
            stroke="url(#gD)"
            strokeWidth="1"
            strokeLinejoin="round"
            opacity="0.6"
          />

          {/* ── V letter — thick filled strokes ── */}
          {/* Soft background glow area for V */}
          <path
            d="M35 2 L42 32 L49 2"
            stroke="url(#gV)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.12"
          />
          {/* V main strokes — thick & bold */}
          <path
            d="M35 2 L42 32 L49 2"
            stroke="url(#gV)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glowV)"
            opacity="0.75"
          />
          {/* V bright inner line for crispness */}
          <path
            d="M35 2 L42 32 L49 2"
            stroke="url(#gV)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glowV)"
          />

          {/* ── Divider line between D and V ── */}
          <line
            x1="34.5" y1="6" x2="34.5" y2="32"
            stroke="#00e5ff"
            strokeWidth="0.5"
            opacity="0.25"
            strokeDasharray="2 3"
          />

          {/* ── Circuit node dots ── */}
          {([
            [2, 2, "#00e5ff"], [2, 36, "#00e5ff"], [34, 19, "#7c3aed"],
            [35, 2, "#a000ff"], [49, 2, "#ff6b00"], [42, 32, "#ff6b00"],
          ] as [number, number, string][]).map(([cx, cy, fill], i) => (
            <g key={i} filter="url(#glow)">
              {/* outer ring */}
              <circle cx={cx} cy={cy} r="2.8" fill={fill} opacity="0.2" />
              {/* solid dot */}
              <circle cx={cx} cy={cy} r="1.8" fill={fill} opacity="1" />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* === Corner blinking accent dots === */}
      {(["top-0.5 left-0.5", "top-0.5 right-0.5", "bottom-0.5 left-0.5", "bottom-0.5 right-0.5"] as const).map((pos, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [1, 0.15, 1], scale: [1, 0.6, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
          className={`absolute w-1.5 h-1.5 rounded-full ${pos}`}
          style={{ background: i % 2 === 0 ? "#00e5ff" : "#a000ff", boxShadow: "0 0 4px currentColor" }}
        />
      ))}

      {/* === Scan-line shimmer across the face === */}
      <motion.div
        animate={{ top: ["-100%", "200%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
        className="absolute left-0 right-0 h-[30%] pointer-events-none rounded-[12px] z-20"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(0,229,255,0.08), transparent)",
          inset: 3,
        }}
      />
    </motion.div>
  );
}
