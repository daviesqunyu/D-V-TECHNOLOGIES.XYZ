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

  try {
    const body = await req.json();
    const messages = body.messages || [];
    const accountId = Deno.env.get("CLOUDFLARE_ACCOUNT_ID");
    const apiToken = Deno.env.get("CLOUDFLARE_API_TOKEN");
    const model =
      Deno.env.get("CLOUDFLARE_AI_MODEL") || "@cf/meta/llama-3.1-8b-instruct";

    if (!accountId || !apiToken) {
      console.error("Cloudflare Workers AI env vars missing");
      return jsonError(
        500,
        "AI service not configured. Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in Supabase Edge Function secrets."
      );
    }

    console.log(
      `Chat request (Cloudflare): ${messages?.length || 0} messages, model: ${model}`
    );

    const cfResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${encodeURIComponent(
        model
      )}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
        }),
      }
    );

    const json = await cfResponse.json().catch(() => null as unknown);

    if (!cfResponse.ok || !json) {
      console.error("Cloudflare AI error:", cfResponse.status, json);
      const msg =
        (json as { errors?: { message?: string }[] })?.errors?.[0]?.message ||
        "AI service error. Please try again.";
      return jsonError(
        cfResponse.status === 429 ? 429 : 500,
        msg
      );
    }

    const result = (json as { result?: { response?: string; output_text?: string } })
      .result;
    const content = result?.response || result?.output_text;

    if (!content) {
      console.error("Cloudflare AI returned no content", json);
      return jsonError(500, "AI service did not return any content.");
    }

    return new Response(
      JSON.stringify({ content }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
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
