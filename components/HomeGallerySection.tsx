"use client"
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Users, Waves, Star, Calendar, Users2 } from "lucide-react";
import { motion } from "framer-motion";
import adventure1 from "@/gallery/adventure-1.jpg"
import adventure2 from "@/gallery/adventure-2.jpg"
import outdoor1 from "@/gallery/outdoor-game-1.jpg"
import gateSchoolTrip from "@/gallery/gate-school-trip.jpg"
import diamondHallWedding from "@/gallery/diamond-hall-wedding.jpg"
import turf from "@/gallery/turf.jpg"
import room1 from "@/gallery/room-1.jpg"
import woodyRestaurant1 from "@/gallery/woody-restaurant-1.jpg"
import { useState } from "react";
import type { StaticImageData } from "next/image";

interface GalleryItem {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  detailedDescription: string;
  capacity: string;
  area: string;
  features: string[];
  pricing?: string;
  additionalImages?: StaticImageData[];
  rating?: number;
  duration?: string;
}

export function HomeGallerySection() {
    const [activeId, setActiveId] = useState<string | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "majestic-waterfalls",
      image: adventure1,
      title: "Majestic Waterfalls",
      description: "Natural beauty that takes your breath away",
      icon: <Waves className="w-5 h-5" />,
      category: "Natural Attractions",
      detailedDescription: "Experience the breathtaking beauty of our natural waterfalls surrounded by lush tropical vegetation. This stunning natural attraction creates a perfect backdrop for photos and provides a peaceful retreat for guests seeking tranquility.",
      capacity: "50-100 people",
      area: "2,500 sq ft",
      features: ["Natural Rock Formation", "Tropical Vegetation", "Photo Opportunities", "Peaceful Ambiance"],
      pricing: "Included with resort stay",
      additionalImages: [adventure1, adventure2],
      rating: 4.8,
      duration: "2-3 hours"
    },
    {
      id: "lush-green-lawns",
      image: outdoor1,
      title: "Lush Green Lawns",
      description: "Perfect for outdoor events and relaxation",
      icon: <MapPin className="w-5 h-5" />,
      category: "Resort Grounds",
      detailedDescription: "Our meticulously maintained green lawns offer the perfect setting for outdoor events, picnics, and relaxation. With panoramic views of the surrounding landscape, these spacious grounds provide an ideal venue for weddings, corporate events, and family gatherings.",
      capacity: "200-500 people",
      area: "15,000 sq ft",
      features: ["Well-Maintained Grass", "Panoramic Views", "Event Setup Available", "Outdoor Seating"],
      pricing: "Starting from $2,500 per event",
      additionalImages: [outdoor1, turf],
      rating: 4.9,
      duration: "All day"
    },
    {
      id: "kids-adventure-zone",
      image: adventure2,
      title: "Kids' Adventure Zone",
      description: "Safe and exciting play areas for children",
      icon: <Users className="w-5 h-5" />,
      category: "Family Activities",
      detailedDescription: "A dedicated safe space designed specifically for children to play, explore, and have fun. Our adventure zone features age-appropriate equipment, soft play areas, and supervised activities that ensure both safety and entertainment for young guests.",
      capacity: "30-50 children",
      area: "3,000 sq ft",
      features: ["Age-Appropriate Equipment", "Soft Play Areas", "Supervised Activities", "Safety First"],
      pricing: "Included with family packages",
      additionalImages: [adventure2, adventure1],
      rating: 4.7,
      duration: "1-2 hours"
    },
    {
      id: "luxury-rooms",
      image: room1,
      title: "Luxury Accommodations",
      description: "Elegant rooms with stunning views",
      icon: <Star className="w-5 h-5" />,
      category: "Accommodations",
      detailedDescription: "Experience luxury and comfort in our beautifully designed rooms. Each room offers modern amenities, stunning views of the surrounding landscape, and a perfect blend of comfort and elegance for an unforgettable stay.",
      capacity: "2-4 guests",
      area: "400-600 sq ft",
      features: ["Modern Amenities", "Scenic Views", "Premium Bedding", "Private Balcony"],
      pricing: "Starting from $150 per night",
      additionalImages: [room1, adventure1],
      rating: 4.9,
      duration: "Overnight"
    },
    {
      id: "fine-dining",
      image: woodyRestaurant1,
      title: "Fine Dining Restaurant",
      description: "Culinary excellence in a beautiful setting",
      icon: <Calendar className="w-5 h-5" />,
      category: "Dining",
      detailedDescription: "Indulge in exquisite culinary experiences at our fine dining restaurant. Our expert chefs prepare delicious meals using fresh, locally sourced ingredients, served in an elegant atmosphere with panoramic views.",
      capacity: "80-120 guests",
      area: "2,000 sq ft",
      features: ["Expert Chefs", "Fresh Ingredients", "Elegant Atmosphere", "Wine Selection"],
      pricing: "Starting from $45 per person",
      additionalImages: [woodyRestaurant1, diamondHallWedding],
      rating: 4.8,
      duration: "1-2 hours"
    },
    {
      id: "wedding-venues",
      image: diamondHallWedding,
      title: "Wedding Venues",
      description: "Perfect settings for your special day",
      icon: <Users2 className="w-5 h-5" />,
      category: "Events",
      detailedDescription: "Create unforgettable memories in our stunning wedding venues. From intimate ceremonies to grand celebrations, we provide the perfect backdrop for your special day with professional event planning services.",
      capacity: "100-500 guests",
      area: "5,000-10,000 sq ft",
      features: ["Professional Planning", "Beautiful Decor", "Catering Services", "Photography Spots"],
      pricing: "Starting from $5,000 per event",
      additionalImages: [diamondHallWedding, gateSchoolTrip],
      rating: 4.9,
      duration: "Full day"
    }
  ];


  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Our Resort
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A vibrant collection of attractions and facilities – designed to surprise and delight.
          </p>
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[300px]">
          {galleryItems.map((item, index) => {
            const isLarge = index % 5 === 0;
            const isTall = index % 3 === 0;
            const isWide = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                className={`
                  relative group overflow-hidden rounded-2xl shadow-md cursor-pointer 
                  ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
                  ${isTall ? "md:row-span-2" : ""}
                  ${isWide ? "md:col-span-2" : ""}
                `}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.05,
                  repeat: Infinity,
                  repeatDelay: 12 + index * 2,
                  ease: "easeInOut"
                }}
                onClick={() => {
                  // only for small screens, toggle active
                  if (window.innerWidth < 768) {
                    setActiveId(activeId === item.id ? null : item.id);
                  }
                }}
              >
                {/* Image */}
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Desktop Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t 
                  from-black/60 via-black/10 to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-500 hidden md:block"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                  </div>
                </div>

                {/* Mobile Tap Overlay */}
                {activeId === item.id && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-center p-4 md:hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}