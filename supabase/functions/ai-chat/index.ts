import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are DIVA, the AI assistant for the D&V Technologies website (dvtechnologies.xyz).

Scope: ONLY help with D&V Technologies and this website/project.
- Explain D&V services, packages, pricing, payment methods, and how to contact.
- Help users navigate site pages and use features (shop, cart/checkout, contact form, newsletter, AI assistant, admin dashboard, trade/partner programme).
- Answer in English or Swahili — mirror the user's language where sensible.

If the user asks for unrelated general topics (e.g. coding help not about this site, school homework, random facts),
politely redirect and ask what they want to know about D&V services or this website.

Company info:
- Name: D&V Technologies
- Website: https://dvtechnologies.xyz
- Email: info@dvtechnologies.xyz
- WhatsApp: +254 759 075 816 (https://wa.me/254759075816)
- Location: Lower Kabete, Nairobi, Kenya
- Vision: "Silicon Savannah 2030" — helping Nairobi & East African businesses grow with technology.

Services: IT support & maintenance, hardware repair, networking & internet, business solutions & ERP,
cloud services, cybersecurity, web & app development, CCTV & surveillance, data analytics & BI,
data science, IoT solutions, AI & machine learning.

Support plans (payable via M-Pesa, card, or Bitcoin):
- Budget Starter: $0.77 (one-time kickoff)
- Essential: $300/mo
- Advanced: $650/mo
- Enterprise & AI: $900/mo
- Weekly IT Support Plan: KES 100/week (promo, M-Pesa auto-billing, cancel anytime)

Storefront: products are sold at /shop with transparent KES or USD pricing; checkout at /pay supports
M-Pesa STK push, Paystack cards and Bitcoin (BTC address 1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i).
A 100 KSh/week promotional plan exists for individuals and startups testing the service.

Keep answers concise and friendly. Use line breaks for lists. If unsure, suggest contacting the team.`;

async function callOpenAI(messages: { role: string; content: string }[]): Promise<string | null> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return null;

  const model = Deno.env.get("OPENAI_MODEL") || "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 800,
      temperature: 0.6,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("OpenAI error:", res.status, errText.slice(0, 300));
    return null;
  }

  const json = await res.json();
  return json?.choices?.[0]?.message?.content?.trim() ?? null;
}

async function callCloudflare(messages: { role: string; content: string }[]): Promise<string | null> {
  const accountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
  const apiToken = Deno.env.get("CLOUDFLARE_API_TOKEN");
  if (!accountId || !apiToken) return null;

  const model = Deno.env.get("CLOUDFLARE_AI_MODEL") || "@cf/meta/llama-3.1-8b-instruct";
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${encodeURIComponent(
      model
    )}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages] }),
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("Cloudflare AI error:", res.status, errText.slice(0, 300));
    return null;
  }

  const json = await res.json();
  const result = json?.result as { response?: string; output_text?: string } | undefined;
  return result?.response || result?.output_text || null;
}

const FALLBACK_CONTENT =
  "Our AI service is temporarily unavailable. Please try again in a few moments, or reach us on WhatsApp (+254 759 075 816) or via the contact page for immediate help.";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  function json(status: number, payload: unknown) {
    return new Response(JSON.stringify(payload), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    let content: string | null = null;

    // OpenAI first (the "OPEN CODE" / OpenAI key), Cloudflare as fallback.
    if (openaiKey) {
      content = await callOpenAI(messages);
      if (content) console.log("ai-chat: answered via OpenAI");
    }

    if (!content) {
      content = await callCloudflare(messages);
      if (content) console.log("ai-chat: answered via Cloudflare");
    }

    // Never fail the request — always return something friendly.
    return json(200, { content: content ?? FALLBACK_CONTENT, source: openaiKey ? "openai" : "cloudflare" });
  } catch (error) {
    console.error("ai-chat error:", error);
    return json(500, {
      error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
    });
  }
});
