import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/TiltCard";
import {
  ShoppingBag,
  Plus,
  Check,
  ArrowRight,
  SlidersHorizontal,
  Sparkles,
  Search,
  X,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  products,
  shopCategories,
  DELIVERY_PROCESS,
  type Product,
} from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_URL = "https://wa.me/254759075816";

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  const Icon = product.icon;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      billing: product.billing,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    toast({ title: `Added ${product.name} to cart` });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-border bg-card shadow-2xl"
      >
        {/* Hero image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${product.gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          {product.tag && (
            <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-accent to-primary text-white text-[10px] font-bold uppercase tracking-wide shadow">
              <Sparkles className="w-3 h-3" /> {product.tag}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-5 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-foreground/70">
                {product.category}
              </p>
              <h3 className="font-display text-xl font-bold text-white drop-shadow">
                {product.name}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {product.highlight && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> {product.highlight}
            </div>
          )}

          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.longDescription ?? product.description}
          </p>

          {/* Features */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              What's included
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {product.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          {product.deliverables && product.deliverables.length > 0 && (
            <div className="rounded-xl bg-muted/50 border border-border p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                You receive
              </p>
              <ul className="space-y-1.5">
                {product.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500" /> {d}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Delivery process */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              How we deliver
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DELIVERY_PROCESS.map((step, i) => {
                const StepIcon = step.icon;
                return (
                  <div key={step.title} className="relative rounded-xl border border-border bg-background/60 p-3">
                    <span className="absolute -top-2 -left-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent text-white text-[10px] font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                    <StepIcon className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs font-semibold leading-tight">{step.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-snug">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price + CTAs */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-primary to-accent">
            <div className="rounded-[calc(1rem-1px)] bg-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div>
                <p className="font-display text-3xl font-extrabold gradient-text tabular-nums">
                  {formatPrice(product.price, product.currency, product.billing)}
                </p>
                {product.compareAt && (
                  <p className="text-xs text-muted-foreground line-through tabular-nums">
                    {formatPrice(product.compareAt, product.currency, product.billing)}
                  </p>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="hero" onClick={handleAdd} className="flex-1 sm:flex-none">
                  {added ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {added ? "Added" : "Add to Cart"}
                </Button>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hi D&V, I'm interested in: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="h-full">
                    <MessageCircle className="w-4 h-4" /> Ask
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Pay with M-Pesa, Paystack card or Bitcoin · Receipts saved automatically
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Shop() {
  const { count, total, addItem } = useCart();
  const { toast } = useToast();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [added, setAdded] = useState<string | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = products.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesQuery =
      query.trim() === "" ||
      p.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      p.description.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleAdd = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      billing: product.billing,
      category: product.category,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
    toast({ title: `Added ${product.name} to cart` });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Shop | D&V Technologies Storefront"
        description="Buy IT support plans, hardware, software, AI, networking and cloud products from D&V Technologies in KES or USD."
        canonicalPath="/shop"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Header with background image */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-background/80" aria-hidden="true" />
          <div className="absolute inset-0 hero-pattern" aria-hidden="true" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <ShoppingBag className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">D&V Storefront</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Shop our <span className="gradient-text">tech catalog</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                {products.length}+ products — hardware, software, AI, security and managed services
                with transparent pricing. Tap any product for full details, then pay with M-Pesa,
                card or Bitcoin.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/pay">
                  <Button variant="hero" size="lg" className="group">
                    <ShoppingBag className="w-5 h-5" />
                    Cart ({count})
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/trade">
                  <Button variant="glass" size="lg">
                    Bulk & Trade
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Catalog */}
        <section className="py-12 lg:py-16 pb-28 lg:pb-32">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none md:flex-1">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                {shopCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                      category === cat
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent shadow-lg"
                        : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative md:w-72 flex-shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-full h-10 pl-9 pr-3 rounded-full border border-border bg-card text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              <AnimatePresence mode="popLayout">
                {visible.map((product) => {
                  const Icon = product.icon;
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.35 }}
                    >
                      <TiltCard intensity={8} className="h-full rounded-2xl">
                        <div
                          onClick={() => setSelected(product)}
                          className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-border via-border/40 to-border hover:from-primary/60 hover:via-primary/25 hover:to-primary/60 transition-all duration-500 cursor-pointer h-full"
                        >
                          <div className="relative rounded-[calc(1rem-1px)] bg-card/90 overflow-hidden flex flex-col h-full">
                            {/* Image */}
                            <div className="relative h-36 overflow-hidden">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  loading="lazy"
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${product.gradient}`} />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                              {product.tag && (
                                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-accent to-primary text-white text-[10px] font-bold uppercase tracking-wide shadow">
                                  <Sparkles className="w-3 h-3" />
                                  {product.tag}
                                </span>
                              )}
                            </div>

                            <div className="p-5 flex flex-col flex-1" style={{ transform: "translateZ(24px)" }}>
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                                {product.category}
                              </span>
                              <h3 className="font-display text-lg font-bold leading-snug mb-1.5">
                                {product.name}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
                                {product.description}
                              </p>

                              <div className="flex items-end justify-between mb-4">
                                <div>
                                  <p className="font-display text-xl font-extrabold gradient-text tabular-nums">
                                    {formatPrice(product.price, product.currency, product.billing)}
                                  </p>
                                  {product.compareAt && (
                                    <p className="text-xs text-muted-foreground line-through tabular-nums">
                                      {formatPrice(product.compareAt, product.currency, product.billing)}
                                    </p>
                                  )}
                                </div>
                                <span className="text-[10px] font-semibold text-emerald-500">
                                  {product.billing === "once" ? "One-time" : `Billed ${product.billing}`}
                                </span>
                              </div>

                              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                <Button
                                  variant={added === product.id ? "secondary" : "hero"}
                                  size="sm"
                                  className="flex-1"
                                  onClick={() => handleAdd(product)}
                                >
                                  {added === product.id ? (
                                    <>
                                      <Check className="w-4 h-4" /> Added
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-4 h-4" /> Add
                                    </>
                                  )}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelected(product)}
                                >
                                  Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {visible.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                No products match your search. Try a different keyword or category.
              </div>
            )}
          </div>
        </section>
      </main>

      <AnimatePresence>
        {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      {/* Floating cart bar — always-visible total + checkout CTA */}
      <AnimatePresence>
        {count > 0 && !selected && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-[90] flex justify-center pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-xl rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md shadow-2xl p-3 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-background border border-border text-[10px] font-black flex items-center justify-center text-primary">
                  {count > 99 ? "99+" : count}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-extrabold gradient-text tabular-nums leading-tight">
                  {formatPrice(total, "KES")}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {count} item{count > 1 ? "s" : ""} in your cart
                </p>
              </div>
              <Link to="/pay" className="flex-shrink-0">
                <Button variant="hero" size="lg" className="group px-5">
                  Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
