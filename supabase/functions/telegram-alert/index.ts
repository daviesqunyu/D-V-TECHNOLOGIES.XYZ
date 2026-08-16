import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-bot-secret",
};

type AlertBody = {
  event: string;
  source?: string;
  subject?: string;
  message?: string;
  details?: Record<string, unknown>;
};

function escapeHtml(s: unknown): string {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildMessage(body: AlertBody): string {
  const lines = [
    `🔔 <b>${escapeHtml(body.event)}</b>`,
    "",
  ];
  if (body.subject) lines.push(`<b>Subject:</b> ${escapeHtml(body.subject)}`);
  if (body.message) lines.push(escapeHtml(body.message));
  if (body.details && Object.keys(body.details).length > 0) {
    lines.push("");
    for (const [k, v] of Object.entries(body.details)) {
      lines.push(`• <b>${escapeHtml(k)}:</b> ${escapeHtml(v)}`);
    }
  }
  lines.push("", `— <i>${escapeHtml(body.source ?? "D&V Technologies")}</i> · ${new Date().toLocaleString("en-KE")}`);
  return lines.join("\n");
}

async function sendTelegram(token: string, chatId: number, text: string) {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
  });
  if (!res.ok) {
    const err = await res.text().catch(() => "");
    console.error("Telegram sendMessage failed:", res.status, err.slice(0, 200));
  }
  return res.ok;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const secret = req.headers.get("x-bot-secret");
  const expected = Deno.env.get("BOT_SECRET");
  if (!expected || secret !== expected) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!token) throw new Error("TELEGRAM_BOT_TOKEN not set");

    const body = (await req.json()) as AlertBody;
    if (!body?.event) {
      return new Response(JSON.stringify({ error: "Missing event" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(url!, key!);

    // Record the alert
    await supabase.from("site_alerts").insert({
      event: body.event,
      payload: { subject: body.subject, message: body.message, details: body.details },
      source: body.source ?? null,
    });

    // Send to all approved + subscribed chats
    const { data: chats } = await supabase
      .from("telegram_chats")
      .select("chat_id")
      .eq("approved", true)
      .eq("subscribed", true);

    const targets = (chats ?? []).map((c) => Number(c.chat_id));
    const adminChat = Number(Deno.env.get("TELEGRAM_ADMIN_CHAT_ID") || 0);
    if (targets.length === 0 && adminChat > 0) targets.push(adminChat);

    const text = buildMessage(body);
    const results = await Promise.all(targets.map((chatId) => sendTelegram(token, chatId, text)));
    const sent = results.filter(Boolean).length;

    return new Response(JSON.stringify({ ok: true, sent }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("telegram-alert error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
