import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PaymentOptions } from "@/components/PaymentOptions";

const WHATSAPP_URL = "https://wa.me/254759075816";
const EMAIL = "info@dvtechnologies.xyz";
const PHONE = "0759 075 816";
const ADDRESS = "Lower Kabete, Nairobi, Kenya";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info - WhatsApp primary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Ready to transform your business with technology? 
              Chat us on WhatsApp for the fastest response, or send a message below.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-full sm:w-auto justify-center rounded-xl px-6 py-4 mb-8 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              Chat on WhatsApp — {PHONE}
            </a>

            <div className="space-y-6">
              {[
                { icon: MessageCircle, label: "WhatsApp (main)", value: PHONE, href: WHATSAPP_URL },
                { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
                { icon: Phone, label: "Phone", value: PHONE, href: "tel:+254759075816" },
                { icon: MapPin, label: "Location", value: ADDRESS, href: null },
                { icon: Clock, label: "Hours", value: "Mon - Sat: 8AM - 6PM EAT", href: null },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.icon === MessageCircle ? "bg-[#25D366]/20" : "bg-primary/10"}`}>
                    <item.icon className={`w-5 h-5 ${item.icon === MessageCircle ? "text-[#25D366]" : "text-primary"}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="font-medium hover:text-primary transition-colors truncate block">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Payment options: BTC + M-Pesa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 p-6 rounded-xl glass-card border border-accent/30"
            >
              <p className="font-semibold mb-3">Pay with Bitcoin or M-Pesa</p>
              <PaymentOptions variant="card" />
            </motion.div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 lg:p-10"
          >
            <h3 className="font-display text-2xl font-bold mb-4">
              Ready to Start?
            </h3>
            <p className="text-muted-foreground mb-8">
              Send us a message and we'll get back to you within 24 hours. 
              Or chat with our AI assistant for instant answers.
            </p>
            
            <div className="space-y-4">
              <Link to="/contact" className="block">
                <Button variant="hero" size="lg" className="w-full group">
                  Contact Us
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/ai-assistant" className="block">
                <Button variant="glass" size="lg" className="w-full">
                  Chat with AI Assistant
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                Serving <span className="text-primary font-medium">100+</span> businesses across Kenya & East Africa
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
