import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Privacy Policy | D&V Technologies"
        description="Privacy Policy for D&V Technologies outlining data collection, processing, retention, and user rights."
        canonicalPath="/privacy"
      />
      <Navbar />
      <main id="main-content" className="pt-20 lg:pt-24">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <h1 className="font-display text-4xl font-bold mb-6">Privacy Policy</h1>
            <div className="space-y-4 text-muted-foreground">
              <p>
                D&V Technologies collects only the data required to deliver our services,
                support requests, and secure our systems. This may include contact details,
                technical metadata, and communication history.
              </p>
              <p>
                We use collected information to respond to inquiries, provide contracted
                services, improve system reliability, and comply with legal obligations.
              </p>
              <p>
                We do not sell personal data. Access to data is restricted to authorized
                personnel and protected through technical and organizational safeguards.
              </p>
              <p>
                You may request access, correction, or deletion of your personal data by
                contacting us at info@dvtechnologies.xyz.
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
