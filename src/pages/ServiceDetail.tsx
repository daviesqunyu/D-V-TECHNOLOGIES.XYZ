import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, CheckCircle, ArrowRight, Phone, Mail, Plus, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PaymentOptions } from "@/components/PaymentOptions";
import { SEOHead } from "@/components/SEOHead";
import { servicesData } from "@/data/services";
import { products, DELIVERY_PROCESS } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";

/**
 * ServiceDetail Component
 * Displays detailed information for a specific service
 * Features:
 * - Dynamic routing based on service slug
 * - Feature showcase with animations
 * - Payment options integration
 * - Process steps + related storefront products
 * - Contact CTA
 * - Accessibility improvements
 */
const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData.find((s) => s.slug === slug) : null;
  const WHATSAPP_URL = "https://wa.me/254759075816";
  const { addItem } = useCart();
  const { toast } = useToast();
  const [addedId, setAddedId] = useState<string | null>(null);

  // 404 State - Service not found
  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Service Not Found | D&V Technologies"
          description="The service you're looking for could not be found."
          canonicalPath="/services"
        />
        <Navbar />
        <main id="main-content" className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                  <ArrowLeft className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Service Not Found
              </h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
                The service you're looking for doesn't exist. Browse all our services to find what you need.
              </p>
              <Link to="/services">
                <Button variant="hero" size="lg">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;
  const related = products.filter((p) => p.category === service.category).slice(0, 3);

  const handleAdd = (id: string, name: string, price: number, currency: "KES" | "USD", billing?: "weekly" | "monthly" | "once") => {
    addItem({ id, name, price, currency, billing, category: service.category });
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
    toast({ title: `Added ${name} to cart` });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${service.title} | D&V Technologies`}
        description={service.description}
        canonicalPath={`/services/${service.slug}`}
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-b border-border sticky top-20 bg-background/80 backdrop-blur-sm z-40"
          aria-label="Breadcrumb"
        >
          <div className="container mx-auto px-4 lg:px-8 py-3">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              aria-label="Back to all services"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to all services
            </Link>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                    aria-hidden="true"
                  >
                    <Icon className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                </div>

                {/* Title & Description */}
                <div className="flex-1">
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-foreground">
                    {service.title}
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="relative rounded-2xl overflow-hidden border border-border shadow-xl"
              >
                {related[0]?.image ? (
                  <img
                    src={related[0].image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-48 md:h-64 object-cover"
                  />
                ) : (
                  <div className={`w-full h-48 md:h-64 bg-gradient-to-br ${service.color}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur text-white text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    {service.category} services
                  </span>
                  <Link to="/shop">
                    <Button variant="hero" size="sm">
                      Shop related products
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Features Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 lg:p-8 mb-8"
              aria-labelledby="features-heading"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <h2 id="features-heading" className="font-display text-2xl font-semibold">
                  What We Offer
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-foreground text-sm md:text-base">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Process Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="glass-card rounded-2xl p-6 lg:p-8 mb-8"
              aria-labelledby="process-heading"
            >
              <div className="flex items-center gap-3 mb-6">
                <ArrowRight className="w-6 h-6 text-primary flex-shrink-0" />
                <h2 id="process-heading" className="font-display text-2xl font-semibold">
                  How It Works
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {DELIVERY_PROCESS.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      className="relative rounded-xl border border-border bg-background/60 p-4"
                    >
                      <span className="absolute -top-2 -left-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent text-white text-[10px] font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <StepIcon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-sm font-semibold leading-tight mb-1">{step.title}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Pricing Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 lg:p-8 mb-8"
              aria-labelledby="pricing-heading"
            >
              <div className="mb-6">
                <h2 id="pricing-heading" className="font-display text-2xl font-semibold mb-2">
                  Get Started Today
                </h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Choose from our flexible pricing plans. Pay securely with M-Pesa, Card, or Bitcoin through Paystack.
                </p>
              </div>
              <PaymentOptions variant="card" />
            </motion.section>

            {/* Related Products Section */}
            {related.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mb-8"
                aria-labelledby="related-heading"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 id="related-heading" className="font-display text-2xl font-semibold">
                    Related storefront items
                  </h2>
                  <Link
                    to="/shop"
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((product) => {
                    const ProductIcon = product.icon;
                    const isAdded = addedId === product.id;
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-border bg-card overflow-hidden group"
                      >
                        <div className="relative h-28 overflow-hidden">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${product.gradient}`} />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                          <div className={`absolute -bottom-3 left-3 w-9 h-9 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}>
                            <ProductIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="font-display font-semibold text-sm leading-snug mb-1 line-clamp-2">
                            {product.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="font-bold gradient-text text-sm tabular-nums">
                              {formatPrice(product.price, product.currency, product.billing)}
                            </p>
                            <Button
                              variant={isAdded ? "secondary" : "outline"}
                              size="sm"
                              className="h-8 px-2.5"
                              onClick={() =>
                                handleAdd(
                                  product.id,
                                  product.name,
                                  product.price,
                                  product.currency,
                                  product.billing
                                )
                              }
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" /> Added
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" /> Add
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 lg:p-10 mb-8"
              aria-labelledby="cta-heading"
            >
              <h3 id="cta-heading" className="font-display text-2xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-muted-foreground mb-6 text-sm md:text-base">
                Every business is unique. Let's discuss your specific needs and create a tailored solution that fits perfectly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <Mail className="w-5 h-5" />
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href={`${WHATSAPP_URL}?text=Hi%20D%26V%20Technologies%2C%20I%27m%20interested%20in%20${encodeURIComponent(
                    service.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Phone className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.section>

            {/* Navigation Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/services" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="w-4 h-4" />
                  View All Services
                </Button>
              </Link>
              <Link to="/contact" className="flex-1">
                <Button variant="ghost" size="lg" className="w-full">
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.footer>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
