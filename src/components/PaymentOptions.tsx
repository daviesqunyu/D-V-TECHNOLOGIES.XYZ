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

  return (
    <div className={isCard ? "space-y-3" : "space-y-2"}>
      <p className={`font-medium ${isCard ? "text-sm mb-3" : "text-xs"} text-muted-foreground`}>
        Pay with
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size={isCard ? "default" : "sm"}
          className="border-accent/50 hover:bg-accent/10 hover:border-accent gap-2"
          onClick={copyBtc}
        >
          <Bitcoin className="w-4 h-4 text-accent" />
          <span className="hidden sm:inline">Pay with Bitcoin</span>
          <span className="sm:hidden">BTC</span>
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
        </Button>
        <Button
          variant="outline"
          size={isCard ? "default" : "sm"}
          className="border-primary/50 hover:bg-primary/10 hover:border-primary gap-2"
          onClick={startPaystack}
          disabled={loadingPaystack}
        >
          {loadingPaystack ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
          <span>Pay with Paystack</span>
        </Button>
      </div>

      {/* Card payment section: name + email here; card number, CVV and expiry on Paystack (PCI) */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-3">
        <div>
          <p className="text-xs font-medium text-foreground">Card payment (Paystack)</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Add your name and email below. You will be redirected to Paystack to enter card number, CVV and expiry securely — we never see or store them.
          </p>
        </div>
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
          Full name (for receipt & admin)
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
          Email (receipt & Paystack)
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
          <Button variant={isCard ? "hero" : "outline"} size={isCard ? "default" : "sm"} onClick={startPaystack} disabled={loadingPaystack} className="gap-2">
            {loadingPaystack ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            Pay with card (Paystack)
          </Button>
        </div>

        <p className="text-[11px] text-muted-foreground">
          You will be redirected to Paystack to complete payment (card, M-Pesa, or other methods). After payment, the record is saved for your receipt and our records.
        </p>
      </div>
    </div>
  );
}
