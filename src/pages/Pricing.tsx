import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  // This project treats pricing as a homepage section (/#pricing).
  useEffect(() => {
    navigate("/#pricing", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pricing | D&V Technologies Service Packages"
        description="Explore D&V Technologies pricing packages for IT support, cybersecurity, software engineering, and AI transformation."
        canonicalPath="/pricing"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24" />
      <Footer />
    </div>
  );
}
