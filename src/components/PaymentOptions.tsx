import { useState } from "react";
import { Bitcoin, Copy, Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BTC_ADDRESS = "1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i";
// M-Pesa: display number; for STK Push / Paybill use Safaricom Daraja API (env: VITE_MPESA_CONSUMER_KEY, etc.)
const MPESA_NUMBER = "0759 075 816";
const MPESA_NUMBER_RAW = "254759075816";

function MpesaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#00A651"/>
      <path d="M7 8h10v1.5H7V8zm0 2.5h10v1H7v-1zm0 2.5h7v1H7v-1z" fill="#fff"/>
      <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" fontFamily="Arial">M</text>
    </svg>
  );
}

export function PaymentOptions({ variant = "footer" }: { variant?: "footer" | "card" }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

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
          className="border-emerald-500/50 hover:bg-emerald-500/10 hover:border-emerald-500 gap-2"
          asChild
        >
          <a href={`tel:${MPESA_NUMBER_RAW}`} title={`M-Pesa: ${MPESA_NUMBER}`}>
            <MpesaIcon className="w-5 h-5" />
            <span>Pay via M-Pesa</span>
            <Smartphone className="w-4 h-4 text-muted-foreground" />
          </a>
        </Button>
      </div>
      {isCard && (
        <p className="text-xs text-muted-foreground">
          BTC: <code className="bg-muted px-1 rounded">{BTC_ADDRESS}</code>
          <br />
          M-Pesa: <strong>{MPESA_NUMBER}</strong>
        </p>
      )}
    </div>
  );
}
