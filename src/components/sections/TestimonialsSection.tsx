import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const TESTIMONIALS = [
  {
    id: 1,
    name: "James Kamau",
    role: "CEO, Nairobi Tech Solutions",
    location: "Nairobi, Kenya",
    rating: 5,
    text: "D&V set up our office network and cloud email properly, then stayed available when something broke. Clear communication and honest timelines.",
    avatar: "JK",
    // African businessman — matches Kenyan male name
    photo: "https://images.pexels.com/photos/4183527/pexels-photo-4183527.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 2,
    name: "Grace Wanjiku",
    role: "Operations Manager, Safaricom Dealer",
    location: "Mombasa, Kenya",
    rating: 5,
    text: "They fixed our Wi-Fi dead zones and installed CCTV after a proper site visit. Paying for support via M-Pesa made billing simple for our team.",
    avatar: "GW",
    // African professional woman
    photo: "https://images.pexels.com/photos/36551042/pexels-photo-36551042.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 3,
    name: "David Ochieng",
    role: "Founder, Kisumu Innovation Hub",
    location: "Kisumu, Kenya",
    rating: 5,
    text: "We needed a website and a WhatsApp assistant for common questions. D&V delivered both, trained our staff, and priced the work upfront.",
    avatar: "DO",
    // African man in suit (Uganda/East Africa stock)
    photo: "https://images.pexels.com/photos/17552348/pexels-photo-17552348.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 4,
    name: "Mercy Akinyi",
    role: "Director, Eldoret Medical Centre",
    location: "Eldoret, Kenya",
    rating: 5,
    text: "They helped us move patient records to a shared system and lock down access. Work was documented and handed over cleanly.",
    avatar: "MA",
    // African woman studio portrait
    photo: "https://images.pexels.com/photos/31307734/pexels-photo-31307734.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 5,
    name: "Peter Mwangi",
    role: "IT Manager, Nakuru Trading Co.",
    location: "Nakuru, Kenya",
    rating: 5,
    text: "Laptop repairs and a small inventory system for our shop. Quotes were clear, and they explained options without pressure.",
    avatar: "PM",
    // African businessman formal portrait
    photo: "https://images.pexels.com/photos/34592823/pexels-photo-34592823.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
  {
    id: 6,
    name: "Sarah Njeri",
    role: "Co-Founder, Thika StartupHub",
    location: "Thika, Kenya",
    rating: 5,
    text: "We engaged them for a business website and hosting. Delivery matched the quote, and support afterwards has been reliable.",
    avatar: "SN",
    // African businesswomen context — use a clear single-subject African woman portrait
    photo: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real feedback from businesses across Kenya who trust us with their technology needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-1">
                    <div className="glass-card rounded-2xl p-6 lg:p-8 h-full flex flex-col hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                      {/* Quote Icon */}
                      <Quote className="w-10 h-10 text-primary/30 mb-4 group-hover:text-primary/50 transition-colors" />
                      
                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-foreground/90 mb-6 flex-grow leading-relaxed">
                        "{testimonial.text}"
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-border">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-primary/30">
                          {testimonial.photo ? (
                            <img
                              src={testimonial.photo}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-display font-bold text-white text-sm">
                              {testimonial.avatar}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-primary">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative static translate-y-0" />
              <CarouselNext className="relative static translate-y-0" />
            </div>
          </Carousel>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            Trusted by <span className="text-primary font-semibold">50+</span> businesses across Kenya
          </p>
        </motion.div>
      </div>
    </section>
  );
}
