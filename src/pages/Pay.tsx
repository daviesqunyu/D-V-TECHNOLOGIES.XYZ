import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Trash2,
  Minus,
  Plus,
  Send,
  CreditCard,
  Bitcoin,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const WHATSAPP_URL = "https://wa.me/254759075816";
const PAY_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    sub: "STK push · weekly subscriptions",
    icon: Send,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "paystack",
    name: "Card (Paystack)",
    sub: "Visa · Mastercard · secure",
    icon: CreditCard,
    gradient: "from-primary to-cyan-500",
  },
  {
    id: "btc",
    name: "Bitcoin",
    sub: "Global · low fees",
    icon: Bitcoin,
    gradient: "from-orange-500 to-amber-500",
  },
] as const;

export default function Pay() {
  const { items, count, total, updateQty, removeItem, clear } = useCart();
  const [method, setMethod] = useState<(typeof PAY_METHODS)[number]["id"]>("mpesa");
  const [confirmed, setConfirmed] = useState(false);

  const orderSummary = items
    .map((item) => `${item.name} x${item.qty}`)
    .join("\n");

  const checkout = () => {
    const text = encodeURIComponent(
      `Hi D&V Technologies, I'd like to complete my order:\n\n${orderSummary}\n\nTotal: ${formatPrice(
        total,
        "KES"
      )}\nPayment: ${PAY_METHODS.find((m) => m.id === method)?.name}`
    );
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2000);
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pay | Checkout — D&V Technologies"
        description="Checkout with M-Pesa, Paystack card or Bitcoin. Review your cart and confirm your order with D&V Technologies."
        canonicalPath="/pay"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24 pb-10">
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-background/85" aria-hidden="true" />
          <div className="absolute inset-0 hero-pattern" aria-hidden="true" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Secure Checkout</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
                Your <span className="gradient-text">cart</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                {count > 0
                  ? `${count} item${count > 1 ? "s" : ""} ready for checkout.`
                  : "Add something from the shop first."}
              </p>
            </motion.div>

            {count === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto text-center rounded-3xl border border-dashed border-border bg-card/60 p-12"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Browse the storefront — plans, hardware, software and AI services all live there.
                </p>
                <Link to="/shop">
                  <Button variant="hero" size="lg" className="group">
                    Browse Shop
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Cart items */}
                <div className="lg:col-span-3 space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        className="rounded-2xl border border-border bg-card p-4 flex items-center gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatPrice(item.price, item.currency, item.billing)} · {item.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-bold tabular-nums">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right w-28">
                          <p className="font-bold gradient-text tabular-nums">
                            {formatPrice(item.price * item.qty, item.currency, item.billing)}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors mt-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    onClick={clear}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" /> Clear cart
                  </button>
                </div>

                {/* Summary */}
                <div className="lg:col-span-2">
                  <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
                    <h2 className="font-display text-lg font-bold mb-4">Order summary</h2>
                    <div className="space-y-2 mb-5">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground truncate pr-2">
                            {item.name} × {item.qty}
                          </span>
                          <span className="font-medium tabular-nums">
                            {formatPrice(item.price * item.qty, item.currency, item.billing)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-border pt-3 flex justify-between font-display text-lg font-bold">
                        <span>Total</span>
                        <span className="gradient-text tabular-nums">
                          {formatPrice(total, "KES")}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Payment method
                    </p>
                    <div className="space-y-2 mb-6">
                      {PAY_METHODS.map((m) => {
                        const Icon = m.icon;
                        const selected = method === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => setMethod(m.id)}
                            className={`w-full flex items-center gap-3 rounded-xl border p-3 transition-all ${
                              selected
                                ? "border-primary/50 bg-primary/5 shadow"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            <span className={`w-10 h-10 rounded-lg bg-gradient-to-br ${m.gradient} flex items-center justify-center`}>
                              <Icon className="w-4 h-4 text-white" />
                            </span>
                            <span className="flex-1 text-left">
                              <span className="block text-sm font-semibold">{m.name}</span>
                              <span className="block text-xs text-muted-foreground">{m.sub}</span>
                            </span>
                            {selected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                          </button>
                        );
                      })}
                    </div>

                    <Button variant="hero" size="lg" className="w-full mb-3" onClick={checkout}>
                      <MessageCircle className="w-5 h-5" />
                      {confirmed ? "Opening WhatsApp…" : "Confirm on WhatsApp"}
                    </Button>
                    <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      Paystack &amp; M-Pesa flows are end-to-end secure. We never store card details.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
