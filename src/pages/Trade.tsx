import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftRight,
  Truck,
  Store,
  Percent,
  MapPin,
  MessageCircle,
  ArrowRight,
  ClipboardList,
  PackageCheck,
  Handshake,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/254759075816";

const PARTNERS = [
  { icon: Truck, title: "Bulk Hardware Supply", desc: "Servers, laptops, networking gear and CCTV at wholesale prices for offices and campuses." },
  { icon: Store, title: "Reseller Programme", desc: "Sell D&V services and earn margins on every plan, installation and support contract you bring in." },
  { icon: MapPin, title: "Regional Rollouts", desc: "Partner with us on ISP, campus and corporate networking projects across East Africa." },
];

const STEPS = [
  { icon: ClipboardList, title: "Send requirements", desc: "Tell us what you need — volumes, specs, timelines." },
  { icon: PackageCheck, title: "Get a quote", desc: "We price it transparently within 24 hours, KES or USD." },
  { icon: Handshake, title: "Close & deliver", desc: "Sign the deal, we supply, install and support." },
];

export default function Trade() {
  const { toast } = useToast();

  const marketItems = products.filter((p) => p.market || p.category === "Hardware" || p.category === "Networking");

  const requestQuote = (name: string) => {
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi D&V, I'd like a quote for: ${name}`)}`, "_blank", "noopener,noreferrer");
    toast({ title: `Quote request started for ${name}` });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Trade | D&V Technologies Marketplace"
        description="Bulk hardware supply, reseller programme and partner rollouts with D&V Technologies across East Africa."
        canonicalPath="/trade"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Header */}
        <section className="relative py-14 lg:py-20 hero-pattern overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-background/80" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                <ArrowLeftRight className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-500">D&V Trade</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Source, supply &amp; <span className="gradient-text-accent">grow</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                A marketplace for hardware supply, reselling and partner rollouts — built for
                businesses that want to move faster than their competitors.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="hero" size="lg" className="group">
                    <MessageCircle className="w-5 h-5" />
                    Chat with Trade Desk
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Link to="/shop">
                  <Button variant="glass" size="lg">
                    Browse Storefront
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partner cards */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-16">
              {PARTNERS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="rounded-2xl p-[1px] bg-gradient-to-b from-emerald-500/40 via-border/30 to-border"
                  >
                    <div className="rounded-[calc(1rem-1px)] bg-card p-6 h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-display text-lg font-bold mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Market items */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl font-bold mb-2">
                  Marketplace <span className="gradient-text">stock</span>
                </h2>
                <p className="text-muted-foreground">Request a quote for bulk or one-off orders.</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-emerald-500">
                <TrendingUp className="w-4 h-4" /> Wholesale pricing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {marketItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                    className="group rounded-2xl p-[1px] bg-gradient-to-b from-border via-border/40 to-border hover:from-emerald-500/50 hover:to-primary/40 transition-all duration-500"
                  >
                    <div className="rounded-[calc(1rem-1px)] bg-card p-5 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                          <Percent className="w-3 h-3" /> Trade price
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold mb-1.5">{item.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-display text-xl font-extrabold gradient-text tabular-nums">
                          {formatPrice(item.price, item.currency, item.billing)}
                        </p>
                        <span className="text-xs font-semibold text-emerald-500">per project</span>
                      </div>
                      <Button
                        variant="glass"
                        className="w-full group/btn"
                        onClick={() => requestQuote(item.name)}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Request Quote
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-12 lg:py-16 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                How <span className="gradient-text-accent">trading</span> works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From first message to delivered project — three simple steps.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                    className="relative text-center p-6"
                  >
                    <div className="relative inline-flex mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border border-emerald-500/40 text-emerald-500 flex items-center justify-center text-xs font-black">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
