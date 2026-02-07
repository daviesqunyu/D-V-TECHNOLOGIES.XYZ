import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AISection } from "@/components/sections/AISection";
import { MissionSection } from "@/components/sections/MissionSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <MissionSection />
        <AISection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
