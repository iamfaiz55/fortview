"use client"
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight, MapPin, Users, Waves } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import adventure1 from "@/gallery/adventure-1.jpg"
import adventure2 from "@/gallery/adventure-2.jpg"
import outdoor1 from "@/gallery/outdoor-game-1.jpg"
import gateSchoolTrip from "@/gallery/gate-school-trip.jpg"
import diamondHallWedding from "@/gallery/diamond-hall-wedding.jpg"
import turf from "@/gallery/turf.jpg"
import diamond2 from "@/gallery/diamond-2.jpg"

interface GalleryItem {
  id: string;
  image: any;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

export function GalleryPreviewSimple() {
  const galleryItems: GalleryItem[] = [
    {
      id: "majestic-waterfalls",
      image: adventure1,
      title: "Majestic Waterfalls",
      description: "Natural beauty that takes your breath away",
      icon: <Waves className="w-5 h-5" />,
      category: "Natural Attractions"
    },
    {
      id: "lush-green-lawns",
      image: outdoor1,
      title: "Lush Green Lawns",
      description: "Perfect for outdoor events and relaxation",
      icon: <MapPin className="w-5 h-5" />,
      category: "Resort Grounds"
    },
    {
      id: "kids-adventure-zone",
      image: adventure2,
      title: "Kids' Adventure Zone",
      description: "Safe and exciting play areas for children",
      icon: <Users className="w-5 h-5" />,
      category: "Family Activities"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 as any } }
  } as const;

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } }
  } as const;

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Explore Our Beautiful Resort
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            From stunning waterfalls to sprawling lawns and exciting play zones, every corner of our resort is designed to create unforgettable memories
          </p>
        </motion.div>

        {/* Main Gallery Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.15 }} 
          className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12"
        >
          {galleryItems.map((itemData, index) => (
            <Link key={index} href="/gallery-preview">
              <motion.div 
                variants={item}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={itemData.image}
                    alt={itemData.title}
                    width={400}
                    height={300}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    quality={85}
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-white/20 rounded-full p-1">
                        {itemData.icon}
                      </div>
                      <span className="text-sm font-medium opacity-90">{itemData.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{itemData.title}</h3>
                    <p className="text-sm opacity-90">{itemData.description}</p>
                  </div>
                </div>

                {/* Static Info for Mobile */}
                <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="bg-white/20 rounded-full p-1">
                      {itemData.icon}
                    </div>
                    <span className="text-xs opacity-90">{itemData.category}</span>
                  </div>
                  <h3 className="font-bold">{itemData.title}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Additional Gallery Items Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.2 }} 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12"
        >
          {[
            gateSchoolTrip,
            diamondHallWedding,
            turf,
            diamond2
          ].map((image, index) => (
            <Link key={index} href="/gallery-preview">
              <motion.div 
                variants={item} 
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
              >
                <ImageWithFallback
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={80}
                />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.25 }} 
          transition={{ duration: 0.5 }} 
          className="text-center"
        >
          <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">Discover more stunning views and exciting activities</p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/gallery-preview">
              <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white">
                View Complete Gallery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
