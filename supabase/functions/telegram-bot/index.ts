import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-bot-secret",
};

type TgUpdate = {
  update_id?: number;
  message?: { chat: { id: number; username?: string; first_name?: string }; text?: string; from?: { id: number } };
  callback_query?: { message?: { chat: { id: number } }; data?: string; from: { id: number } };
};

function botUrl(token: string, method: string) {
  return `https://api.telegram.org/bot${token}/${method}`;
}

async function sendMessage(token: string, chatId: number, text: string) {
  await fetch(botUrl(token, "sendMessage"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function getClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Supabase env not set");
  return createClient(url, key);
}

async function registerChat(supabase: ReturnType<typeof createClient>, chatId: number, username?: string, firstName?: string) {
  const adminChat = Number(Deno.env.get("TELEGRAM_ADMIN_CHAT_ID") || 0);
  const approved = adminChat > 0 && chatId === adminChat;

  const { data } = await supabase
    .from("telegram_chats")
    .select("id, approved, subscribed")
    .eq("chat_id", chatId)
    .maybeSingle();

  if (data) {
    await supabase
      .from("telegram_chats")
      .update({ username: username ?? null, first_name: firstName ?? null, last_seen_at: new Date().toISOString(), approved: data.approved || approved })
      .eq("chat_id", chatId);
    return { approved: data.approved || approved, subscribed: data.subscribed };
  }

  await supabase.from("telegram_chats").insert({
    chat_id: chatId,
    username: username ?? null,
    first_name: firstName ?? null,
    approved,
  });
  return { approved, subscribed: true };
}

async function commandStatus(supabase: ReturnType<typeof createClient>, chatId: number) {
  const [{ count: contacts }, { count: payments }, { count: subscribers }] = await Promise.all([
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
    supabase.from("payment_records").select("id", { count: "exact", head: true }),
    supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
  ]);
  return [
    "<b>📊 D&V Status</b>",
    "",
    `• Contact messages: <b>${contacts ?? 0}</b>`,
    `• Payments recorded: <b>${payments ?? 0}</b>`,
    `• Newsletter subscribers: <b>${subscribers ?? 0}</b>`,
    `• Uptime: <b>Operational</b> 🟢`,
    "",
    "Service: <i>D&V Technologies — Lower Kabete, Nairobi</i>",
  ].join("\n");
}

async function commandStats(supabase: ReturnType<typeof createClient>, chatId: number) {
  const { data, error } = await supabase
    .from("payment_records")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);
  if (error) return "⚠️ Could not fetch payment stats.";
  const rows = (data ?? [])
    .map((p) => `• ${escapeHtml(String(p.amount))} ${escapeHtml(String(p.currency ?? "KES"))} — ${escapeHtml(String(p.method ?? "unknown"))} — ${String(p.status ?? "?")}`)
    .join("\n");
  return ["<b>💰 Recent payments</b>", "", rows || "No payments yet."].join("\n");
}

async function commandOrders(supabase: ReturnType<typeof createClient>, chatId: number) {
  const { data, error } = await supabase
    .from("payment_records")
    .select("id, amount, currency, method, status, created_at")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) return "⚠️ Could not fetch orders.";
  const rows = (data ?? [])
    .map((p) => `• #${p.id} ${escapeHtml(String(p.amount))} ${escapeHtml(String(p.currency ?? "KES"))} · ${escapeHtml(String(p.method ?? "?"))} · <b>${escapeHtml(String(p.status))}</b>`)
    .join("\n");
  return ["<b>🧾 Recent orders</b>", "", rows || "No orders yet."].join("\n");
}

async function commandAlerts(supabase: ReturnType<typeof createClient>, chatId: number) {
  const { data, error } = await supabase.from("site_alerts").select("event, payload, created_at").order("created_at", { ascending: false }).limit(8);
  if (error) return "⚠️ Could not fetch alerts.";
  const rows = (data ?? [])
    .map((a) => `• <b>${escapeHtml(String(a.event))}</b> — ${new Date(a.created_at).toLocaleString("en-KE")}`)
    .join("\n");
  return ["<b>🔔 Recent alerts</b>", "", rows || "No alerts yet."].join("\n");
}

async function commandServices() {
  const services = [
    "IT Support & Maintenance",
    "Hardware Repair",
    "Networking & Internet",
    "Business Solutions & ERP",
    "Cloud Services",
    "Cybersecurity",
    "Web & App Development",
    "CCTV & Surveillance",
    "Data Analytics & BI",
    "Data Science",
    "IoT Solutions",
    "AI & Machine Learning",
  ];
  return [
    "<b>🛠 D&V Services</b>",
    "",
    ...services.map((s) => `• ${s}`),
    "",
    "Full catalog & pricing: <a href=\"https://dvtechnologies.xyz/shop\">dvtechnologies.xyz/shop</a>",
  ].join("\n");
}

async function handleCommand(
  supabase: ReturnType<typeof createClient>,
  token: string,
  chatId: number,
  command: string
) {
  let text: string;
  switch (command) {
    case "/start":
    case "/help":
      text = [
        "<b>👋 DVTECH Bot</b> — control & monitoring for D&V Technologies",
        "",
        "Available commands:",
        "• /status — live platform status",
        "• /stats — recent payments",
        "• /orders — latest orders",
        "• /alerts — recent site alerts",
        "• /services — what we offer",
        "",
        "Site: <a href=\"https://dvtechnologies.xyz\">dvtechnologies.xyz</a>",
        "Contact: +254 759 075 816",
      ].join("\n");
      break;
    case "/status":
      text = await commandStatus(supabase, chatId);
      break;
    case "/stats":
      text = await commandStats(supabase, chatId);
      break;
    case "/orders":
      text = await commandOrders(supabase, chatId);
      break;
    case "/alerts":
      text = await commandAlerts(supabase, chatId);
      break;
    case "/services":
      text = await commandServices();
      break;
    default:
      text = "Unknown command. Try /help for the list of commands.";
  }
  await sendMessage(token, chatId, text);
}

async function handleUpdate(supabase: ReturnType<typeof createClient>, token: string, update: TgUpdate) {
  const msg = update.message;
  if (!msg?.chat?.id) return;
  const chatId = msg.chat.id;
  const text = (msg.text ?? "").trim();

  await registerChat(supabase, chatId, msg.chat.username, msg.chat.first_name);

  if (!text.startsWith("/")) {
    await sendMessage(
      token,
      chatId,
      "👋 I'm the D&V Technologies bot. Type <b>/help</b> to see what I can do, or visit <a href=\"https://dvtechnologies.xyz\">dvtechnologies.xyz</a>."
    );
    return;
  }

  const [command, ...args] = text.split(/\s+/);
  await handleCommand(supabase, token, chatId, command);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  const token = Deno.env.get("TELEGRAM_BOT_TOKEN");
  if (!token) {
    return new Response(JSON.stringify({ error: "TELEGRAM_BOT_TOKEN not set" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = await getClient();
    const body: TgUpdate = await req.json();

    if (body.update_id != null) {
      await handleUpdate(supabase, token, body);
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: false, error: "Not a Telegram update" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("telegram-bot error:", error);
    return new Response(JSON.stringify({ ok: false, error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
