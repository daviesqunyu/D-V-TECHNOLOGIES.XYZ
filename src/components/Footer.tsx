import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, MessageCircle, Globe, Send, ShoppingBag, Crown, ArrowUpRight, Heart } from "lucide-react";
import { PaymentOptions } from "@/components/PaymentOptions";
import { LogoIcon } from "@/components/LogoIcon";
import {
  TELEGRAM_CHANNEL_URL,
  TELEGRAM_PREMIUM_URL,
  WEBSTORE_URL,
} from "@/lib/promo";

const WHATSAPP_NUMBER = "254759075816";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const PRIMARY_EMAIL = "info@dvtechnologies.xyz";
const SECONDARY_EMAIL = "contact@dvtechnologies.xyz";
const PRIMARY_PHONE = "0719 576 326";
const SECONDARY_PHONE = "0759 075 816";
const ADDRESS = "Lower Kabete, Nairobi, Kenya";

const footerLinks = {
  company: [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Blog", path: "/blog" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Contact", path: "/contact" },
  ],
  services: [
    { label: "IT Support", path: "/services/it-support-maintenance" },
    { label: "Software Dev", path: "/services/web-app-development" },
    { label: "Cloud Services", path: "/services/cloud-services" },
    { label: "Cybersecurity", path: "/services/cybersecurity" },
    { label: "AI & ML", path: "/services/ai-machine-learning" },
    { label: "All Services", path: "/services" },
  ],
  products: [
    { label: "Shop", path: "/shop" },
    { label: "Trade-In", path: "/trade" },
    { label: "Pricing", path: "/#pricing" },
    { label: "AI Assistant", path: "/ai-assistant" },
  ],
};

const socials = [
  { icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp", color: "hover:bg-[#25D366]/15 hover:text-[#25D366]" },
  { icon: Send, href: TELEGRAM_CHANNEL_URL, label: "Telegram", color: "hover:bg-[#229ED9]/15 hover:text-[#229ED9]" },
  { icon: Crown, href: TELEGRAM_PREMIUM_URL, label: "Premium", color: "hover:bg-primary/15 hover:text-primary" },
  { icon: ShoppingBag, href: WEBSTORE_URL, label: "Webstore", color: "hover:bg-amber-500/15 hover:text-amber-500" },
  { icon: Mail, href: `mailto:${PRIMARY_EMAIL}`, label: "Email", color: "hover:bg-primary/15 hover:text-primary" },
  { icon: Globe, href: "https://dvtechnologies.xyz", label: "Website", color: "hover:bg-primary/15 hover:text-primary" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3 group mb-5">
              <LogoIcon size={40} />
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-lg tracking-tight gradient-text">
                  D&V Technologies
                </span>
                <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase font-medium">
                  Silicon Savannah
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Transforming businesses through problem solving and innovation.
              One team for every stack — IT, software, networks, cloud, AI and security.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className={`w-9 h-9 rounded-xl border border-border/60 flex items-center justify-center text-muted-foreground transition-all ${s.color}`}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payments */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground mb-5">
              Contact
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`tel:+254719576326`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-muted-foreground/60" />
                  {PRIMARY_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PRIMARY_EMAIL}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-muted-foreground/60" />
                  <span className="truncate">{PRIMARY_EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]/70" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground/60 mt-0.5 flex-shrink-0" />
                {ADDRESS}
              </li>
            </ul>

            <PaymentOptions variant="footer" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/60 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground order-2 md:order-1">
            &copy; {new Date().getFullYear()} D&V Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground order-1 md:order-2">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span className="text-border">·</span>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Nairobi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
