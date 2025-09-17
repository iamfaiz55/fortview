"use client"
import { Button } from "./ui/button";
import { Calendar, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import slide1 from "@/gallery/14.jpg";
import slide2 from "@/gallery/17.1.jpg";
import slide3 from "@/gallery/18-1.jpg";

export function HeroSection() {
  const slides = [
    { image: slide1, title: "Adventure Awaits at Every Turn", desc: "Zorbing, rain dance, zipline and more—embrace nature and thrill." },
    { image: slide2, title: "Family Fun & Kids Activities", desc: "Safe, colorful experiences designed for unforgettable family time." },
    { image: slide3, title: "Signature Dining & Evenings", desc: "Savor curated menus with views across our scenic landscape." },
  ];

  // Debug: Log the slide3 image to check if it's loading
  console.log('Slide3 image:', slide3);

  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative h-screen w-full">
        <Carousel className="h-full w-full" setApi={setApi} opts={{ loop: true, duration: 25, dragFree: true }}>
          <CarouselContent className="h-full">
            {slides.map((s, i) => (
              <CarouselItem key={i} className="h-full w-full">
                <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <ImageWithFallback 
                      src={s.image} 
                      alt={s.title} 
                      fill
                      priority={i === 0}
                      sizes="100vw"
                      className="w-full h-full object-cover object-center" 
                      quality={90}
                      style={{ 
                        objectPosition: 'center center',
                        objectFit: 'cover'
                      }}
                    />
                    {/* Dark overlay for better text contrast */}
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  
                  {/* Centered Content */}
                  <motion.div
                    key={`panel-${i}-${current}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative z-10 max-w-5xl mx-4 sm:mx-auto text-center"
                  >
                    <motion.h2
                      key={`title-${i}-${current}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 }}
                      className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                      {s.title}
                    </motion.h2>
                    <motion.p
                      key={`desc-${i}-${current}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.35 }}
                      className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                      {s.desc}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.45 }}
                      className="flex flex-wrap items-center justify-center gap-4 relative z-10"
                    >
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg text-lg px-8 py-3"
                      >
                        <Calendar className="w-5 h-5 mr-2" /> Book Your Stay
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline" 
                        className="bg-white/80 backdrop-blur border-white text-gray-800 hover:bg-white hover:text-gray-900 text-lg px-8 py-3 font-semibold"
                      >
                        <Phone className="w-5 h-5 mr-2" /> Call Us
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Floating navigate button */}
                  <motion.button
                    onClick={() => {
                      const el = document.getElementById("gallery");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-6 py-3 rounded-full bg-white/90 backdrop-blur border border-white/70 shadow-lg hover:bg-white text-emerald-700 text-sm font-medium transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Gallery ↓
                  </motion.button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}