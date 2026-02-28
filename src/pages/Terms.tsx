import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Terms of Service | D&V Technologies"
        description="Terms of Service governing the use of D&V Technologies services, website, and client engagement terms."
        canonicalPath="/terms"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h1 className="font-display text-4xl font-bold mb-6">Terms of Service</h1>
            <div className="space-y-4 text-muted-foreground">
              <p>
                By using the D&V Technologies website and services, you agree to these terms.
                Service delivery details, scope, and timelines are finalized through signed
                proposals, contracts, or statements of work.
              </p>
              <p>
                Clients are responsible for providing accurate information and timely approvals.
                Delays in access, content, or sign-off may affect timelines.
              </p>
              <p>
                Unless otherwise agreed in writing, intellectual property for delivered work
                transfers according to contract terms after full payment.
              </p>
              <p>
                D&V Technologies is not liable for indirect or consequential losses arising from
                website use or service interruptions beyond reasonable control.
              </p>
              <p>Last updated: 2026-02-16.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
