// Supabase Edge Function (Deno). Remote imports + Deno globals are resolved at runtime.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BTC_ADDRESS = "1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i";
const MPESA_PHONE = "254759075816";
const BUSINESS_EMAIL = "info@dvtechnologies.xyz";
const MPESA_ENV = Deno.env.get("MPESA_ENVIRONMENT") || "sandbox";
const MPESA_BASE_URL =
  MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

interface PaymentRequest {
  method: "mpesa" | "btc" | "card" | "paystack";
  plan: string;
  amount: number;
  phone?: string;
  email?: string;
  name?: string;
}

function validateAmount(amount: number, method: PaymentRequest["method"]): boolean {
  if (!Number.isFinite(amount) || amount <= 0) return false;
  // M-Pesa amounts are sent in KES (frontend converts USD->KES).
  // Keep a sane upper bound to block obviously bad requests.
  if (method === "mpesa" || method === "card" || method === "paystack") return amount <= 500000;
  // BTC flow is quoted in USD.
  return amount <= 100000;
}

function normalizeAndValidatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s+/g, "").replace(/^\+/, "").replace(/^0/, "254");
  const normalized = cleaned.startsWith("254") ? cleaned : `254${cleaned}`;
  return /^254\d{9}$/.test(normalized) ? normalized : null;
}

async function initiateMpesaSTKPush(phone: string, amount: number, plan: string) {
  const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY");
  const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET");
  const shortCode = Deno.env.get("MPESA_SHORTCODE") || "174379";
  const passkey = Deno.env.get("MPESA_PASSKEY") || "";

  if (!consumerKey || !consumerSecret) {
    return { success: false, error: "M-Pesa not configured. Contact us on WhatsApp to pay." };
  }

  const authUrl = `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
  const authRes = await fetch(authUrl, {
    headers: {
      Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
    },
  });

  if (!authRes.ok) {
    console.error("M-Pesa auth failed:", await authRes.text());
    return { success: false, error: "M-Pesa authentication failed." };
  }

  const { access_token } = await authRes.json();
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
  const password = btoa(`${shortCode}${passkey}${timestamp}`);

  const callbackUrl =
    Deno.env.get("MPESA_CALLBACK_URL") ||
    `${Deno.env.get("SUPABASE_URL")}/functions/v1/mpesa-callback`;
  const stkRes = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: callbackUrl,
      AccountReference: `DV-${plan}`,
      TransactionDesc: `D&V Technologies - ${plan} Plan`,
    }),
  });

  const stkData = await stkRes.json();

  if (stkData.ResponseCode === "0") {
    return {
      success: true,
      message: "M-Pesa payment prompt sent to your phone. Enter your PIN to complete payment.",
      checkoutRequestID: stkData.CheckoutRequestID,
    };
  }

  console.error("STK push failed:", stkData);
  return {
    success: false,
    error: stkData.errorMessage || stkData.CustomerMessage || "STK push failed. Try again or use WhatsApp.",
  };
}

function generateBTCPayment(plan: string, amount: number) {
  return {
    success: true,
    method: "btc",
    address: BTC_ADDRESS,
    amount_usd: amount,
    plan,
    message: `Send the equivalent of $${amount} USD in Bitcoin to the address below. After sending, WhatsApp us a screenshot for confirmation.`,
    whatsapp_url: `https://wa.me/${MPESA_PHONE}?text=${encodeURIComponent(
      `Hi D&V Technologies, I've sent BTC payment for the ${plan} plan ($${amount}/month). Transaction ID: [paste here]`
    )}`,
  };
}

function buildPaystackCallbackUrl(): string {
  const explicit = Deno.env.get("PAYSTACK_CALLBACK_URL");
  if (explicit && explicit.trim()) return explicit.trim();

  const site = Deno.env.get("SITE_URL");
  if (site && site.trim()) return site.trim().replace(/\/+$/, "") + "/payment-return";

  return "http://localhost:8081/payment-return";
}

async function initializePaystackCardPayment(args: {
  email: string;
  amountKes: number;
  plan: string;
  name?: string | null;
}) {
  const secret = Deno.env.get("PAYSTACK_SECRET_KEY");
  if (!secret) {
    return {
      success: false,
      error: "Card payments not configured. Set PAYSTACK_SECRET_KEY in Supabase Edge Function secrets.",
    };
  }

  const amountMinor = Math.round(args.amountKes * 100);
  const callback_url = buildPaystackCallbackUrl();

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Paystack sends the receipt to this email.
      email: args.email,
      amount: amountMinor,
      currency: "KES",
      callback_url,
      metadata: {
        plan: args.plan,
        method: "paystack",
        business_email: BUSINESS_EMAIL,
        name: args.name ?? undefined,
      },
    }),
  });

  const raw = await res.text().catch(() => "");
  let json: Record<string, unknown> | null = null;
  try {
    json = raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
  } catch {
    json = null;
  }

  if (!res.ok || !json?.status) {
    const msg =
      (typeof json?.message === "string" && json.message) ||
      (typeof json?.error === "string" && json.error) ||
      raw ||
      "Card payment initialization failed.";
    return { success: false, error: msg };
  }

  const authorization_url = json?.data?.authorization_url;
  const reference = json?.data?.reference;
  if (!authorization_url || !reference) {
    return { success: false, error: "Paystack returned an invalid response." };
  }

  return {
    success: true,
    method: "paystack",
    authorization_url,
    reference,
    checkoutRequestID: reference,
    message: "Redirecting to secure card checkout.",
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: PaymentRequest = await req.json();

    if (!body.method || !body.plan || body.amount === undefined || body.amount === null) {
      return new Response(
        JSON.stringify({ error: "method, plan, and amount are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!validateAmount(body.amount, body.method)) {
      return new Response(
        JSON.stringify({ error: "Invalid amount. Must be a positive value." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let result;
    let normalizedMpesaPhone: string | null = null;

    if (body.method === "mpesa") {
      if (!body.phone) {
        return new Response(
          JSON.stringify({ error: "Phone number is required for M-Pesa." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      normalizedMpesaPhone = normalizeAndValidatePhone(body.phone);
      if (!normalizedMpesaPhone) {
        return new Response(
          JSON.stringify({ error: "Invalid phone number. Use format 2547XXXXXXXX." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      result = await initiateMpesaSTKPush(normalizedMpesaPhone, body.amount, body.plan);
    } else if (body.method === "btc") {
      result = generateBTCPayment(body.plan, body.amount);
    } else if (body.method === "card" || body.method === "paystack") {
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      if (!email) {
        return new Response(
          JSON.stringify({ error: "Email is required for card payments." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      result = await initializePaystackCardPayment({
        email,
        amountKes: body.amount,
        plan: body.plan,
        name: typeof body.name === "string" ? body.name.trim() : null,
      });
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid payment method. Use 'mpesa', 'btc', or 'paystack'." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey);
      const { error } = await supabase.from("payment_records").insert({
        method: body.method,
        plan: body.plan,
        amount: body.amount,
        phone: body.method === "mpesa" ? normalizedMpesaPhone : null,
        email: body.email ?? null,
        name: body.name ?? null,
        status: result.success ? "pending" : "failed",
        checkout_request_id: result.checkoutRequestID ?? null,
        error_message: result.success ? null : result.error ?? null,
      });
      if (error) console.error("payment_records insert error:", error);
    }

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Payment error:", e);
    return new Response(
      JSON.stringify({ error: "Payment processing failed. Please contact us on WhatsApp." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
