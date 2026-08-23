import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Lock,
  Truck,
  RotateCcw,
   ChevronRight,
   Package,
   Copy,
   Check,
   Coins,
   Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { api, authHeaders } from "@/lib/api";

const WHATSAPP_URL = "https://wa.me/254759075816";
const BTC_ADDRESS = "1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i";
const USDT_ADDRESS =
  (import.meta.env.VITE_USDT_TRC20_ADDRESS as string | undefined) ||
  "TKfF9M8iUwy2VdB4Eor5et8AnFRMvzJELT";
const PAY_METHODS = [
  {
    id: "mpesa",
    name: "M-Pesa",
    sub: "STK push · instant",
    icon: Send,
    gradient: "from-green-500 to-emerald-500",
    badge: "Popular",
  },
  {
    id: "paystack",
    name: "Card Payment",
    sub: "Visa · Mastercard · Paystack",
    icon: CreditCard,
    gradient: "from-primary to-cyan-500",
    badge: "Secure",
  },
  {
    id: "btc",
    name: "Bitcoin",
    sub: "BTC · Global payments",
    icon: Bitcoin,
    gradient: "from-orange-500 to-amber-500",
    badge: null,
  },
  {
    id: "usdt",
    name: "USDT Tether",
    sub: "TRC-20 · Stablecoin · Low fees",
    icon: Coins,
    gradient: "from-emerald-600 to-teal-500",
    badge: null,
  },
] as const;

const TRUST_ITEMS = [
  { icon: Lock, label: "Encrypted checkout" },
  { icon: ShieldCheck, label: "Secure payments" },
  { icon: Truck, label: "Instant delivery" },
  { icon: RotateCcw, label: "Satisfaction guaranteed" },
];

