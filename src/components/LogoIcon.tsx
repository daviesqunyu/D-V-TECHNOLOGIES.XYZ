import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useId } from "react";

/**
 * D&V Technologies mark — a modern geometric monogram with a living, 3D core.
 *
 * Concept: a "portal D" whose counter (the opening) becomes the launching
 * "V" (growth / velocity). Concentric rotating rings, a radar sweep, a light
 * sheen and orbiting signal nodes give it depth and motion, while the whole
 * badge tilts in 3D on hover with parallax layers.
 */
export function LogoIcon({ size = 44 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), springConfig);
  const tilt = useSpring(useTransform(y, [-0.5, 0.5], [0, 1]), springConfig);

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

  const ringGrad =
    "conic-gradient(from 0deg, #00e5ff 0%, #7c3aed 25%, #ff6b00 50%, #7c3aed 75%, #00e5ff 100%)";

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
        perspective: 900,
      }}
      className="relative flex items-center justify-center cursor-pointer select-none"
      aria-label="D&V Technologies"
    >
      {/* Outer rotating conic ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ translateZ: -16 }}
        className="absolute inset-0 rounded-[16px]"
      >
        <div
          className="w-full h-full rounded-[16px] p-[1.5px]"
          style={{
            background: ringGrad,
            boxShadow: "0 0 18px rgba(0,229,255,0.25), 0 0 36px rgba(124,58,237,0.18)",
          }}
        >
          <div className="w-full h-full rounded-[14.5px] bg-[#050510]" />
        </div>
      </motion.div>

      {/* Counter-rotating dashed orbit ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-[16px] pointer-events-none"
        style={{ translateZ: -8 }}
      >
        <div
          className="w-full h-full rounded-[16px]"
          style={{ border: "1px dashed rgba(0,229,255,0.35)" }}
        />
      </motion.div>

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.94, 1.08, 0.94] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-[16px] blur-xl pointer-events-none"
        style={{
          inset: -8,
          translateZ: -28,
          background:
            "radial-gradient(ellipse, rgba(0,229,255,0.55) 0%, rgba(124,58,237,0.4) 50%, rgba(255,107,0,0.25) 100%)",
        }}
      />

      {/* Glass face */}
      <motion.div
        className="absolute rounded-[14px] overflow-hidden"
        style={{ inset: 2, background: "#050510", translateZ: 0 }}
      >
        {/* faint grid */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.14]">
          <defs>
            <pattern id={`${uid}-grid`} width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#00e5ff" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-grid)`} />
        </svg>

        {/* Radar sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-px pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(0,229,255,0.12) 55deg, transparent 110deg)",
          }}
        />

        {/* Light sheen sweep */}
        <motion.div
          animate={{ x: ["-130%", "260%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.4 }}
          className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
          style={{
            rotate: 12,
            background:
              "linear-gradient(100deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        {/* centre bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 38% 60%, rgba(0,229,255,0.14) 0%, transparent 62%)",
          }}
        />
      </motion.div>

      {/* Monogram */}
      <motion.div
        animate={{
          filter: [
            "drop-shadow(0 0 3px rgba(0,229,255,0.6))",
            "drop-shadow(0 0 10px rgba(124,58,237,0.75))",
            "drop-shadow(0 0 3px rgba(0,229,255,0.6))",
          ],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
        style={{ width: size * 0.8, height: size * 0.8, translateZ: 20 }}
      >
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id={`${uid}-d`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id={`${uid}-v`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#ff6b00" />
            </linearGradient>
            <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
              <feFlood floodColor="#00e5ff" floodOpacity="0.7" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${uid}-glowv`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="blur" />
              <feFlood floodColor="#ff6b00" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* D — portal shape */}
          <path
            d="M9 6 L9 46 L22 46 C34 46 40 38 40 26 C40 14 34 6 22 6 Z"
            fill={`url(#${uid}-d)`}
            fillOpacity="0.16"
          />
          <path
            d="M9 6 L9 46 L22 46 C34 46 40 38 40 26 C40 14 34 6 22 6 Z
               M14 13 L21 13 C29 13 33 18 33 26 C33 34 29 39 21 39 L14 39 Z"
            fill={`url(#${uid}-d)`}
            fillOpacity="0.7"
            fillRule="evenodd"
            filter={`url(#${uid}-glow)`}
          />
          {/* D crisp outline */}
          <path
            d="M9 6 L9 46 L22 46 C34 46 40 38 40 26 C40 14 34 6 22 6 Z"
            fill="none"
            stroke={`url(#${uid}-d)`}
            strokeWidth="1.6"
            strokeLinejoin="round"
            filter={`url(#${uid}-glow)`}
          />

          {/* V — launching from the D counter */}
          <path
            d="M13 16 L26 41 L38 13"
            stroke={`url(#${uid}-v)`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
            filter={`url(#${uid}-glowv)`}
          />
          <path
            d="M13 16 L26 41 L38 13"
            stroke={`url(#${uid}-v)`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* signal nodes */}
          {([
            [9, 6, "#00e5ff"],
            [9, 46, "#00e5ff"],
            [40, 26, "#7c3aed"],
            [13, 16, "#7c3aed"],
            [26, 41, "#ff6b00"],
            [38, 13, "#ff6b00"],
          ] as [number, number, string][]).map(([cx, cy, fill], i) => (
            <g key={i} filter={`url(#${uid}-glow)`}>
              <circle cx={cx} cy={cy} r="2.6" fill={fill} opacity="0.18" />
              <circle cx={cx} cy={cy} r="1.5" fill={fill} />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Orbiting signal dots */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ transformStyle: "preserve-3d", translateZ: 30 }}
      >
        <motion.span
          animate={{ opacity: [1, 0.35, 1], scale: [1, 0.7, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full bg-[#00ff88]"
          style={{ boxShadow: "0 0 8px #00ff88", marginLeft: -3, marginTop: -3 }}
        />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ transformStyle: "preserve-3d", translateZ: 34 }}
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 rounded-full bg-[#ff6b00]"
          style={{ boxShadow: "0 0 8px #ff6b00", marginLeft: -3, marginBottom: -3 }}
        />
      </motion.div>
    </motion.div>
  );
}
