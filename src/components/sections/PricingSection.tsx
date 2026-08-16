import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X as XIcon,
  ArrowRight,
  Sparkles,
  Bitcoin,
  Copy,
  Loader2,
  MessageCircle,
  CreditCard,
  CircleDollarSign,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { api, authHeaders } from "@/lib/api";

const WHATSAPP_URL = "https://wa.me/254759075816";
const BTC_ADDRESS = "1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i";

type Feature = { text: string; included: boolean };

interface Plan {
  tier: string;
  name: string;
  priceUsd: number;
  description: string;
  features: Feature[];
  highlighted: boolean;
  cta: string;
}

type Currency = "USD" | "KES";

const USD_TO_KES_RATE = Number(import.meta.env.VITE_USD_TO_KES_RATE ?? 129);

function usdToKes(usd: number): number {
  const safeRate = Number.isFinite(USD_TO_KES_RATE) && USD_TO_KES_RATE > 0 ? USD_TO_KES_RATE : 129;
  return usd * safeRate;
}

function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatKes(amount: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);
}

const plans: Plan[] = [
  {
    tier: "BASIC",
    name: "Essential Support",
    priceUsd: 300,
    description:
      "Core IT support for small businesses getting started with professional tech services.",
    features: [
      { text: "Remote IT support (business hours)", included: true },
      { text: "Basic hardware troubleshooting", included: true },
      { text: "Software installation & updates", included: true },
      { text: "Email & productivity setup", included: true },
      { text: "Monthly system health check", included: true },
      { text: "Basic Wi-Fi setup (single AP)", included: true },
      { text: "On-site visits (1/month)", included: false },
      { text: "Custom software development", included: false },
      { text: "Cloud migration & management", included: false },
      { text: "Cybersecurity audit & firewall", included: false },
      { text: "AI & automation solutions", included: false },
      { text: "Dedicated account manager", included: false },
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    tier: "PREMIUM",
    name: "Advanced Solutions",
    priceUsd: 650,
    description:
      "Full-service IT, networking, cloud, and security for growing businesses.",
    features: [
      { text: "24/7 remote & on-site support", included: true },
      { text: "Hardware repair & server maintenance", included: true },
      { text: "Software updates & patch management", included: true },
      { text: "Network design & Wi-Fi (multi-AP)", included: true },
      { text: "Weekly system health checks", included: true },
      { text: "Cloud migration & SaaS setup", included: true },
      { text: "On-site visits (4/month)", included: true },
      { text: "Firewall & VPN configuration", included: true },
      { text: "Data backup & recovery plan", included: true },
      { text: "Custom software development", included: false },
      { text: "AI & automation solutions", included: false },
      { text: "Dedicated account manager", included: false },
    ],
    highlighted: true,
    cta: "Most Popular",
  },
  {
    tier: "EXCLUSIVE",
    name: "Enterprise & AI",
    priceUsd: 900,
    description:
      "Unlimited support, custom software, AI, cybersecurity, and full digital transformation.",
    features: [
      { text: "24/7 priority support (unlimited)", included: true },
      { text: "Unlimited hardware repair & upgrades", included: true },
      { text: "Enterprise networking & internet", included: true },
      { text: "Custom software & ERP development", included: true },
      { text: "Full cloud infrastructure management", included: true },
      { text: "Cybersecurity audit, firewall & training", included: true },
      { text: "Unlimited on-site visits", included: true },
      { text: "AI & automation solutions", included: true },
      { text: "Predictive analytics & NLP", included: true },
      { text: "Business process automation", included: true },
      { text: "Digital strategy consulting", included: true },
      { text: "Dedicated account manager", included: true },
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

const PAYMENTS = [
  { icon: Smartphone, label: "M-Pesa" },
  { icon: CreditCard, label: "Cards & Apple Pay" },
  { icon: Bitcoin, label: "Bitcoin" },
] as const;

function PaymentModal({
  plan,
  currency,
  onClose,
}: {
  plan: Plan;
  currency: Currency;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const [tab, setTab] = useState<"paystack" | "btc">("paystack");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [btcCopied, setBtcCopied] = useState(false);

  const amountUsd = plan.priceUsd;
  const amountKes = Math.round(usdToKes(amountUsd));
  const displayPrice =
    currency === "KES" ? `${formatKes(amountKes)}` : `${formatUsd(amountUsd)}`;

  const handleBtcCopy = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setBtcCopied(true);
    toast({ title: "Bitcoin address copied!" });
    setTimeout(() => setBtcCopied(false), 2000);
  };

  const handlePaystack = async () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      toast({ title: "Enter your email address", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(api.initiatePayment, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          method: "paystack",
          plan: plan.name,
          amount: amountKes,
          email: trimmed,
          name: name.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { success?: boolean; authorization_url?: string; reference?: string; error?: string; message?: string }
        | null;

      if (res.ok && data?.success && data.authorization_url) {
        window.location.href = data.authorization_url;
        return;
      }

      toast({
        title: "Paystack error",
        description: data?.error || data?.message || "Could not start card checkout. Please try again.",
        variant: "destructive",
      });
    } catch (e) {
      toast({
        title: "Connection error",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md rounded-2xl bg-card border border-border p-6 lg:p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-xl font-bold">Pay for {plan.name}</h3>
            <p className="text-sm text-muted-foreground">
              {displayPrice}/month{" "}
              <span className="text-muted-foreground/70">
                {currency === "KES" ? `(${formatUsd(amountUsd)})` : `(~${formatKes(amountKes)})`}
              </span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex rounded-xl bg-muted p-1 mb-6">
          <button
            onClick={() => setTab("paystack")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === "paystack"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            M-Pesa/Card
          </button>
          <button
            onClick={() => setTab("btc")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === "btc" ? "bg-accent text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bitcoin className="w-5 h-5" />
            Bitcoin
          </button>
        </div>

        {tab === "btc" ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-2">
                Send the equivalent of {formatUsd(amountUsd)} USD in BTC to:
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs bg-muted p-2 rounded break-all font-mono">{BTC_ADDRESS}</code>
                <Button size="sm" variant="outline" onClick={handleBtcCopy} className="flex-shrink-0">
                  {btcCopied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(
                `Hi D&V Technologies, I've sent BTC payment for the ${plan.name} plan (${formatUsd(amountUsd)}/month). Transaction ID: `
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button className="w-full h-12 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold">
                <MessageCircle className="w-5 h-5" />
                Confirm on WhatsApp
              </Button>
            </a>
            <p className="text-xs text-muted-foreground text-center">
              After sending BTC, share your transaction ID on WhatsApp for confirmation.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-3">
              <p className="text-sm font-medium">Card payment details</p>
              <p className="text-xs text-muted-foreground">
                Add your name and email here. You will be redirected to Paystack to enter card number, CVV and expiry securely — we never see or store them. Apple Pay appears automatically on supported devices.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Full name (for receipt & admin)</label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-muted/50 h-10"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Email (receipt & Paystack)</label>
                  <Input
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-muted/50 h-10"
                    type="email"
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>
            <Button onClick={handlePaystack} disabled={loading} className="w-full h-12 font-semibold">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay {formatKes(amountKes)} with card
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              You will be redirected to Paystack to complete payment. The record is saved for your receipt and our records.
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [currency, setCurrency] = useState<Currency>("KES");

  const currencyLabel = useMemo(() => {
    const rate = Number.isFinite(USD_TO_KES_RATE) && USD_TO_KES_RATE > 0 ? USD_TO_KES_RATE : 160;
    return `1 USD ≈ ${Math.round(rate)} KES`;
  }, []);

  return (
    <>
      <section id="pricing" className="scroll-mt-24 py-20 lg:py-32 relative overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 hero-pattern opacity-40" aria-hidden="true" />
        <div className="absolute inset-0 grid-pattern opacity-30" aria-hidden="true" />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[44rem] h-[28rem] bg-primary/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <CircleDollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Simple, transparent pricing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Packages that <span className="gradient-text">scale with you</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the level of support your business needs — no lock-in, cancel anytime.
              Pay your way: M-Pesa, cards, Apple Pay or Bitcoin.
            </p>

            {/* Currency toggle */}
            <div className="mt-7 flex items-center justify-center gap-3">
              <div className="inline-flex rounded-xl bg-muted p-1 border border-border">
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    currency === "USD" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("KES")}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    currency === "KES" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  KES
                </button>
              </div>
              <span className="text-xs text-muted-foreground">{currencyLabel}</span>
            </div>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
            {plans.map((plan, i) => {
              const lastOnMd = plans.length - 1;
              return (
                <motion.div
                  key={plan.tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`${i === lastOnMd ? "md:col-span-2 lg:col-span-1" : ""} ${
                    plan.highlighted ? "lg:-translate-y-3" : ""
                  } relative`}
                >
                  {/* Glow behind highlighted plan */}
                  {plan.highlighted && (
                    <div
                      className="absolute -inset-1 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-xl opacity-60"
                      aria-hidden="true"
                    />
                  )}

                  <div
                    className={`relative h-full rounded-3xl p-[1px] transition-all duration-500 ${
                      plan.highlighted
                        ? "bg-gradient-to-b from-primary via-primary/50 to-accent shadow-2xl shadow-primary/20"
                        : "bg-gradient-to-b from-border/60 to-border/20 hover:from-primary/50 hover:to-accent/40"
                    }`}
                  >
                    <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-card p-6 lg:p-8 flex flex-col overflow-hidden">
                      {/* Top accent for highlighted */}
                      {plan.highlighted && (
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                      )}

                      {/* Badge */}
                      <div className="mb-5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest px-3 py-1.5 rounded-full ${
                            plan.highlighted
                              ? "bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/30"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {plan.highlighted && <Sparkles className="w-3.5 h-3.5" />}
                          {plan.tier}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>

                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="font-display text-5xl font-extrabold gradient-text">
                          {currency === "KES"
                            ? formatKes(Math.round(usdToKes(plan.priceUsd)))
                            : formatUsd(plan.priceUsd)}
                        </span>
                        <span className="text-sm text-muted-foreground">/month</span>
                      </div>

                      <p className="mb-7 flex-shrink-0 text-sm text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>

                      {/* Divider */}
                      <div className="h-px bg-border/60 mb-6" />

                      <ul className="space-y-3 mb-8 flex-1">
                        {plan.features.map((f) => (
                          <li
                            key={f.text}
                            className={`flex items-start gap-2.5 text-sm ${
                              f.included ? "text-foreground" : "text-muted-foreground/50"
                            }`}
                          >
                            {f.included ? (
                              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check className="w-3 h-3" />
                              </span>
                            ) : (
                              <span className="w-5 h-5 rounded-full bg-muted text-muted-foreground/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <XIcon className="w-3 h-3" />
                              </span>
                            )}
                            <span className={f.included ? "" : "line-through"}>{f.text}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Button
                        variant={plan.highlighted ? "hero" : "outline"}
                        size="lg"
                        className={`w-full group font-semibold ${plan.highlighted ? "" : "hover:border-primary/50 hover:text-primary"}`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        {plan.highlighted && <Sparkles className="w-4 h-4" />}
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>

                      {/* Payment methods */}
                      <div className="mt-4 flex items-center justify-center gap-3 border-t border-border/60 pt-4">
                        {PAYMENTS.map((p, idx) => (
                          <button
                            key={p.label}
                            onClick={() => setSelectedPlan(plan)}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <p.icon className="w-4 h-4" />
                            <span className={idx === PAYMENTS.length - 1 ? "hidden sm:inline" : ""}>
                              {p.label}
                            </span>
                            {idx < PAYMENTS.length - 1 && (
                              <span className="text-muted-foreground/30 ml-1.5">·</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" /> Secure payments
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-primary" /> M-Pesa
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-primary" /> Visa · Mastercard · Apple Pay
            </span>
            <span className="flex items-center gap-1.5">
              <Bitcoin className="w-4 h-4 text-accent" /> Bitcoin
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            Need a custom package?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact us
            </Link>{" "}
            or{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
              WhatsApp us
            </a>{" "}
            for a tailored quote.
          </motion.p>
        </div>
      </section>

      <AnimatePresence>
        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            currency={currency}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
