import { Sparkles } from "lucide-react";

export function SectionDivider() {
  return (
    <div className="relative py-4 flex items-center justify-center" aria-hidden="true">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="relative z-10 flex items-center gap-3 bg-background px-4">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <Sparkles className="w-3.5 h-3.5 text-primary/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
      </div>
    </div>
  );
}
