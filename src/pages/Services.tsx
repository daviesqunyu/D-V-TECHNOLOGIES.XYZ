import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
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
    const unsub = totalRotation.on("change", (v) => {
      rotation.set(v);
      const idx = Math.round(-v / ANGLE_PER) % N;
      setActiveIdx(((idx % N) + N) % N);
    });
    return unsub;
  }, [totalRotation]);

  const scrollToService = useCallback(
    (idx: number) => {
      const current = rotation.get();
      const currentIdx = Math.round(-current / ANGLE_PER) % N;
      const normalized = ((currentIdx % N) + N) % N;
      let diff = idx - normalized;
      if (diff > N / 2) diff -= N;
      if (diff < -N / 2) diff += N;
      const target = current - diff * ANGLE_PER;
      animate(rotation, target, {
        type: "spring",
        stiffness: 80,
        damping: 20,
        onComplete: () => {
          setActiveIdx(idx);
        },
      });
    },
    [rotation]
  );

  const radius = isMobile ? 220 : 380;

  return (
    <section
      ref={containerRef}
      className="relative bg-card"
      style={{ height: `${N * 120 + 600}px` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Central glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-primary/10" />
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-primary/5" />
          <div className="absolute w-[400px] h-[400px] md:w-[650px] md:h-[650px] rounded-full border border-primary/[0.03]" />
        </div>

        {/* Orbital ring label */}
        <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 text-center z-20">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Scroll to explore
          </p>
          <ChevronDown className="w-4 h-4 text-primary mx-auto mt-1 animate-bounce" />
        </div>

        {/* 3D Carousel */}
        <div
          className="relative z-10"
          style={{
            width: `${radius * 2 + 320}px`,
            height: "400px",
            perspective: "1200px",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              rotateY: rotation,
            }}
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
                    width: isMobile ? "200px" : "280px",
                  }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.08 : 0.82,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className={`rounded-2xl p-5 md:p-6 border transition-colors cursor-pointer ${
                      isActive
                        ? "bg-card/95 border-primary/40 shadow-2xl shadow-primary/10 backdrop-blur-xl"
                        : "bg-card/60 border-border/30 backdrop-blur-md"
                    }`}
                    onClick={() => scrollToService(i)}
                  >
                    <div
                      className={`w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3 md:mb-4 shadow-lg ${
                        isActive ? "scale-110" : ""
                      } transition-transform`}
                    >
                      <Icon className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <h3 className="font-display text-sm md:text-base font-bold mb-1.5 leading-tight">
                      {service.title}
                    </h3>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-xs md:text-sm text-muted-foreground mb-3 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-1.5 mb-4">
                          {service.features.map((f) => (
                            <li key={f} className="flex items-center gap-1.5 text-xs">
                              <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={`/services/${service.slug}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            View Details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Service dots indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {servicesData.map((s, i) => (
            <button
              key={s.slug}
              onClick={() => scrollToService(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={s.title}
            />
          ))}
        </div>

        {/* Active service name label */}
        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 text-center z-20"
        >
          <span className="text-sm font-semibold gradient-text">
            {servicesData[activeIdx].title}
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            {activeIdx + 1} / {N}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
