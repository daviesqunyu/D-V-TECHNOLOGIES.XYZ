import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What services does D&V Technologies offer?",
    a: "We offer IT Support & Maintenance, Hardware Repair, Software Development, Networking & Internet, AI & Automation, and Business Solutions including cloud migration and custom software.",
  },
  {
    q: "Do you support businesses outside Nairobi?",
    a: "Yes. We serve clients across Kenya and East Africa, with remote support and on-site visits where needed.",
  },
  {
    q: "Do you accept crypto payments?",
    a: "Yes. We accept select cryptocurrencies for secure transactions. Contact us for details.",
  },
  {
    q: "How can I get started with your AI assistant?",
    a: "Click 'Try AI Assistant' or 'Chat with AI' anywhere on the site. Our AI can answer questions about our services, pricing, and tech solutions 24/7.",
  },
  {
    q: "What is the Silicon Savannah 2030 vision?",
    a: "We are committed to making Nairobi the Silicon Savannah of Africa by 2030—a hub for innovation, AI, IoT, and digital transformation.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently <span className="gradient-text">Asked</span> Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quick answers to common questions about our services and company.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-xl px-4 border border-border data-[state=open]:border-primary/40"
              >
                <AccordionTrigger className="text-left font-medium hover:text-primary hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
