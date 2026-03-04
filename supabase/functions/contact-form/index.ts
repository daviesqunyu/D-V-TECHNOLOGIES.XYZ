import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BUSINESS_EMAIL = "info@dvtechnologies.xyz";
const BUSINESS_EMAIL_ALT = "contact@dvtechnologies.xyz";
const BUSINESS_NAME = "D&V Technologies";
const WHATSAPP_NUMBER = "254759075816";

type AppointmentDetails = {
  preferredDate?: string;
  preferredTime?: string;
  preferredChannel?: string;
};

type ContactBody = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  appointment?: AppointmentDetails;
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
  const appointment = payload.appointment;

  const appointmentValid =
    appointment === undefined ||
    (typeof appointment === "object" &&
      (appointment.preferredDate === undefined ||
        typeof appointment.preferredDate === "string") &&
      (appointment.preferredTime === undefined ||
        typeof appointment.preferredTime === "string") &&
      (appointment.preferredChannel === undefined ||
        typeof appointment.preferredChannel === "string"));

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
      (typeof payload.phone === "string" &&
        payload.phone.trim().length <= MAX_PHONE_LENGTH)) &&
    appointmentValid
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

function getFromAddress(): string {
  const fromEnv = Deno.env.get("RESEND_FROM_EMAIL");
  if (fromEnv?.trim()) return `${BUSINESS_NAME} <${fromEnv.trim()}>`;
  return `${BUSINESS_NAME} <onboarding@resend.dev>`;
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
        from: getFromAddress(),
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
      const appointmentLines: string[] = [];
      if (body.appointment?.preferredDate) {
        appointmentLines.push(
          `<p><strong>Preferred date:</strong> ${escapeHtml(body.appointment.preferredDate)}</p>`,
        );
      }
      if (body.appointment?.preferredTime) {
        appointmentLines.push(
          `<p><strong>Preferred time:</strong> ${escapeHtml(body.appointment.preferredTime)}</p>`,
        );
      }
      if (body.appointment?.preferredChannel) {
        appointmentLines.push(
          `<p><strong>Preferred channel:</strong> ${escapeHtml(body.appointment.preferredChannel)}</p>`,
        );
      }

      const toBusiness = `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #020817; padding: 20px;">
          <div style="max-width: 640px; margin: 0 auto; background: linear-gradient(135deg, #020817, #020617); border-radius: 16px; border: 1px solid #1e293b; padding: 24px; color: #e5e7eb;">
            <h1 style="font-size: 20px; margin: 0 0 8px; color: #38bdf8;">New Website Message</h1>
            <p style="margin: 0 0 16px; color: #9ca3af;">A new contact and appointment request just came in from the D&V Technologies site.</p>

            <div style="margin-bottom: 16px;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: .08em; color: #6b7280; margin: 0 0 8px;">Contact Details</h2>
              <p style="margin: 0; font-size: 14px;"><strong>Name:</strong> ${escapeHtml(body.name)}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Email:</strong> ${escapeHtml(body.email)}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Phone:</strong> ${escapeHtml(body.phone || "—")}</p>
            </div>

            <div style="margin-bottom: 16px;">
              <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: .08em; color: #6b7280; margin: 0 0 8px;">Project / Message</h2>
              <p style="margin: 0 0 4px; font-size: 14px;"><strong>Subject:</strong> ${escapeHtml(body.subject)}</p>
              <div style="margin-top: 4px; font-size: 14px; line-height: 1.5;">
                ${escapeHtml(body.message).replace(/\n/g, "<br>")}
              </div>
            </div>

            ${
              appointmentLines.length
                ? `<div style="margin-bottom: 16px;">
                    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: .08em; color: #6b7280; margin: 0 0 8px;">Appointment Request</h2>
                    ${appointmentLines.join("")}
                  </div>`
                : ""
            }

            <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #1e293b; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0 0 4px;">Reply directly to this email or reach the client on WhatsApp:</p>
              <p style="margin: 0;">
                <a href="https://wa.me/${WHATSAPP_NUMBER}" style="color: #22c55e; text-decoration: none;">https://wa.me/${WHATSAPP_NUMBER}</a>
              </p>
            </div>
          </div>
        </div>
      `;
      // Send admin notification to primary address
      await sendEmail(BUSINESS_EMAIL, `[D&V Contact] ${body.subject}`, toBusiness, resendKey);
      // Also send to alternate address (Cloudflare routing can fan these out further)
      await sendEmail(BUSINESS_EMAIL_ALT, `[D&V Contact] ${body.subject}`, toBusiness, resendKey);

      const autoReply = `
        <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #020817; padding: 20px;">
          <div style="max-width: 640px; margin: 0 auto; background: radial-gradient(circle at top left, #0ea5e9 0, #020617 45%, #0f172a 100%); border-radius: 16px; border: 1px solid #1e293b; padding: 24px; color: #e5e7eb;">
            <h1 style="font-size: 22px; margin: 0 0 12px;">We&apos;ve received your message ✅</h1>
            <p style="margin: 0 0 12px; font-size: 14px;">Hi ${escapeHtml(
              body.name,
            )},</p>
            <p style="margin: 0 0 12px; font-size: 14px;">
              Thank you for reaching out to <strong>${BUSINESS_NAME}</strong>. Your message is safely in our inbox and our team will review it shortly.
            </p>

            ${
              appointmentLines.length
                ? `<div style="margin: 16px 0; padding: 12px 14px; border-radius: 12px; background: rgba(15,23,42,0.9); border: 1px solid rgba(56,189,248,0.4);">
                    <p style="margin: 0 0 4px; font-size: 14px; font-weight: 600; color: #38bdf8;">Your appointment request</p>
                    ${
                      body.appointment?.preferredDate
                        ? `<p style="margin: 2px 0; font-size: 13px;"><strong>Date:</strong> ${escapeHtml(
                            body.appointment.preferredDate,
                          )}</p>`
                        : ""
                    }
                    ${
                      body.appointment?.preferredTime
                        ? `<p style="margin: 2px 0; font-size: 13px;"><strong>Time:</strong> ${escapeHtml(
                            body.appointment.preferredTime,
                          )}</p>`
                        : ""
                    }
                    ${
                      body.appointment?.preferredChannel
                        ? `<p style="margin: 2px 0; font-size: 13px;"><strong>Preferred channel:</strong> ${escapeHtml(
                            body.appointment.preferredChannel,
                          )}</p>`
                        : ""
                    }
                    <p style="margin: 8px 0 0; font-size: 12px; color: #9ca3af;">We&apos;ll confirm or adjust this slot by email.</p>
                  </div>`
                : ""
            }

            <p style="margin: 12px 0; font-size: 14px;">
              <strong>Fastest way to reach us:</strong> chat with us on WhatsApp —
              <a href="https://wa.me/${WHATSAPP_NUMBER}" style="color: #22c55e; text-decoration: none;"> tap here to open WhatsApp.</a>
            </p>

            <p style="margin: 16px 0 0; font-size: 13px;">
              Best regards,<br/>
              <span style="font-weight: 600;">${BUSINESS_NAME}</span><br/>
              <a href="https://dvtechnologies.xyz" style="color: #38bdf8; text-decoration: none;">https://dvtechnologies.xyz</a>
            </p>
          </div>
        </div>
      `;
      const userSubject = appointmentLines.length > 0
        ? `We received your appointment request — ${BUSINESS_NAME}`
        : `We received your message — ${BUSINESS_NAME}`;
      await sendEmail(body.email.trim(), userSubject, autoReply, resendKey);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Message sent. We'll reply by email and you can also chat us on WhatsApp for a faster response.",
        auto_reply_sent: Boolean(resendKey),
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

function escapeHtml(s: string | undefined): string {
  if (s == null) return "";
  const t = String(s);
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
