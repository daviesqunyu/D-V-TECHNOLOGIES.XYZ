import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PaymentOptions } from "@/components/PaymentOptions";
import { SEOHead } from "@/components/SEOHead";
import { servicesData } from "@/data/services";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? servicesData.find((s) => s.slug === slug) : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main id="main-content" className="pt-20 lg:pt-24">
          <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Service not found</h1>
            <Link to="/services">
              <Button variant="outline">Back to Services</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${service.title} | D&V Technologies`}
        description={service.description}
        canonicalPath={`/services/${service.slug}`}
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all services
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  Details for {service.title}
                </h1>
                <p className="text-muted-foreground text-lg">{service.description}</p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 lg:p-8 mb-8">
              <h2 className="font-display text-xl font-semibold mb-4">What we offer</h2>
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 lg:p-8">
              <h2 className="font-display text-xl font-semibold mb-2">Pay for this service</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Choose a plan and pay securely with Bitcoin or Paystack (card, M-Pesa, etc.).
              </p>
              <PaymentOptions variant="card" />
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Request a quote
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">
                  View all services
                </Button>
              </Link>
            </div>
          </motion.article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
