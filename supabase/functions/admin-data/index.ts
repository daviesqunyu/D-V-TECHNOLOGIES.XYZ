import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-secret",
};

function jsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function settledData<T>(
  result: PromiseSettledResult<{ data: T | null; error: unknown }>,
  label: string,
  warnings: string[]
): T {
  if (result.status === "rejected") {
    warnings.push(`${label} request failed`);
    return [] as T;
  }
  if (result.value.error) {
    warnings.push(`${label} query failed`);
    return [] as T;
  }
  return (result.value.data ?? ([] as T)) as T;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const adminSecret = req.headers.get("x-admin-secret") ?? req.headers.get("authorization")?.replace("Bearer ", "");
  const expectedSecret = Deno.env.get("ADMIN_SECRET");
  if (!expectedSecret || !adminSecret || !secureCompare(adminSecret, expectedSecret)) {
    return jsonResponse(401, { error: "Unauthorized" });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    return jsonResponse(500, { error: "Server configuration error." });
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    const warnings: string[] = [];
    const [contactRes, paymentRes, newsletterRes] = await Promise.allSettled([
      supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("payment_records").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(100),
    ]);

    const contactSubmissions = settledData(contactRes, "contact submissions", warnings);
    const paymentRecords = settledData(paymentRes, "payment records", warnings);
    const newsletterSubscribers = settledData(newsletterRes, "newsletter subscribers", warnings);

    return jsonResponse(200, {
      success: true,
      warnings,
      contactSubmissions,
      paymentRecords,
      newsletterSubscribers,
    });
  } catch (error) {
    console.error("admin-data error:", error);
    return jsonResponse(500, { error: "Failed to fetch admin data." });
  }
});
