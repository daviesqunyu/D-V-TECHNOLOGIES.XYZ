import { useEffect, useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { api, authHeaders } from "@/lib/api";
import { SEOHead } from "@/components/SEOHead";

type VerifyResult =
  | { success: true; status: string; reference: string }
  | { error: string; reference?: string };

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function PaymentReturn() {
  const query = useQuery();
  const reference = query.get("reference") || query.get("trxref") || "";

  const [state, setState] = useState<"loading" | "success" | "failed">("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!reference) {
        setState("failed");
        setMessage("Missing payment reference.");
        return;
      }

      try {
        const url = `${api.verifyPayment}?reference=${encodeURIComponent(reference)}`;
        const res = await fetch(url, { headers: authHeaders() });
        const json = (await res.json().catch(() => null)) as VerifyResult | null;

        if (cancelled) return;

        if (res.ok && json && "success" in json && json.success) {
          setState("success");
          setMessage("Payment verified successfully.");
        } else {
          setState("failed");
          setMessage((json && "error" in json && json.error) || "Payment verification failed.");
        }
      } catch (e) {
        if (cancelled) return;
        setState("failed");
        setMessage(e instanceof Error ? e.message : "Payment verification failed.");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Payment Status | D&V Technologies"
        description="Payment confirmation page."
        canonicalPath="/payment-return"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto glass-card rounded-2xl p-8 border border-border text-center"
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary mb-4" />
                  <h1 className="font-display text-2xl font-bold mb-2">Verifying payment</h1>
                  <p className="text-muted-foreground">{message || "Please wait..."}</p>
                </>
              ) : state === "success" ? (
                <>
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-4" />
                  <h1 className="font-display text-2xl font-bold mb-2">Payment successful</h1>
                  <p className="text-muted-foreground mb-6">{message}</p>
                </>
              ) : (
                <>
                  <XCircle className="w-10 h-10 mx-auto text-red-500 mb-4" />
                  <h1 className="font-display text-2xl font-bold mb-2">Payment not confirmed</h1>
                  <p className="text-muted-foreground mb-6">{message}</p>
                </>
              )}

              <div className="flex items-center justify-center gap-3">
                <Link to="/#pricing">
                  <Button variant="hero" className="gap-2">
                    Back to Packages <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline">Contact Support</Button>
                </Link>
              </div>

              {reference ? (
                <p className="text-xs text-muted-foreground mt-6">
                  Reference: <code className="bg-muted px-1 rounded">{reference}</code>
                </p>
              ) : null}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

