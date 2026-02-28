// Supabase Edge Function (Deno). Remote imports + Deno globals are resolved at runtime.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const BUSINESS_EMAIL = "info@dvtechnologies.xyz";
const BUSINESS_NAME = "D&V Technologies";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getReferenceFromUrl(url: string) {
  try {
    const u = new URL(url);
    return (
      u.searchParams.get("reference") ||
      u.searchParams.get("trxref") ||
      u.searchParams.get("paystack_ref")
    );
  } catch {
    return null;
  }
}

async function verifyWithPaystack(reference: string) {
  const secret = Deno.env.get("PAYSTACK_SECRET_KEY");
  if (!secret) {
    return { ok: false, status: "error", message: "PAYSTACK_SECRET_KEY is not configured." };
  }

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
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
      raw ||
      `Paystack verify failed (${res.status}).`;
    return { ok: false, status: "error", message: msg };
  }

  const data = json.data as Record<string, unknown> | undefined;
  const paystackStatus = data?.status; // "success" | "failed" | ...
  const gatewayResponse = data?.gateway_response;
  const authorization = (data?.authorization ?? {}) as Record<string, unknown>;

  return {
    ok: true,
    status: paystackStatus,
    gateway_response: gatewayResponse,
    amount: data?.amount,
    currency: data?.currency,
    customer: data?.customer,
    metadata: data?.metadata,
    authorization: {
      last4: typeof authorization?.last4 === "string" ? authorization.last4 : null,
      card_type: typeof authorization?.card_type === "string" ? authorization.card_type : null,
      exp_month: authorization?.exp_month != null ? String(authorization.exp_month) : null,
      exp_year: authorization?.exp_year != null ? String(authorization.exp_year) : null,
    },
  };
}

async function sendResendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${BUSINESS_NAME} <onboarding@resend.dev>`,
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) console.error("resend email error:", await res.text().catch(() => ""));
    return res.ok;
  } catch (e) {
    console.error("resend email exception:", e);
    return false;
  }
}

function formatMoney(amountMajor: number, currency: string) {
  try {
    return new Intl.NumberFormat(currency === "KES" ? "en-KE" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amountMajor);
  } catch {
    return `${currency} ${amountMajor}`;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  if (req.method !== "GET" && req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const referenceFromUrl = getReferenceFromUrl(req.url);
  let reference = referenceFromUrl;

  if (!reference && req.method === "POST") {
    const body = (await req.json().catch(() => null)) as { reference?: string; trxref?: string } | null;
    reference = body?.reference ?? body?.trxref ?? null;
  }

  if (!reference || typeof reference !== "string" || !reference.trim()) {
    return jsonResponse(400, { error: "Missing payment reference." });
  }
  reference = reference.trim();

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return jsonResponse(500, { error: "Server configuration error." });
  }

  const verify = await verifyWithPaystack(reference);
  if (!verify.ok) {
    // Keep DB record if it exists; just mark it failed with reason.
    try {
      const supabase = createClient(supabaseUrl, serviceKey);
      await supabase
        .from("payment_records")
        .update({ status: "failed", error_message: verify.message })
        .eq("checkout_request_id", reference);
    } catch {
      /* ignore */
    }
    return jsonResponse(502, { error: verify.message, reference });
  }

  const isSuccess = verify.status === "success";
  const nextStatus = isSuccess ? "completed" : "failed";
  const errorMessage = isSuccess ? null : verify.gateway_response || `Paystack status: ${verify.status}`;

  const auth = verify.authorization ?? {};
  const updatePayload: Record<string, unknown> = {
    status: nextStatus,
    error_message: errorMessage,
  };
  if (auth.last4) updatePayload.card_last4 = auth.last4;
  if (auth.card_type) updatePayload.card_brand = auth.card_type;
  if (auth.exp_month) updatePayload.card_expiry_month = auth.exp_month;
  if (auth.exp_year) updatePayload.card_expiry_year = auth.exp_year;

  const supabase = createClient(supabaseUrl, serviceKey);
  await supabase
    .from("payment_records")
    .update(updatePayload)
    .eq("checkout_request_id", reference);

  // Send a copy/notification to the business inbox when payment succeeds.
  // This is not the Paystack receipt itself, but contains the same key details.
  const warnings: string[] = [];
  if (isSuccess) {
    const amountMinor = typeof verify.amount === "number" ? verify.amount : 0;
    const currency = typeof verify.currency === "string" ? verify.currency : "KES";
    const amountMajor = currency === "KES" ? Math.round(amountMinor / 100) : Math.round(amountMinor / 100);
    const customerEmail =
      typeof verify.customer?.email === "string" ? verify.customer.email : "(unknown)";
    const plan =
      typeof verify.metadata?.plan === "string" ? verify.metadata.plan : "(unknown plan)";

    const subject = `[Payment Received] ${plan} — ${formatMoney(amountMajor, currency)}`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Payment received (Paystack)</h2>
        <p><strong>Status:</strong> completed</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Amount:</strong> ${formatMoney(amountMajor, currency)}</p>
        <p><strong>Customer email:</strong> ${customerEmail}</p>
        <p><strong>Reference:</strong> ${reference}</p>
        <p style="color:#666;font-size:12px;">Sent automatically from dvtechnologies.xyz</p>
      </div>
    `;

    const ok = await sendResendEmail(BUSINESS_EMAIL, subject, html);
    if (!ok) warnings.push("Business email notification not sent (RESEND_API_KEY missing or email failed).");
  }

  return jsonResponse(200, { success: true, status: nextStatus, reference, warnings });
});

