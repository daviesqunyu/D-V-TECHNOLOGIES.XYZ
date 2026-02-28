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
    text: "D&V Technologies transformed our IT infrastructure completely. Their expertise in AI and cloud solutions helped us scale our operations seamlessly. Highly professional team!",
    avatar: "JK",
  },
  {
    id: 2,
    name: "Grace Wanjiku",
    role: "Operations Manager, Safaricom Dealer",
    location: "Mombasa, Kenya",
    rating: 5,
    text: "Working with D&V has been a game-changer for our business. They fixed our network issues and set up a robust security system. Plus, accepting M-Pesa payments made everything easier!",
    avatar: "GW",
  },
  {
    id: 3,
    name: "David Ochieng",
    role: "Founder, Kisumu Innovation Hub",
    location: "Kisumu, Kenya",
    rating: 5,
    text: "The AI solutions they provided are exactly what we needed to stay competitive in the Silicon Savannah ecosystem. Their support team is always responsive and professional.",
    avatar: "DO",
  },
  {
    id: 4,
    name: "Mercy Akinyi",
    role: "Director, Eldoret Medical Centre",
    location: "Eldoret, Kenya",
    rating: 5,
    text: "D&V Technologies helped us digitize our patient records and implement a secure IT system. Their attention to detail and commitment to quality is outstanding!",
    avatar: "MA",
  },
  {
    id: 5,
    name: "Peter Mwangi",
    role: "IT Manager, Nakuru Trading Co.",
    location: "Nakuru, Kenya",
    rating: 5,
    text: "Best tech partner we've ever worked with! From hardware repairs to software development, they handle everything professionally. The Bitcoin payment option is a nice touch too.",
    avatar: "PM",
  },
  {
    id: 6,
    name: "Sarah Njeri",
    role: "Co-Founder, Thika StartupHub",
    location: "Thika, Kenya",
    rating: 5,
    text: "D&V Technologies delivered beyond our expectations. Their IoT solutions and digital transformation services positioned us for growth. True Silicon Savannah pioneers!",
    avatar: "SN",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-24 py-20 lg:py-32 bg-background relative overflow-hidden">
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <span className="font-display font-bold text-white text-sm">
                            {testimonial.avatar}
                          </span>
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
