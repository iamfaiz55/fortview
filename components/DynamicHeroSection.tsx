"use client"
import { Button } from "./ui/button";
import { Calendar, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCarousel, CarouselItem as CarouselItemType } from "@/hooks/useCarousel";

export function DynamicHeroSection() {
  const { carousels, loading, error, fetchCarousels } = useCarousel();
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log('Fetching carousels...');
    fetchCarousels(true); // Only fetch active carousels
  }, []);

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

  // Show loading state
  if (loading) {
    console.log('Loading carousels...');
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative h-screen w-full bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading carousel...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    console.log('Error loading carousels:', error);
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative h-screen w-full bg-red-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load carousel: {error}</p>
            <Button onClick={() => fetchCarousels(true)}>Retry</Button>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (!carousels || carousels.length === 0) {
    console.log('No carousels found:', carousels);
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative h-screen w-full bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No carousel items available</p>
            <Button onClick={() => fetchCarousels(true)}>Retry</Button>
          </div>
        </div>
      </section>
    );
  }

  console.log('Rendering carousel with', carousels.length, 'items');
  
  // Temporary fallback for testing
  if (carousels.length === 0) {
    return (
      <section className="relative min-h-screen overflow-hidden">
        <div className="relative h-screen w-full bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Resort</h1>
            <p className="text-xl md:text-2xl mb-8">Experience luxury and adventure</p>
            <Button className="bg-white text-emerald-700 hover:bg-gray-100">
              Explore Now
            </Button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative h-screen w-full">
        <Carousel
          className="h-full w-full"
          setApi={setApi}
          opts={{ loop: true, duration: 25, dragFree: true }}
        >
          <CarouselContent className="h-full">
            {carousels.map((item: CarouselItemType, i: number) => {
              console.log('Rendering carousel item:', i, item.title, item.desktopImage?.url);
              return (
              <CarouselItem key={item._id} className="h-full w-full">
                <div className="relative h-screen w-full flex items-end justify-center overflow-hidden">
                  {/* Background Image - Responsive */}
                  <div className="absolute inset-0 w-full h-full">
                    {/* Desktop Image */}
                    <div className="hidden sm:block w-full h-full">
                      <ImageWithFallback 
                        src={item.desktopImage.url} 
                        alt={item.title} 
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="w-full h-full object-cover object-center bg-black" 
                        quality={75}
                      />
                    </div>
                    
                    {/* Mobile Image */}
                    <div className="block sm:hidden w-full h-full">
                      <ImageWithFallback 
                        src={item.mobileImage.url} 
                        alt={item.title} 
                        fill
                        priority={i === 0}
                        sizes="100vw"
                        className="w-full h-full object-cover object-center bg-black" 
                        quality={75}
                      />
                    </div>
                    
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
                      {item.title}
                    </motion.h2>
                    <motion.p
                      key={`desc-${i}-${current}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 }}
                      className="text-xs sm:text-sm md:text-base text-white/90 mb-3 sm:mb-4 max-w-xl mx-auto leading-tight px-2"
                    >
                      {item.description}
                    </motion.p>

                    {/* Dynamic Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 relative z-10 px-1 mb-5 sm:mb-5"
                    >
                      {item.buttonText && item.buttonLink ? (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 
                            shadow-sm text-[9px] sm:text-[10px] md:text-xs 
                            px-2 sm:px-3 py-0.5 sm:py-1 w-full sm:w-auto"
                          onClick={() => window.open(item.buttonLink, '_blank')}
                        >
                          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> {item.buttonText}
                        </Button>
                      ) : (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 
                            shadow-sm text-[9px] sm:text-[10px] md:text-xs 
                            px-2 sm:px-3 py-0.5 sm:py-1 w-full sm:w-auto"
                        >
                          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" /> Book Your Stay
                        </Button>
                      )}
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
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
