import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { ScrollytellingExperience } from "@/components/scrollytelling/ScrollytellingExperience";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { SEOHead } from "@/components/SEOHead";

/* Below-fold — deferred for faster first paint */
const TrustedClientsSection = lazy(() =>
  import("@/components/sections/TrustedClientsSection").then((m) => ({ default: m.TrustedClientsSection })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
);
const MissionSection = lazy(() =>
  import("@/components/sections/MissionSection").then((m) => ({ default: m.MissionSection })),
);
const FAQSection = lazy(() =>
  import("@/components/sections/FAQSection").then((m) => ({ default: m.FAQSection })),
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((m) => ({ default: m.ContactSection })),
);

const SectionFallback = () => <div className="min-h-[32vh]" aria-hidden="true" />;

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        const t1 = setTimeout(tryScroll, 200);
        const t2 = setTimeout(tryScroll, 500);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="D&V Technologies | Future-Ready IT, AI & Digital Solutions"
        description="Professional software, AI, cybersecurity, IT and hardware solutions for modern businesses — delivered end to end, anywhere in the world."
        canonicalPath="/"
      />
      <Navbar />
      <main id="main-content">
        {/* Story once → services once → buy → trust → proof → mission → FAQ → contact */}
        <ScrollytellingExperience />
        <SectionDivider />
        <ServicesSection />
        <PricingSection />
        <Suspense fallback={<SectionFallback />}>
          <SectionDivider />
          <TrustedClientsSection />
          <SectionDivider />
          <TestimonialsSection />
          <SectionDivider />
          <MissionSection />
          <SectionDivider />
          <FAQSection />
          <SectionDivider />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
