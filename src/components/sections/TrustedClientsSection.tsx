import { motion } from "framer-motion";
import { ExternalLink, Instagram, CheckCircle, Users } from "lucide-react";

const TRUSTED_PARTNERS = [
  {
    name: "Bridan Design Build",
    tagline: "Design & Build",
    domain: "buildwithbridan.com",
    url: "https://buildwithbridan.com",
    logoUrl: "https://www.google.com/s2/favicons?domain=buildwithbridan.com&sz=128",
    logoAlt: "Bridan Design Build",
    category: "Design",
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-cyan-400",
    border: "group-hover:border-cyan-400/50",
  },
  {
    name: "VarraTek",
    tagline: "Protect Your Digital World",
    domain: "varratek.xyz",
    url: "https://varratek.xyz",
    logoUrl: "https://www.google.com/s2/favicons?domain=varratek.xyz&sz=128",
    logoAlt: "VarraTek",
    instagram: "https://www.instagram.com/varrateksecurity/",
    category: "Cybersecurity",
    color: "from-red-500/20 to-orange-500/20",
    accent: "text-orange-400",
    border: "group-hover:border-orange-400/50",
  },
  {
    name: "Ndakaru",
    tagline: "Kenyan Digital Solutions",
    domain: "ndakaru.co.ke",
    url: "https://ndakaru.co.ke",
    logoUrl: "https://www.google.com/s2/favicons?domain=ndakaru.co.ke&sz=128",
    logoAlt: "Ndakaru",
    category: "Digital",
    color: "from-green-500/20 to-emerald-500/20",
    accent: "text-emerald-400",
    border: "group-hover:border-emerald-400/50",
  },
  {
    name: "D&V Technologies",
    tagline: "Next-Gen Tech · Silicon Savannah",
    domain: "dvtechnologies.xyz",
    url: "https://dvtechnologies.xyz",
    logoUrl: "/favicon.svg",
    logoAlt: "D&V Technologies",
    category: "IT & AI",
    color: "from-primary/20 to-accent/20",
    accent: "text-primary",
    border: "group-hover:border-primary/50",
    featured: true,
  },
];

export function TrustedClientsSection() {
  return (
    <section id="who-trust-us" className="py-24 lg:py-32 relative overflow-hidden bg-card">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-5">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trusted Partners</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Who <span className="gradient-text">Trusts Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organizations and partners who rely on D&V Technologies for their digital growth and IT solutions.
          </p>
        </motion.div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {TRUSTED_PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group glass-card rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${partner.border} ${partner.featured ? "ring-1 ring-primary/30" : ""}`}
            >
              {/* Featured badge */}
              {partner.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground tracking-wide uppercase">
                    Us
                  </span>
                </div>
              )}

              {/* Gradient top banner */}
              <div className={`h-20 bg-gradient-to-br ${partner.color} flex items-center justify-center relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/5" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/5" />
                {/* Logo */}
                <div className="w-14 h-14 rounded-2xl bg-background/80 border border-border/60 flex items-center justify-center shadow-lg backdrop-blur-sm relative z-10">
                  <img
                    src={partner.logoUrl}
                    alt={partner.logoAlt}
                    className="w-9 h-9 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                {/* Category pill */}
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${partner.accent} bg-current/10 px-2 py-0.5 rounded-full`}
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                  {partner.category}
                </span>

                <h3 className="font-display font-bold text-base mt-2 mb-0.5 group-hover:text-primary transition-colors leading-tight">
                  {partner.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {partner.tagline}
                </p>

                {/* Domain link */}
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${partner.accent} hover:underline`}
                >
                  <ExternalLink className="w-3 h-3" />
                  {partner.domain}
                </a>

                {/* Instagram */}
                {"instagram" in partner && partner.instagram && (
                  <a
                    href={partner.instagram as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#E4405F] transition-colors mt-2"
                  >
                    <Instagram className="w-3 h-3" />
                    Instagram
                  </a>
                )}

                {/* Verified checkmark */}
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border/50">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] text-muted-foreground">Verified Partner</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 lg:gap-12"
        >
          {[
            { value: "50+", label: "Businesses Served" },
            { value: "4+", label: "Verified Partners" },
            { value: "Kenya", label: "& East Africa" },
            { value: "24/7", label: "Active Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
