import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollytellingExperience } from "@/components/scrollytelling/ScrollytellingExperience";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustedClientsSection } from "@/components/sections/TrustedClientsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MissionSection } from "@/components/sections/MissionSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { AISection } from "@/components/sections/AISection";
import { FAQSection } from "@/components/sections/FAQSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { TelegramPromoSection } from "@/components/sections/TelegramPromoSection";
import { SEOHead } from "@/components/SEOHead";

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
        return () => { clearTimeout(t1); clearTimeout(t2); };
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="D&V Technologies | Nairobi Tech Company"
        description="Professional software, AI, cybersecurity, and IT solutions for modern businesses in Nairobi and beyond."
        canonicalPath="/"
      />
      <Navbar />
      <main id="main-content">
        <ScrollytellingExperience />
        <ServicesSection />
        {/* Packages should appear immediately after Services */}
        <PricingSection />
        <TrustedClientsSection />
        <TestimonialsSection />
        <MissionSection />
        <ShowcaseSection />
        <WhyChooseUsSection />
        <AISection />
        <FAQSection />
        <TelegramPromoSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
