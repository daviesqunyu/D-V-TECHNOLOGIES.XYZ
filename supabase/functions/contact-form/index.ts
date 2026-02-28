import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUSINESS_EMAIL = "info@dvtechnologies.xyz";
const BUSINESS_NAME = "D&V Technologies";
const WHATSAPP_NUMBER = "254759075816";

type ContactBody = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
};

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 255;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_PHONE_LENGTH = 20;

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= MAX_EMAIL_LENGTH;
}

function validate(body: unknown): body is ContactBody {
  if (typeof body !== "object" || body === null) return false;
  const payload = body as ContactBody;
  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    payload.name.trim().length <= MAX_NAME_LENGTH &&
    typeof payload.email === "string" &&
    isValidEmail(payload.email.trim().toLowerCase()) &&
    typeof payload.subject === "string" &&
    payload.subject.trim().length > 0 &&
    payload.subject.trim().length <= MAX_SUBJECT_LENGTH &&
    typeof payload.message === "string" &&
    payload.message.trim().length > 0 &&
    payload.message.trim().length <= MAX_MESSAGE_LENGTH &&
    (payload.phone === undefined ||
      (typeof payload.phone === "string" && payload.phone.trim().length <= MAX_PHONE_LENGTH))
  );
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!secret) return true;
  const body = new URLSearchParams({
    secret,
    response: token,
  });
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) return false;
  const json = await res.json().catch(() => null);
  return Boolean(json?.success);
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  apiKey: string
): Promise<boolean> {
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
    return res.ok;
  } catch {
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    if (!validate(body)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: name, email, subject, and message are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (body.recaptchaToken) {
      const verified = await verifyRecaptcha(body.recaptchaToken);
      if (!verified) {
        return new Response(
          JSON.stringify({ error: "reCAPTCHA validation failed." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase env not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: insertError } = await supabase.from("contact_submissions").insert({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      subject: body.subject.trim(),
      message: body.message.trim(),
    });

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save your message. Please try again or contact us on WhatsApp." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      const toBusiness = `
        <p><strong>New contact form submission</strong></p>
        <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(body.phone || "—")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(body.message).replace(/\n/g, "<br>")}</p>
        <p>—<br>Reply or reach them on WhatsApp: <a href="https://wa.me/${WHATSAPP_NUMBER}">${WHATSAPP_NUMBER}</a></p>
      `;
      await sendEmail(BUSINESS_EMAIL, `[D&V Contact] ${body.subject}`, toBusiness, resendKey);

      const autoReply = `
        <p>Hi ${escapeHtml(body.name)},</p>
        <p>Thank you for contacting <strong>${BUSINESS_NAME}</strong>. We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Fastest way to reach us:</strong> Chat on WhatsApp — <a href="https://wa.me/${WHATSAPP_NUMBER}">Click here to open WhatsApp</a></p>
        <p>Best regards,<br>${BUSINESS_NAME}<br>https://dvtechnologies.xyz</p>
      `;
      await sendEmail(body.email.trim(), `We received your message — ${BUSINESS_NAME}`, autoReply, resendKey);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent. We'll reply by email and you can also chat us on WhatsApp for a faster response.",
        whatsapp_url: `https://wa.me/${WHATSAPP_NUMBER}`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("contact-form error:", e);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try WhatsApp: https://wa.me/" + WHATSAPP_NUMBER }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
