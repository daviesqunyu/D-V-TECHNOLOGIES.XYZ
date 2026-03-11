import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
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
import { SEOHead } from "@/components/SEOHead";
import { AdSense } from "@/components/AdSense";

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
        <HeroSection />
        <ServicesSection />
        {/* Packages should appear immediately after Services */}
        <PricingSection />
        <TrustedClientsSection />
        <TestimonialsSection />
        <div className="container mx-auto px-4 py-6">
          <AdSense className="max-w-4xl mx-auto" />
        </div>
        <MissionSection />
        <WhyChooseUsSection />
        <AISection />
        <FAQSection />
        <div className="container mx-auto px-4 py-6">
          <AdSense className="max-w-4xl mx-auto" />
        </div>
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
