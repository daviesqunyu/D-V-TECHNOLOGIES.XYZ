import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function LogoIcon({ size = 44 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: size,
        height: size,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative flex items-center justify-center cursor-pointer select-none"
    >
      {/* Outer rotating conic-gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size }}
        className="absolute inset-0 rounded-[14px]"
      >
        <div
          className="w-full h-full rounded-[14px]"
          style={{
            background:
              "conic-gradient(from 0deg, #00e5ff 0%, #a000ff 40%, #ff6b00 70%, #00e5ff 100%)",
            padding: "2.5px",
          }}
        >
          <div className="w-full h-full rounded-[12px] bg-[#080812]" />
        </div>
      </motion.div>

      {/* Inner glow pulse */}
      <motion.div
        animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.85, 1, 0.85] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-[11px] bg-gradient-to-br from-primary/40 to-accent/40 blur-md"
        style={{ inset: 4 }}
      />

      {/* Circuit-board base layer */}
      <div
        className="absolute rounded-[11px] bg-[#080812] overflow-hidden"
        style={{ inset: 3 }}
      >
        {/* subtle grid lines */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
          <defs>
            <pattern id="nano-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#00e5ff" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nano-grid)" />
        </svg>
      </div>

      {/* Main SVG Icon — "DV" merged letterform */}
      <div className="relative z-10" style={{ width: size * 0.62, height: size * 0.62 }}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_6px_rgba(0,229,255,0.9)]">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ff6b00" />
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* D shape — left half */}
          <path
            d="M4 6 L4 30 L14 30 C20 30 26 25 26 18 C26 11 20 6 14 6 Z"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            filter="url(#logoGlow)"
          />
          {/* D inner curve fill hint */}
          <path
            d="M8 10 L13 10 C17.5 10 22 13.5 22 18 C22 22.5 17.5 26 13 26 L8 26 Z"
            fill="url(#logoGrad)"
            opacity="0.12"
          />

          {/* V shape — right, overlapping D */}
          <path
            d="M22 6 L29 23 L36 6"
            fill="none"
            stroke="url(#logoGrad)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            filter="url(#logoGlow)"
          />

          {/* Circuit nodes — corner dots */}
          {[
            [4, 6], [4, 30], [26, 18], [22, 6], [36, 6], [29, 23],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="1.6"
              fill="#00e5ff"
              opacity={0.9}
              filter="url(#logoGlow)"
            />
          ))}
        </svg>
      </div>

      {/* Corner accent dots (outside ring) */}
      {[
        "top-0.5 left-0.5",
        "top-0.5 right-0.5",
        "bottom-0.5 left-0.5",
        "bottom-0.5 right-0.5",
      ].map((pos, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.35 }}
          className={`absolute w-1 h-1 rounded-full bg-accent ${pos}`}
          style={{ transform: "translateZ(4px)" }}
        />
      ))}
    </motion.div>
  );
}
