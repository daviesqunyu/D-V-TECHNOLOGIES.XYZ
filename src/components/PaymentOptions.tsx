import { useState } from "react";
import { Bitcoin, Copy, Check, Loader2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { api, authHeaders } from "@/lib/api";

const BTC_ADDRESS = "1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i";

const USD_TO_KES_RATE = Number(import.meta.env.VITE_USD_TO_KES_RATE ?? 129);

type PlanKey = "basic" | "premium" | "exclusive";

const PLANS: Record<PlanKey, { label: string; usd: number }> = {
  basic: { label: "Basic", usd: 300 },
  premium: { label: "Premium", usd: 650 },
  exclusive: { label: "Exclusive", usd: 900 },
} as const;

function usdToKes(usd: number) {
  const safeRate = Number.isFinite(USD_TO_KES_RATE) && USD_TO_KES_RATE > 0 ? USD_TO_KES_RATE : 129;
  return Math.round(usd * safeRate);
}

function formatKes(amount: number) {
  try {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `KES ${amount}`;
  }
}

function formatUsd(amount: number) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

export function PaymentOptions({ variant = "footer" }: { variant?: "footer" | "card" }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [planKey, setPlanKey] = useState<PlanKey>("basic");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loadingPaystack, setLoadingPaystack] = useState(false);

  const copyBtc = () => {
    navigator.clipboard.writeText(BTC_ADDRESS);
    setCopied(true);
    toast({
      title: "Bitcoin address copied",
      description: BTC_ADDRESS,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const isCard = variant === "card";
  const selected = PLANS[planKey];
  const amountKes = usdToKes(selected.usd);
  const startPaystack = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      toast({ title: "Enter your email address", variant: "destructive" });
      return;
    }

    setLoadingPaystack(true);
    try {
      const res = await fetch(api.initiatePayment, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          method: "paystack",
          plan: selected.label,
          amount: amountKes,
          email: trimmedEmail,
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
      setLoadingPaystack(false);
    }
  };

  /* ── Footer variant: compact icon-only badges ── */
  if (!isCard) {
    return (
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2.5">
          Payments
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={copyBtc}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground hover:border-orange-500/40 hover:text-orange-500 transition-colors"
            title="Copy Bitcoin address"
          >
            <Bitcoin className="w-3.5 h-3.5" />
            Bitcoin
            {copied && <Check className="w-3 h-3 text-emerald-500" />}
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground">
            <CreditCard className="w-3.5 h-3.5" />
            Card
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            M-Pesa
          </span>
        </div>
      </div>
    );
  }

  /* ── Card variant: full payment form (used on pricing / standalone) ── */
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="default"
          className="border-accent/50 hover:bg-accent/10 hover:border-accent gap-2"
          onClick={copyBtc}
        >
          <Bitcoin className="w-4 h-4 text-accent" />
          Bitcoin
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size="default"
          className="border-primary/50 hover:bg-primary/10 hover:border-primary gap-2"
          onClick={startPaystack}
          disabled={loadingPaystack}
        >
          {loadingPaystack ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
          Card (Paystack)
        </Button>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-3">
        <p className="text-xs font-medium text-foreground">Card payment via Paystack</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <label className="text-xs text-muted-foreground">
            Plan
            <select
              value={planKey}
              onChange={(e) => setPlanKey(e.target.value as PlanKey)}
              className="mt-1 w-full h-10 rounded-md border border-border bg-background px-3 text-sm"
              disabled={loadingPaystack}
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="exclusive">Exclusive</option>
            </select>
          </label>
          <div />
        </div>
        <label className="text-xs text-muted-foreground block">
          Full name
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 h-10 bg-muted/30"
            autoComplete="name"
            disabled={loadingPaystack}
          />
        </label>
        <label className="text-xs text-muted-foreground block">
          Email
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 h-10 bg-muted/30"
            type="email"
            autoComplete="email"
            disabled={loadingPaystack}
          />
        </label>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-muted-foreground">
            Amount: <span className="font-medium text-foreground">{formatKes(amountKes)}</span>{" "}
            <span className="text-muted-foreground/70">({formatUsd(selected.usd)})</span>
          </p>
          <Button variant="hero" size="default" onClick={startPaystack} disabled={loadingPaystack} className="gap-2">
            {loadingPaystack ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            Pay with card
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Redirected to Paystack — we never store your card details.
        </p>
      </div>
    </div>
  );
}
