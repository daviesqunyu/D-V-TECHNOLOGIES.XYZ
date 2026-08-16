import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const PHOTOS = [
  {
    src: "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "African developer working on a laptop",
    label: "Software Development",
    span: "row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Developer coding",
    label: "Custom Software",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Code on laptop screen",
    label: "Web Applications",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Tech hardware repair",
    label: "Hardware Support",
    span: "row-span-2",
  },
  {
    src: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Network server infrastructure",
    label: "Networking & Cloud",
    span: "",
  },
  {
    src: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Cybersecurity setup",
    label: "Cybersecurity",
    span: "",
  },
];

export function ShowcaseSection() {
  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <ImageIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Work in Action</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Real Work, <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From hardware repairs to AI deployments — here's a glimpse into the kind of
            technology work we deliver daily for African businesses.
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 auto-rows-[220px]">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-border/40 hover:border-primary/40 transition-all ${photo.span}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-sm font-semibold text-white bg-primary/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  {photo.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-2xl overflow-hidden relative h-56 lg:h-72 border border-primary/20"
        >
          <img
            src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="African tech team collaborating in modern office"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent flex items-center">
            <div className="p-8 lg:p-12 max-w-lg">
              <p className="font-display text-2xl lg:text-3xl font-bold mb-2">
                Building the <span className="gradient-text">Silicon Savannah</span>
              </p>
              <p className="text-muted-foreground text-sm lg:text-base">
                Nairobi-based team delivering world-class technology solutions across Kenya
                and East Africa — one project at a time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
