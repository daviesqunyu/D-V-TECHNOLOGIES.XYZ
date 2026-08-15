const DEFAULT_DOMAIN = "dvtechnologies.xyz";
const RAW_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// Prefer the standard Supabase env var name, but keep backwards compatibility.
const ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SITE_DOMAIN = import.meta.env.VITE_SITE_DOMAIN ?? DEFAULT_DOMAIN;
const SUPABASE_URL = RAW_SUPABASE_URL?.replace(/\/+$/, "");
const API_GATEWAY_URL = import.meta.env.VITE_API_GATEWAY_URL?.replace(/\/+$/, "");

const missingConfig = [
  !SUPABASE_URL ? "VITE_SUPABASE_URL" : "",
  !ANON_KEY ? "VITE_SUPABASE_ANON_KEY" : "",
].filter(Boolean);

function ensureApiConfig() {
  if (!missingConfig.length) return;
  throw new Error(
    `Missing required environment variables: ${missingConfig.join(", ")}. ` +
      "Set them in your local .env and cPanel build environment."
  );
}

if (missingConfig.length && typeof window !== "undefined") {
  console.error(
    `[api-config] Missing required environment variables: ${missingConfig.join(", ")}`
  );
}

export const config = {
  supabaseUrl: SUPABASE_URL ?? "",
  anonKey: ANON_KEY ?? "",
  apiGatewayUrl: API_GATEWAY_URL ?? "",
  domain: SITE_DOMAIN,
  baseOrigin:
    typeof window !== "undefined" ? window.location.origin : `https://${SITE_DOMAIN}`,
} as const;

function apiPath(path: string) {
  ensureApiConfig();
  if (API_GATEWAY_URL) {
    return `${API_GATEWAY_URL}${path}`;
  }
  return `${SUPABASE_URL}/functions/v1${path}`;
}

export const api = {
  contactForm: apiPath("/contact-form"),
  initiatePayment: apiPath("/initiate-payment"),
  verifyPayment: apiPath("/verify-payment"),
  adminData: apiPath("/admin-data"),
  newsletterSubscribe: apiPath("/newsletter-subscribe"),
  aiChat: apiPath("/ai-chat"),
} as const;

export function authHeaders() {
  ensureApiConfig();
  return {
    "Content-Type": "application/json",
    // Supabase Edge Functions gateway expects `apikey` and commonly also `Authorization`.
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
  };
}

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function chatWithAI(messages: ChatMessage[], signal?: AbortSignal) {
  ensureApiConfig();
  const res = await fetch(api.aiChat, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ messages }),
    signal,
  });
  if (!res.ok) {
    throw new Error(`AI chat failed (${res.status})`);
  }
  const data = (await res.json()) as { content?: string };
  return data.content ?? "";
}
