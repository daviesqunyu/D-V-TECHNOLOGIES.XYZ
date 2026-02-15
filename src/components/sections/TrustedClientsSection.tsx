import { motion } from "framer-motion";
import { ExternalLink, Instagram } from "lucide-react";

const TRUSTED_PARTNERS = [
  {
    name: "BRIDAN DESIGN BUILD",
    tagline: "Design & Build",
    url: "https://buildwithbridan.com",
    logoUrl: "https://www.google.com/s2/favicons?domain=buildwithbridan.com&sz=128",
    logoAlt: "BRIDAN DESIGN BUILD",
  },
  {
    name: "VarraTek Security",
    tagline: "Protect Your Digital World",
    url: "https://varrateksecurity.xyz",
    logoUrl: "https://www.google.com/s2/favicons?domain=varrateksecurity.xyz&sz=128",
    logoAlt: "VarraTek Security",
    instagram: "https://www.instagram.com/varrateksecurity/",
  },
  {
    name: "D&V Technologies",
    tagline: "Next-Gen Tech",
    url: "https://dvtechnologies.xyz",
    logoUrl: "/favicon.svg",
    logoAlt: "D&V Technologies",
  },
];

export function TrustedClientsSection() {
  return (
    <section id="who-trust-us" className="scroll-mt-24 py-20 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Who <span className="gradient-text">Trust Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organizations and partners who trust us with their technology and growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {TRUSTED_PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 lg:p-10 flex flex-col gap-6 hover:border-primary/50 transition-all hover:shadow-lg hover:scale-[1.02] group"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 flex-1 min-w-0"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.logoAlt}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <span className="font-display font-bold text-xl text-primary">
                      {partner.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 3)}
                    </span>
                  )}
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    {partner.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{partner.tagline}</p>
                  <p className="text-xs text-primary mt-1 truncate" title={partner.url}>
                    {partner.url.replace(/^https?:\/\//, "")}
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0" />
              </a>
              {"instagram" in partner && partner.instagram && (
                <a
                  href={partner.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#E4405F] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
