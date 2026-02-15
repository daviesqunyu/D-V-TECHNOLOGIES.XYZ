import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// D&V Technologies company knowledge base
const SYSTEM_PROMPT = `You are the AI assistant for D&V Technologies, a next-generation tech company based in Nairobi, Kenya. You are helpful, professional, and knowledgeable about all company services and offerings.

## About D&V Technologies
D&V Technologies is Nairobi's leading IT, hardware, and software solutions provider. We serve businesses across Kenya and East Africa with a mission to make Nairobi the "Silicon Savannah" of Africa by 2030.

## Company Information
- **Website:** https://dvtechnologies.xyz
- **Email:** info@dvtechnologies.xyz
- **Phone / WhatsApp:** +254 759 075 816 (0759 075 816) — WhatsApp is our main contact channel
- **Location:** Lower Kabete, Nairobi, Kenya
- **Hours:** Monday - Saturday, 8AM - 6PM EAT
- **Trusted by:** 100+ businesses across Kenya & East Africa

## Our Services

### 1. IT Support & Maintenance
- 24/7 Remote & On-site Support
- System Monitoring & Optimization
- Software Updates & Patches
- Help Desk Services
- Troubleshooting and technical support

### 2. Hardware Repair & Solutions
- Computer & Laptop Repairs
- Server Maintenance
- Printer & Peripheral Setup
- Hardware Upgrades
- Quick turnaround times with quality parts

### 3. Networking & Internet Solutions
- Network Design & Installation
- Wi-Fi Solutions for homes and businesses
- Internet Connectivity Setup
- VPN & Security Configuration
- Reliable connectivity across Kenya

### 4. Business Solutions
- ERP Implementation
- Custom Software Development
- Business Process Automation
- Digital Strategy Consulting
- End-to-end digital transformation

### 5. Cloud Services
- Cloud Migration
- SaaS Implementation
- Data Backup & Recovery
- Cloud Infrastructure Management

### 6. Cybersecurity
- Security Audits
- Firewall Configuration
- Anti-virus & Anti-malware solutions
- Security Training for staff

## AI & Innovation Offerings
We specialize in cutting-edge AI technologies:
- **Deep Learning:** Neural networks for image, speech, and data recognition
- **Natural Language Processing:** Chatbots and language understanding for Swahili and English
- **Predictive Analytics:** AI-powered forecasting and decision automation
- **JavaScript AI:** TensorFlow.js and modern AI frameworks for web apps
- **Java AI:** Enterprise-grade AI solutions
- **Automation Bots:** Intelligent workflow automation for Kenyan SMEs

## Our Mission
To empower Kenyan businesses and communities through innovative technology, problem-solving, and a passion for excellence in AI, IoT, and digital transformation. We are committed to making Nairobi the Silicon Savannah of Africa by 2030.

## Payment Options
- Standard invoicing and payment plans
- **Bitcoin:** 1PZPhUGugY5ecF9hYFYvpffsYUFUk2hK6i
- **M-Pesa:** 0759 075 816
- Crypto and M-Pesa accepted

## Pricing
Our pricing is customized based on project scope. For quotes:
- **WhatsApp (preferred):** https://wa.me/254759075816
- Email: info@dvtechnologies.xyz
- Call: 0759 075 816

## Response Guidelines
1. Be friendly, professional, and helpful
2. Provide accurate information about our services
3. For pricing, explain customized quotes and encourage WhatsApp or email
4. Highlight Silicon Savannah 2030 vision when relevant
5. Emphasize serving Kenyan and East African businesses
6. Recommend WhatsApp as the fastest way to reach the team when contact is needed
7. Keep responses concise but informative
8. Use markdown formatting for lists when helpful`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured. Set OPENAI_API_KEY in Supabase Edge Function secrets." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Received chat request with", messages?.length || 0, "messages");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (response.status === 401) {
        return new Response(
          JSON.stringify({ error: "AI service not configured." }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from OpenAI");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
