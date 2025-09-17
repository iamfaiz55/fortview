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
  // console.log('Slide3 image:', slide3);

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
        <Carousel
          className="h-full w-full"
          setApi={setApi}
          opts={{ loop: true, duration: 25, dragFree: true }}
        >
       <CarouselContent className="h-full">
  {slides.map((s, i) => (
    <CarouselItem key={i} className="h-full w-full">
      <div className="relative h-screen w-full flex items-end justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback 
            src={s.image} 
            alt={s.title} 
            fill
            priority={i === 0}
            sizes="100vw"
            className="w-full h-full object-cover object-center sm:object-cover max-sm:object-contain bg-black" 
            quality={75}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* Content */}
        <motion.div
          key={`panel-${i}-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 max-w-3xl mx-3 sm:mx-auto text-center mb-6 sm:mb-18"
        >
          <motion.h2
            key={`title-${i}-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-2 sm:mb-3 leading-snug"
          >
            {s.title}
          </motion.h2>
          <motion.p
            key={`desc-${i}-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-xs sm:text-sm md:text-base text-white/90 mb-3 sm:mb-4 max-w-xl mx-auto leading-tight px-2"
          >
            {s.desc}
          </motion.p>

          {/* Small Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 relative z-10 px-1 mb-5 sm:mb-5"
          >
            <Button 
              size="sm"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 
                shadow-sm text-[9px] sm:text-[10px] md:text-xs 
                px-2 sm:px-3 py-0.5 sm:py-1 w-full sm:w-auto"
            >
              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> Book Your Stay
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              className="bg-white/80 backdrop-blur border-white text-gray-800 hover:bg-white hover:text-gray-900 
                text-[9px] sm:text-[10px] md:text-xs 
                px-2 sm:px-3 py-0.5 sm:py-1 font-semibold w-full sm:w-auto"
            >
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> Call Us
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating navigate button slightly higher */}
        <motion.button
          onClick={() => {
            const el = document.getElementById("gallery");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 
            px-4 sm:px-5 py-1 sm:py-2 rounded-full 
            bg-white/90 backdrop-blur border border-white/60 shadow-md 
            hover:bg-white text-emerald-700 text-[10px] sm:text-xs font-medium 
            transition-all duration-300 hover:scale-105"
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