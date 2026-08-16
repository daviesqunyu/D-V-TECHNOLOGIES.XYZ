import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  perspective?: number;
  disabled?: boolean;
};

/**
 * TiltCard — wraps content in a pointer-tracked 3D tilt with a light glare.
 * Uses springs so the rotation eases back to rest smoothly.
 */
export function TiltCard({
  children,
  className,
  intensity = 10,
  glare = true,
  perspective = 900,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 260, damping: 24 };
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), spring);

  const glareX = useTransform(mx, [0, 1], ["-40%", "40%"]);
  const glareY = useTransform(my, [0, 1], ["-40%", "40%"]);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective }}
      className={cn("relative", className)}
    >
      <div style={{ transformStyle: "preserve-3d", transform: "translateZ(0)" }} className="h-full">
        {children}
        {glare && !disabled && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden mix-blend-soft-light"
          >
            <motion.div
              style={{ left: glareX, top: glareY }}
              className="absolute w-2/3 h-2/3 rounded-full bg-gradient-to-br from-white/50 to-transparent blur-2xl"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
