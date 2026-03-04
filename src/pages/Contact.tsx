import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";
import { PaymentOptions } from "@/components/PaymentOptions";
import { api, authHeaders } from "@/lib/api";
import { SEOHead } from "@/components/SEOHead";
const PRIMARY_WHATSAPP_NUMBER = "254719576326";
const SECONDARY_WHATSAPP_NUMBER = "254759075816";
const WHATSAPP_BASE_PRIMARY = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}`;
const WHATSAPP_BASE_SECONDARY = `https://wa.me/${SECONDARY_WHATSAPP_NUMBER}`;
const PRIMARY_PHONE = "0719 576 326";
const SECONDARY_PHONE = "0759 075 816";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickMessage, setQuickMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
    preferredChannel: "",
  });

  const getRecaptchaToken = async () => {
    if (!RECAPTCHA_SITE_KEY || !window.grecaptcha) return undefined;
    return new Promise<string | undefined>((resolve) => {
      window.grecaptcha?.ready(async () => {
        try {
          const token = await window.grecaptcha?.execute(RECAPTCHA_SITE_KEY, {
            action: "contact_submit",
          });
          resolve(token);
        } catch {
          resolve(undefined);
        }
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const recaptchaToken = await getRecaptchaToken();
      const res = await fetch(api.contactForm, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject || "Appointment request from website",
          message: formData.message,
          appointment: {
            preferredDate: formData.preferredDate || undefined,
            preferredTime: formData.preferredTime || undefined,
            preferredChannel: formData.preferredChannel || undefined,
          },
          recaptchaToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({
          title: "Could not send message",
          description: data.error || "Please try again or chat us on WhatsApp.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const autoReplyNote = data.auto_reply_sent
        ? " Check your inbox (and spam) for an automatic confirmation from us."
        : "";
      toast({
        title: "Appointment request sent!",
        description:
          "We have your details and will confirm by email." + autoReplyNote +
          " For a faster response, you can also chat us on WhatsApp.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        preferredDate: "",
        preferredTime: "",
        preferredChannel: "",
      });

      if (data.whatsapp_url) {
        const prefill = encodeURIComponent(
          `Hi D&V Technologies, I just sent a message via your website (Subject: ${formData.subject}).`
        );
        setTimeout(() => {
          window.open(`${data.whatsapp_url}?text=${prefill}`, "_blank", "noopener");
        }, 800);
      }
    } catch {
      toast({
        title: "Connection error",
        description: "Please try again or contact us on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    if (!quickMessage.trim()) {
      toast({
        title: "Add a message first",
        description: "Type a short message before sending it via WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    const intro = formData.name
      ? `Hi, I'm ${formData.name}.\n\n`
      : "Hi D&V Technologies,\n\n";

    const detailsLines: string[] = [];
    if (formData.email) detailsLines.push(`Email: ${formData.email}`);
    if (formData.phone) detailsLines.push(`Phone: ${formData.phone}`);

    const details =
      detailsLines.length > 0 ? `\n\n${detailsLines.join("\n")}` : "";

    const text = encodeURIComponent(`${intro}${quickMessage.trim()}${details}`);
    const url = `${WHATSAPP_BASE_SECONDARY}?text=${text}`;
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact D&V Technologies"
        description="Talk to D&V Technologies about software, AI, cybersecurity, and IT support projects. Reach us via form, email, or WhatsApp."
        canonicalPath="/contact"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-16 lg:py-24 hero-pattern">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Get In <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Ready to transform your business? Chat us on WhatsApp for the fastest response.
              </p>
              <a
                href={WHATSAPP_BASE_SECONDARY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl px-6 py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp — {SECONDARY_PHONE}
              </a>
              <div className="mt-3 flex justify-center">
                <a
                  href={WHATSAPP_BASE_PRIMARY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl px-6 py-3 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-semibold transition-colors text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp — {PRIMARY_PHONE}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left column: WhatsApp message + appointment form */}
              <div className="space-y-8">
                {/* WhatsApp message section */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="glass-card rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Send a WhatsApp Message
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Write a quick message and we&apos;ll open WhatsApp with everything filled in
                    for you to send.
                  </p>
                  <Textarea
                    id="whatsapp-message"
                    placeholder="Type your question or request here..."
                    rows={4}
                    value={quickMessage}
                    onChange={(e) => setQuickMessage(e.target.value)}
                    className="bg-muted/50 resize-none mb-4"
                  />
                  <Button
                    type="button"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleWhatsAppSend}
                  >
                    Send via WhatsApp
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    WhatsApp uses your phone number and data. No email is sent from this section.
                  </p>
                </motion.div>

                {/* Appointment form */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="glass-card rounded-2xl p-6 lg:p-8"
                >
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Book an Appointment (Email)
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Submissions go to info@dvtechnologies.xyz and contact@dvtechnologies.xyz. You will receive an automatic reply to the email you provide.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                          Name
                        </label>
                        <Input
                          id="contact-name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                          className="bg-muted/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          className="bg-muted/50"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <Input
                          id="contact-phone"
                          placeholder={PRIMARY_PHONE}
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="bg-muted/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <Input
                          id="contact-subject"
                          placeholder="Appointment about which service?"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="bg-muted/50"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                        Extra details for the appointment <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="contact-message"
                        placeholder="Tell us about your project, goals, or questions..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        minLength={1}
                        className="bg-muted/50 resize-none"
                      />
                    </div>

                    {/* Appointment request */}
                    <div className="mt-4 border-t border-border pt-4 space-y-4">
                      <h3 className="font-display text-lg font-semibold">
                        Preferred Appointment Slot
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-1">
                          <label
                            htmlFor="appointment-date"
                            className="block text-sm font-medium mb-2"
                          >
                            Preferred Date
                          </label>
                          <Input
                            id="appointment-date"
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) =>
                              setFormData({ ...formData, preferredDate: e.target.value })
                            }
                            className="bg-muted/50"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <label
                            htmlFor="appointment-time"
                            className="block text-sm font-medium mb-2"
                          >
                            Preferred Time
                          </label>
                          <Input
                            id="appointment-time"
                            type="time"
                            value={formData.preferredTime}
                            onChange={(e) =>
                              setFormData({ ...formData, preferredTime: e.target.value })
                            }
                            className="bg-muted/50"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <label
                            htmlFor="appointment-channel"
                            className="block text-sm font-medium mb-2"
                          >
                            Preferred Channel
                          </label>
                          <select
                            id="appointment-channel"
                            value={formData.preferredChannel}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                preferredChannel: e.target.value,
                              })
                            }
                            className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            <option value="">No preference</option>
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Phone Call">Phone Call</option>
                            <option value="Email">Email</option>
                            <option value="Office Visit">Office Visit</option>
                            <option value="Video Call">Video Call</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full mt-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Appointment Request"}
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </motion.div>
              </div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <div className="flex flex-col gap-1 text-sm">
                          <a
                            href="mailto:info@dvtechnologies.xyz"
                            className="font-medium hover:text-primary transition-colors"
                          >
                            info@dvtechnologies.xyz
                          </a>
                          <a
                            href="mailto:contact@dvtechnologies.xyz"
                            className="font-medium hover:text-primary transition-colors"
                          >
                            contact@dvtechnologies.xyz
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <div className="flex flex-col gap-1 text-sm">
                          <a
                            href={`tel:+254719576326`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {PRIMARY_PHONE} <span className="text-xs text-muted-foreground">(primary)</span>
                          </a>
                          <a
                            href={`tel:+254759075816`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {SECONDARY_PHONE} <span className="text-xs text-muted-foreground">(alt)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">Lower Kabete, Nairobi, Kenya</p>
                      </div>
                    </div>
                    {/* Hours */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hours</p>
                        <p className="font-medium">Mon - Sat: 8AM - 6PM EAT</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pay with Bitcoin or Paystack */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Pay with Bitcoin or Paystack</h3>
                  <PaymentOptions variant="card" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
