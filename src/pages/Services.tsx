import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  Globe,
  ChevronDown,
} from "lucide-react";
import { PricingSection } from "@/components/sections/PricingSection";
import { SEOHead } from "@/components/SEOHead";
import { servicesData } from "@/data/services";

const N = servicesData.length;
const ANGLE_PER = 360 / N;

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Services | D&V Technologies"
        description="Explore software engineering, AI, cybersecurity, cloud, networking, and managed IT services from D&V Technologies."
        canonicalPath="/services"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative py-16 lg:py-24 hero-pattern overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Briefcase className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">What we do</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Twelve practice areas, one accountable team — IT, hardware, software, data and AI,
                delivered end to end, anywhere in the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Globe Orbital Scroll */}
        <GlobeOrbital />

        {/* Pricing */}
        <PricingSection />

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 lg:p-16 text-center"
            >
              <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
                Need a Custom Solution?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Every business is unique. Let's discuss your specific needs and
                create a tailored technology solution for your organization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/ai-assistant">
                  <Button variant="glass" size="lg">
                    Ask AI Assistant
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/* ─── Globe Orbital Component ─── */
function GlobeOrbital() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const rotation = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalRotation = useTransform(scrollYProgress, [0, 1], [0, 360 * 2]);

  useEffect(() => {
    if (isMobile) return; /* mobile uses tap/swipe, not scroll */
    const unsub = totalRotation.on("change", (v) => {
      rotation.set(v);
      const idx = Math.round(-v / ANGLE_PER) % N;
      setActiveIdx(((idx % N) + N) % N);
    });
    return unsub;
  }, [totalRotation, isMobile]);

  const goTo = useCallback(
    (idx: number) => {
      const target = idx * ANGLE_PER;
      animate(rotation, -target, { type: "spring", stiffness: 80, damping: 20 });
      setActiveIdx(idx);
    },
    [rotation]
  );

  const goNext = useCallback(() => {
    const next = (activeIdx + 1) % N;
    goTo(next);
  }, [activeIdx, goTo]);

  const goPrev = useCallback(() => {
    const prev = (activeIdx - 1 + N) % N;
    goTo(prev);
  }, [activeIdx, goTo]);

  /* swipe handlers for mobile */
  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext(); else goPrev();
    }
    setTouchStart(null);
  };

  const radius = 380;

  return (
    <section
      ref={containerRef}
      className="relative bg-card"
      style={{ height: isMobile ? "auto" : `${N * 120 + 600}px` }}
    >
      <div
        className={`flex flex-col items-center justify-center overflow-hidden ${
          isMobile ? "py-16" : "sticky top-0 h-screen"
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Central glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[260px] h-[260px] md:w-[500px] md:h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute w-[180px] h-[180px] md:w-[350px] md:h-[350px] rounded-full border border-primary/10" />
          <div className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full border border-primary/5" />
          <div className="absolute w-[380px] h-[380px] md:w-[650px] md:h-[650px] rounded-full border border-primary/[0.03]" />
        </div>

        {/* Label */}
        <div className="absolute top-6 md:top-12 left-1/2 -translate-x-1/2 text-center z-20">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            {isMobile ? "Swipe to explore" : "Scroll to explore"}
          </p>
          {!isMobile && <ChevronDown className="w-4 h-4 text-primary mx-auto mt-1 animate-bounce" />}
        </div>

        {/* ── Desktop: 3D orbital carousel ── */}
        {!isMobile && (
          <div
            className="relative z-10 hidden md:block"
            style={{ width: `${radius * 2 + 320}px`, height: "400px", perspective: "1200px" }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d", rotateY: rotation }}
            >
              {servicesData.map((service, i) => {
                const Icon = service.icon;
                const angle = i * ANGLE_PER;
                const isActive = i === activeIdx;
                return (
                  <motion.div
                    key={service.slug}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px) translate(-50%, -50%)`,
                      transformStyle: "preserve-3d",
                      width: "280px",
                    }}
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.08 : 0.82, opacity: isActive ? 1 : 0.5 }}
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className={`rounded-2xl p-6 border transition-colors cursor-pointer ${
                        isActive
                          ? "bg-card/95 border-primary/40 shadow-2xl shadow-primary/10 backdrop-blur-xl"
                          : "bg-card/60 border-border/30 backdrop-blur-md"
                      }`}
                      onClick={() => goTo(i)}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg ${isActive ? "scale-110" : ""} transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-display text-base font-bold mb-1.5 leading-tight">{service.title}</h3>
                      {isActive && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.3 }}>
                          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{service.description}</p>
                          <ul className="space-y-1.5 mb-4">
                            {service.features.map((f) => (
                              <li key={f} className="flex items-center gap-1.5 text-xs">
                                <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <Link to={`/services/${service.slug}`} onClick={(e) => e.stopPropagation()}>
                            <Button variant="outline" size="sm" className="w-full text-xs">View Details <ArrowRight className="w-3.5 h-3.5" /></Button>
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* ── Mobile: flat swipeable card ── */}
        {isMobile && (
          <div className="relative z-10 w-full px-6 mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl p-5 shadow-xl shadow-primary/5"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${servicesData[activeIdx].color} flex items-center justify-center mb-3 shadow-lg`}>
                  {(() => { const Ic = servicesData[activeIdx].icon; return <Ic className="w-6 h-6 text-white" />; })()}
                </div>
                <h3 className="font-display text-base font-bold mb-1">
                  {servicesData[activeIdx].title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {servicesData[activeIdx].description}
                </p>
                <ul className="space-y-1.5 mb-4">
                  {servicesData[activeIdx].features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs">
                      <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${servicesData[activeIdx].slug}`}>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* prev / next arrows */}
            <button onClick={goPrev} className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground z-30" aria-label="Previous">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={goNext} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 border border-border flex items-center justify-center text-muted-foreground z-30" aria-label="Next">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        )}

        {/* Dots indicator */}
        <div className={`${isMobile ? "mt-6" : "absolute bottom-8 md:bottom-12"} left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:gap-2 z-20`}>
          {servicesData.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-7 md:w-8 h-1.5 md:h-2 bg-primary"
                  : "w-1.5 md:w-2 h-1.5 md:h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={s.title}
            />
          ))}
        </div>

        {/* Active service name */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isMobile ? "mt-4" : "absolute bottom-16 md:bottom-20"} left-1/2 -translate-x-1/2 text-center z-20`}
        >
          <span className="text-xs md:text-sm font-semibold gradient-text">
            {servicesData[activeIdx].title}
          </span>
          <span className="text-[10px] md:text-xs text-muted-foreground ml-2">
            {activeIdx + 1} / {N}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
