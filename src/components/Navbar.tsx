import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bot, Home, Briefcase, Phone, Users, Target, Zap, MessageSquare, HelpCircle, ArrowRight, DollarSign, Mail, Info, FolderKanban, Newspaper, Scale, FileText, ShoppingBag, ArrowLeftRight, Wallet, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoIcon } from "@/components/LogoIcon";
import { useCart } from "@/lib/cart";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/** Main nav: shown in header (keeps space for logo & name) */
const mainNavLinks = [
  { path: "/", label: "Home", icon: Home },
  { path: "/services", label: "Services", icon: Briefcase },
  { path: "/contact", label: "Contact", icon: Phone },
];

/** All pages: used in mobile menu only */
const allNavLinks = [
  ...mainNavLinks,
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/trade", label: "Trade", icon: ArrowLeftRight },
  { path: "/pay", label: "Pay", icon: Wallet },
  { path: "/portfolio", label: "Portfolio", icon: FolderKanban },
  { path: "/blog", label: "Blog", icon: Newspaper },
  // Route to the homepage packages section.
  { path: "/#pricing", label: "Pricing", icon: DollarSign },
  { path: "/careers", label: "Careers", icon: Users },
  { path: "/ai-assistant", label: "AI Assistant", icon: Bot },
];

const sectionLinks = [
  { hash: "#who-trust-us", label: "Why Trust Us", icon: Users },
  { hash: "#mission", label: "Our Mission", icon: Target },
  { hash: "#why-choose-us", label: "Why Choose Us", icon: Zap },
  { hash: "#pricing", label: "Pricing", icon: DollarSign },
  { hash: "#ai", label: "AI & Innovation", icon: MessageSquare },
  { hash: "#faq", label: "FAQ", icon: HelpCircle },
  { hash: "#newsletter", label: "Newsletter", icon: Mail },
  { hash: "#contact", label: "Get in Touch", icon: ArrowRight },
];

const desktopMenuItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "Shop", to: "/shop", icon: ShoppingBag },
  { label: "Trade", to: "/trade", icon: ArrowLeftRight },
  { label: "Pay", to: "/pay", icon: Wallet },
  { label: "AI Assistant", to: "/ai-assistant", icon: Bot },
  { label: "Services", to: "/services", icon: Briefcase },
  { label: "Portfolio", to: "/portfolio", icon: FolderKanban },
  { label: "Blog", to: "/blog", icon: Newspaper },
  { label: "Pricing", to: "/#pricing", icon: DollarSign },
  { label: "Careers", to: "/careers", icon: Users },
  { label: "About", to: "/about", icon: Info },
  { label: "Contact", to: "/contact", icon: Phone },
];

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { count } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = useCallback(
    (hash: string) => {
      // Close mobile menu and use router hash navigation so Index page
      // can handle smooth scrolling in one consistent place.
      setIsOpen(false);
      if (location.pathname === "/") {
        navigate({ pathname: "/", hash });
      } else {
        navigate({ pathname: "/", hash });
      }
    },
    [location.pathname, navigate]
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card" aria-label="Primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <LogoIcon size={44} />
            <div className="flex flex-col leading-none">
              <span className="font-display font-black text-lg tracking-tight gradient-text">
                D&amp;V Technologies
              </span>
              <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase font-medium">
                Silicon Savannah
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - main links only for logo/name space */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-1.5">
            <ThemeToggle />
            <Link
              to="/pay"
              className="relative p-2.5 rounded-lg hover:bg-muted transition-colors"
              aria-label={`Cart with ${count} items`}
              title="View cart & checkout"
            >
              <Wallet className="w-5 h-5 text-muted-foreground" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-accent to-primary text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-lg" aria-label="Open app menu">
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 glass-card border-border">
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  App
                </DropdownMenuLabel>
                {desktopMenuItems.slice(0, 5).map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link to={item.to} className="flex items-center gap-3 cursor-pointer">
                        <Icon className="w-4 h-4 text-primary" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                  Company
                </DropdownMenuLabel>
                {desktopMenuItems.slice(5).map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.label} asChild>
                      <Link to={item.to} className="flex items-center gap-3 cursor-pointer">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <div className="grid grid-cols-2 gap-1 p-1">
                  <DropdownMenuItem asChild>
                    <Link to="/privacy" className="cursor-pointer text-sm text-muted-foreground">
                      Privacy
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/terms" className="cursor-pointer text-sm text-muted-foreground">
                      Terms
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/contact">
              <Button variant="hero" size="default">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Theme Toggle & Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/pay"
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={`Cart with ${count} items`}
            >
              <Wallet className="w-5 h-5 text-muted-foreground" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-0.5 rounded-full bg-gradient-to-r from-accent to-primary text-white text-[9px] font-bold flex items-center justify-center shadow-lg">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - expanded with section links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">
                Main
              </p>
              <div className="space-y-1">
                {allNavLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <link.icon className="w-5 h-5 flex-shrink-0" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 mt-4 border-t border-border">
                Jump to section
              </p>
              <div className="space-y-1">
                {sectionLinks.map((item) => (
                  <button
                    key={item.hash}
                    onClick={() => scrollToSection(item.hash)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full text-left"
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 mt-4 border-t border-border space-y-2">
                <Link to="/contact" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="hero" className="w-full">
                    Get Started
                  </Button>
                </Link>
                <Link to="/ai-assistant" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="glass" className="w-full">
                    <Bot className="w-5 h-5" />
                    Try AI Assistant
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link to="/privacy" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4" />
                      Privacy
                    </Button>
                  </Link>
                  <Link to="/terms" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="outline" className="w-full">
                      <Scale className="w-4 h-4" />
                      Terms
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
