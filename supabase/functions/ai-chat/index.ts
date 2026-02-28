import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are D&V AI, the assistant for the D&V Technologies website (dvtechnologies.xyz).

Scope: ONLY help with D&V Technologies and this website/project.
- Explain D&V services, packages, pricing, and how to contact.
- Help users navigate site pages and use features (contact form, newsletter signup, AI assistant, admin dashboard).

If the user asks for unrelated general topics (e.g. coding help not about this site, school homework, random facts),
politely redirect and ask what they want to know about D&V services or this website.

Company info:
- Name: D&V Technologies
- Website: https://dvtechnologies.xyz
- Email: info@dvtechnologies.xyz
- WhatsApp: +254 759 075 816
- Location: Lower Kabete, Nairobi, Kenya

Packages:
- Basic ($300/mo), Premium ($650/mo), Exclusive ($900/mo)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  function jsonError(status: number, message: string, extraHeaders?: HeadersInit) {
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json", ...(extraHeaders ?? {}) },
    });
  }

  function extractOpenAiErrorMessage(raw: string): string | null {
    try {
      const parsed = JSON.parse(raw) as { error?: { message?: string; type?: string; code?: string } };
      const msg = parsed?.error?.message;
      return typeof msg === "string" && msg.trim() ? msg.trim() : null;
    } catch {
      return null;
    }
  }

  try {
    const body = await req.json();
    const messages = body.messages || [];
    // Use a cheaper default to reduce 429s on fresh accounts.
    const model = body.model || "gpt-4o-mini";

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return jsonError(
        500,
        "AI service not configured. Set OPENAI_API_KEY in Supabase Edge Function secrets."
      );
    }

    console.log(
      `Chat request: ${messages?.length || 0} messages, model: ${model}`
    );

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
          temperature: 0.7,
          // Keep responses smaller to reduce spend / rate-limit pressure.
          max_tokens: 900,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      const openAiMsg = extractOpenAiErrorMessage(errorText);
      const retryAfter = response.headers.get("retry-after");

      if (response.status === 429) {
        // OpenAI uses 429 for both "rate limit" and "insufficient_quota".
        const msg =
          openAiMsg ||
          "OpenAI returned 429. This can mean rate-limit OR no credit/quota. Check your OpenAI usage/billing.";
        return jsonError(429, msg, retryAfter ? { "Retry-After": retryAfter } : undefined);
      }

      if (response.status === 401) {
        return jsonError(500, openAiMsg || "AI service not configured.");
      }

      return jsonError(500, openAiMsg || "AI service error. Please try again.");
    }

    console.log("Streaming response from OpenAI");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
