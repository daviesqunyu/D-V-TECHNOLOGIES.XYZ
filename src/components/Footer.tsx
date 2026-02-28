import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Globe } from "lucide-react";
import { PaymentOptions } from "@/components/PaymentOptions";

const WHATSAPP_NUMBER = "254759075816";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const EMAIL = "info@dvtechnologies.xyz";
const PHONE = "0759 075 816";
const WEBSITE = "https://dvtechnologies.xyz";
const ADDRESS = "Lower Kabete, Nairobi, Kenya";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                <img src="/favicon.svg" alt="D&V Technologies" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-display font-bold text-xl">
                <span className="gradient-text">D&V</span>
                <span className="text-foreground"> Technologies</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Transforming Kenyan Business Through Problem Solving & Innovation. 
              Silicon Savannah 2030 Vision.
            </p>
            <div className="flex gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366]/30 text-[#25D366] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                title="Email us"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:+254759075816`}
                title="Call us"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                title="Our website"
                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/services" },
                { label: "Portfolio", path: "/portfolio" },
                { label: "Blog", path: "/blog" },
                // Pricing is a homepage section.
                { label: "Pricing", path: "/#pricing" },
                { label: "Careers", path: "/careers" },
                { label: "AI Assistant", path: "/ai-assistant" },
                { label: "Contact", path: "/contact" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms of Service", path: "/terms" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>IT Support & Maintenance</li>
              <li>Hardware Repair & Solutions</li>
              <li>Software Development</li>
              <li>Networking & Internet</li>
              <li>AI & Automation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  WhatsApp: {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="tel:+254759075816"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  {PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {ADDRESS}
              </li>
            </ul>
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/30">
              <PaymentOptions variant="footer" />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 D&V Technologies. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Proudly driving Nairobi's journey to become Africa's Silicon Savannah by 2030.
          </p>
        </div>
      </div>
    </footer>
  );
}
