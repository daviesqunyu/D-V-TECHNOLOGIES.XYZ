import { Link } from "react-router-dom";
import { Sparkles, Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
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
              {[Twitter, Linkedin, Github, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "AI Assistant", path: "/ai-assistant" },
                { label: "Contact", path: "/contact" },
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
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                info@dvtechnologies.com
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                0759 075 816
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Lower Kabete, Nairobi, Kenya
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30">
              <p className="text-xs font-medium flex items-center gap-2">
                <span className="text-accent">₿</span>
                Crypto Payments Accepted
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 D&V Technologies. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground text-center">
            🌍 Proudly driving Nairobi's journey to become Africa's Silicon Savannah by 2030!
          </p>
        </div>
      </div>
    </footer>
  );
}
