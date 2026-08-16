import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useId } from "react";

/**
 * D&V Technologies mark — a clean, premium "portal D" badge.
 *
 * A dark glossy squircle wrapped in a slow-rotating conic gradient ring. The
 * "D" portal is drawn in white with a bright "V" chevron launching from its
 * counter in the brand gradient. A single orbiting signal dot and a soft
 * breathing glow keep it alive, and the whole badge tilts in 3D on hover with
 * parallax depth. Deliberately minimal — reads crisp even at 32px.
 */
export function LogoIcon({ size = 44 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 24 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

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
    "conic-gradient(from 0deg, #00e5ff 0%, #7c3aed 40%, #ff6b00 70%, #00e5ff 100%)";

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
      aria-label="D&V Technologies"
    >
      {/* Rotating conic ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-[16px]"
        style={{ translateZ: -10 }}
      >
        <div
          className="w-full h-full rounded-[16px] p-[2px]"
          style={{ background: ringGrad }}
        >
          <div className="w-full h-full rounded-[14px] bg-[#08080f]" />
        </div>
      </motion.div>

      {/* Soft ambient glow */}
      <motion.div
        animate={{ opacity: [0.18, 0.4, 0.18] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full blur-xl pointer-events-none"
        style={{
          inset: -10,
          translateZ: -20,
          background:
            "radial-gradient(circle, rgba(0,229,255,0.35) 0%, rgba(124,58,237,0.25) 55%, transparent 100%)",
        }}
      />

      {/* Glass face with gloss */}
      <div
        className="absolute rounded-[14px] overflow-hidden"
        style={{ inset: 2, background: "linear-gradient(160deg, #0d0d1a 0%, #05050c 100%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 25%, rgba(0,229,255,0.12) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(150deg, rgba(255,255,255,0.14) 0%, transparent 38%)",
          }}
        />
      </div>

      {/* Monogram */}
      <motion.div
        animate={{
          filter: [
            "drop-shadow(0 0 4px rgba(0,229,255,0.5))",
            "drop-shadow(0 0 10px rgba(124,58,237,0.6))",
            "drop-shadow(0 0 4px rgba(0,229,255,0.5))",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
        style={{ width: size * 0.76, height: size * 0.76, translateZ: 14 }}
      >
        <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id={`${uid}-d`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#bde6ff" />
            </linearGradient>
            <linearGradient id={`${uid}-v`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#ff8a3d" />
            </linearGradient>
          </defs>

          {/* D — portal (white fill + crisp edge) */}
          <path
            d="M12 10 H20 C31 10 39 18 39 29 C39 40 31 48 20 48 H12 Z
               M19 17 H21 C27 17 30.5 21 30.5 29 C30.5 37 27 41 21 41 H19 Z"
            fill={`url(#${uid}-d)`}
            fillRule="evenodd"
          />
          <path
            d="M12 10 H20 C31 10 39 18 39 29 C39 40 31 48 20 48 H12 Z"
            fill="none"
            stroke="rgba(0,229,255,0.45)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* V — launching chevron */}
          <path
            d="M14 15 L27 41 L40 15"
            stroke={`url(#${uid}-v)`}
            strokeWidth="5.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M14 15 L27 41 L40 15"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Orbiting signal dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ translateZ: 22 }}
      >
        <motion.span
          animate={{ opacity: [1, 0.4, 1], scale: [1, 0.75, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute -top-0.5 left-1/2 w-1.5 h-1.5 rounded-full bg-[#00ff88]"
          style={{ boxShadow: "0 0 10px #00ff88", marginLeft: -3, marginTop: -3 }}
        />
      </motion.div>
    </motion.div>
  );
}
