import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PaymentOptions } from "@/components/PaymentOptions";

const WHATSAPP_URL = "https://wa.me/254759075816";
const PRIMARY_EMAIL = "info@dvtechnologies.xyz";
const SECONDARY_EMAIL = "contact@dvtechnologies.xyz";
const PRIMARY_PHONE = "0719 576 326";
const SECONDARY_PHONE = "0759 075 816";
const ADDRESS = "Lower Kabete, Nairobi, Kenya";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center opacity-60 dark:opacity-75"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/88 via-background/78 to-background/94" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Ready to transform your business with technology? 
              Chat us on WhatsApp for the fastest response, or send a message below.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-full sm:w-auto justify-center rounded-xl px-6 py-3 mb-6 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp — {SECONDARY_PHONE}
            </a>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: SECONDARY_PHONE,
                  href: WHATSAPP_URL,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: `${PRIMARY_EMAIL}, ${SECONDARY_EMAIL}`,
                  href: `mailto:${PRIMARY_EMAIL}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: `${PRIMARY_PHONE} (primary), ${SECONDARY_PHONE} (alt)`,
                  href: "tel:+254719576326",
                },
                { icon: MapPin, label: "Location", value: ADDRESS, href: null },
                { icon: Clock, label: "Hours", value: "Mon - Sat: 8AM - 6PM EAT", href: null },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.icon === MessageCircle ? "bg-[#25D366]/20" : "bg-primary/10"}`}>
                    <item.icon className={`w-4 h-4 ${item.icon === MessageCircle ? "text-[#25D366]" : "text-primary"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-medium text-sm hover:text-primary transition-colors truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-sm">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 p-4 rounded-xl glass-card border border-accent/30"
            >
              <p className="font-semibold text-sm mb-2">Pay with Bitcoin or Paystack</p>
              <PaymentOptions variant="card" />
            </motion.div>
          </motion.div>

          {/* Right: CTA Card - level with left, compact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-6 lg:p-8 lg:max-w-md"
          >
            <h3 className="font-display text-xl font-bold mb-3">
              Ready to Start?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Send us a message and we'll get back within 24 hours, or chat with our AI assistant for instant answers.
            </p>
            <div className="space-y-3">
              <Link to="/contact" className="block">
                <Button variant="hero" size="default" className="w-full group">
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/ai-assistant" className="block">
                <Button variant="glass" size="default" className="w-full">
                  Chat with AI Assistant
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-6 pt-6 border-t border-border">
              Serving <span className="text-primary font-medium">100+</span> businesses across Kenya & East Africa
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