export default function Pay() {
  const { items, count, total, updateQty, removeItem, clear } = useCart();
  const [method, setMethod] = useState<(typeof PAY_METHODS)[number]["id"]>("mpesa");
  const [loading, setLoading] = useState(false);
  const [btcCopied, setBtcCopied] = useState(false);
  const [usdtCopied, setUsdtCopied] = useState(false);
  const [paystackEmail, setPaystackEmail] = useState("");
  const [paystackName, setPaystackName] = useState("");
  const [showPaystackForm, setShowPaystackForm] = useState(false);

  const orderSummary = items
    .map((item) => `${item.name} x${item.qty}`)
    .join("\n");

  /* ── M-Pesa: open WhatsApp ── */
  const checkoutWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi D&V Technologies, I'd like to complete my order:\n\n${orderSummary}\n\nTotal: ${formatPrice(total, "KES")}\nPayment: M-Pesa`
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  /* ── Bitcoin: copy address ── */
  const copyBtc = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setBtcCopied(true);
    setTimeout(() => setBtcCopied(false), 2500);
  };

  /* ── USDT: copy address ── */
  const copyUsdt = () => {
    navigator.clipboard.writeText(USDT_ADDRESS);
    setUsdtCopied(true);
    setTimeout(() => setUsdtCopied(false), 2500);
  };

  /* ── Card (Paystack): initiate checkout ── */
  const checkoutPaystack = async () => {
    const email = paystackEmail.trim().toLowerCase();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(api.initiatePayment, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          method: "paystack",
          plan: items.map((i) => i.name).join(", "),
          amount: total,
          email,
          name: paystackName.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { success?: boolean; authorization_url?: string; error?: string; message?: string }
        | null;
      if (res.ok && data?.success && data.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }
      alert(data?.error || data?.message || "Could not start card checkout. Please try again.");
    } catch (e) {
      alert(e instanceof Error ? e.message : "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Main checkout handler ── */
  const handleCheckout = () => {
    if (method === "mpesa") {
      checkoutWhatsApp();
    } else if (method === "btc") {
      copyBtc();
    } else if (method === "usdt") {
      copyUsdt();
    } else if (method === "paystack") {
      if (!showPaystackForm) {
        setShowPaystackForm(true);
      } else {
        checkoutPaystack();
      }
    }
  };

  const ctaLabel = (() => {
    if (method === "mpesa") return "Pay with M-Pesa";
    if (method === "btc") return btcCopied ? "Address Copied!" : "Copy Bitcoin Address";
    if (method === "usdt") return usdtCopied ? "Address Copied!" : "Copy USDT Address";
    if (method === "paystack") {
      if (!showPaystackForm) return "Pay with Card";
      return loading ? "Processing…" : "Pay Now";
    }
    return "Checkout";
  })();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pay | Checkout — D&V Technologies"
        description="Checkout with M-Pesa, Paystack card, Bitcoin or USDT TRC-20. Review your cart and confirm your order with D&V Technologies."
        canonicalPath="/pay"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="py-10 lg:py-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-foreground font-medium">Checkout</span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  Checkout
                </h1>
              </div>
              <p className="text-muted-foreground ml-[52px]">
                {count > 0
                  ? `${count} item${count > 1 ? "s" : ""} in your order`
                  : "Your cart is empty — browse the shop to get started."}
              </p>
            </motion.div>
          </div>

          {count === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
              {/* Left: Cart items */}
              <div className="lg:col-span-3">
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                    <span className="text-sm font-semibold">Cart Review</span>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">2</span>
                    <span className="text-sm text-muted-foreground">Payment</span>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-bold">3</span>
                    <span className="text-sm text-muted-foreground">Confirm</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, i) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -60, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        className="group rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 md:p-5 flex items-center gap-4 hover:border-border hover:shadow-sm transition-all"
                      >
                        {/* Item icon placeholder */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 border border-border/40">
                          <Package className="w-5 h-5 text-primary/70" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-sm md:text-base truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatPrice(item.price, item.currency, item.billing)}
                            {item.category && (
                              <>
                                <span className="mx-1.5 text-border">·</span>
                                {item.category}
                              </>
                            )}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-muted/50 rounded-xl p-1">
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-background transition-colors"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm tabular-nums">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-background transition-colors"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price + remove */}
                        <div className="text-right min-w-[90px]">
                          <p className="font-bold gradient-text text-sm tabular-nums">
                            {formatPrice(item.price * item.qty, item.currency, item.billing)}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors mt-1 opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Clear + continue shopping */}
                <div className="flex items-center justify-between mt-5">
                  <button
                    onClick={clear}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear cart
                  </button>
                  <Link
                    to="/shop"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Continue shopping <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right: Order summary */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 lg:sticky lg:top-28">
                  <h2 className="font-display text-lg font-bold mb-5">Order Summary</h2>

                  {/* Line items */}
                  <div className="space-y-3 mb-5">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate pr-3">
                          {item.name}
                          {item.qty > 1 && <span className="text-muted-foreground/60"> &times;{item.qty}</span>}
                        </span>
                        <span className="font-medium tabular-nums whitespace-nowrap">
                          {formatPrice(item.price * item.qty, item.currency, item.billing)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/60 pt-4 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="font-display text-2xl font-black gradient-text tabular-nums">
                        {formatPrice(total, "KES")}
                      </span>
                    </div>
                  </div>

                  {/* Payment methods */}
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                    Payment Method
                  </p>
                  <div className="space-y-2 mb-6">
                    {PAY_METHODS.map((m) => {
                      const Icon = m.icon;
                      const selected = method === m.id;
                      return (
                        <button
                          key={m.id}
                          onClick={() => { setMethod(m.id); if (m.id !== "paystack") setShowPaystackForm(false); }}
                          className={`w-full flex items-center gap-3 rounded-xl border p-3.5 transition-all ${
                            selected
                              ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/5 ring-1 ring-primary/20"
                              : "border-border/60 hover:border-border hover:bg-muted/30"
                          }`}
                        >
                          <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                            <Icon className="w-4.5 h-4.5 text-white" />
                          </span>
                          <span className="flex-1 text-left">
                            <span className="block text-sm font-semibold">{m.name}</span>
                            <span className="block text-[11px] text-muted-foreground">{m.sub}</span>
                          </span>
                          <div className="flex items-center gap-2">
                            {m.badge && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {m.badge}
                              </span>
                            )}
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              selected ? "border-primary bg-primary" : "border-border"
                            }`}>
                              {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Paystack form (shown when card selected and "Pay with Card" clicked) */}
                  <AnimatePresence>
                    {method === "paystack" && showPaystackForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3 mb-4">
                          <label className="text-xs text-muted-foreground block">
                            Full name
                            <Input
                              value={paystackName}
                              onChange={(e) => setPaystackName(e.target.value)}
                              placeholder="John Doe"
                              className="mt-1 h-10 bg-background/80"
                              autoComplete="name"
                              disabled={loading}
                            />
                          </label>
                          <label className="text-xs text-muted-foreground block">
                            Email (for receipt & Paystack redirect)
                            <Input
                              value={paystackEmail}
                              onChange={(e) => setPaystackEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="mt-1 h-10 bg-background/80"
                              type="email"
                              autoComplete="email"
                              disabled={loading}
                            />
                          </label>
                          <p className="text-[11px] text-muted-foreground">
                            You'll be redirected to Paystack to enter card details securely. We never store your card.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bitcoin address (shown when BTC selected) */}
                  <AnimatePresence>
                    {method === "btc" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4 mb-4">
                          <p className="text-xs font-medium text-foreground mb-2">Send Bitcoin to:</p>
                          <div className="flex items-center gap-2 bg-background/80 rounded-lg p-2 border border-border/60">
                            <code className="text-[11px] text-muted-foreground break-all flex-1 font-mono">{BTC_ADDRESS}</code>
                            <button onClick={copyBtc} className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors" title="Copy address">
                              {btcCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-2">
                            Send exactly <span className="font-medium text-foreground">{formatPrice(total, "KES")}</span> worth of BTC. After payment, message us on WhatsApp to confirm.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* USDT TRC-20 address (shown when USDT selected) */}
                  <AnimatePresence>
                    {method === "usdt" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-foreground">Send USDT (TRC-20) to:</p>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              Tron Network
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-background/80 rounded-lg p-2 border border-border/60">
                            <code className="text-[11px] text-muted-foreground break-all flex-1 font-mono">{USDT_ADDRESS}</code>
                            <button onClick={copyUsdt} className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors" title="Copy USDT address">
                              {usdtCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                            Send only <span className="font-medium text-foreground">USDT on the TRON (TRC-20) network</span> — equivalent of <span className="font-medium text-foreground">{formatPrice(total, "KES")}</span>. Other networks will be lost. After sending, message us on WhatsApp with the transaction hash (TXID) to confirm.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* M-Pesa info */}
                  <AnimatePresence>
                    {method === "mpesa" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 mb-4">
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            You'll be redirected to WhatsApp to confirm your order. We'll send you an M-Pesa STK push to your phone to complete payment.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CTA Button */}
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full mb-3 h-12 text-base"
                    onClick={handleCheckout}
                    disabled={loading || (method === "paystack" && showPaystackForm && !paystackEmail.trim())}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : method === "mpesa" ? (
                      <Send className="w-5 h-5" />
                    ) : method === "btc" ? (
                      btcCopied ? <CheckCircle2 className="w-5 h-5" /> : <Bitcoin className="w-5 h-5" />
                    ) : method === "usdt" ? (
                      usdtCopied ? <CheckCircle2 className="w-5 h-5" /> : <Coins className="w-5 h-5" />
                    ) : (
                      <CreditCard className="w-5 h-5" />
                    )}
                    {ctaLabel}
                  </Button>

                  {method === "mpesa" && (
                    <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center mb-3">
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      Opens WhatsApp to complete your M-Pesa order
                    </p>
                  )}

                  {/* Trust signals */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {TRUST_ITEMS.map((t) => (
                      <div key={t.label} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <t.icon className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        {t.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ─── Empty cart state ─── */
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-sm p-10 md:p-14">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-5 border border-border/40">
          <ShoppingBag className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Cart is empty</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto leading-relaxed">
          Explore our shop for plans, hardware, software and AI services — everything in one place.
        </p>
        <Link to="/shop">
          <Button variant="hero" size="lg" className="group">
            Browse Shop
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
