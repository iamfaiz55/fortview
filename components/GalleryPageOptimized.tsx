"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useMemo } from "react";

// Only import essential images for initial load
import img1 from "@/gallery/1.jpg";
import img2 from "@/gallery/2.jpg";
import img3 from "@/gallery/3.jpg";
import img4 from "@/gallery/4.jpg";
import img5 from "@/gallery/5.jpg";
import adventure1 from "@/gallery/adventure-1.jpg";
import adventure2 from "@/gallery/adventure-2.jpg";
import diamondHall from "@/gallery/diamond-hall.jpg";
import diamondWedding from "@/gallery/diamond-hall-wedding.jpg";
import silverLawns from "@/gallery/silver-lawns.jpg";
import turf from "@/gallery/turf.jpg";

// Lazy load other images
const lazyImages = [
  { src: "/gallery/6.jpg", category: "General Resort Views" },
  { src: "/gallery/7.jpg", category: "General Resort Views" },
  { src: "/gallery/8.jpg", category: "General Resort Views" },
  { src: "/gallery/9.jpg", category: "General Resort Views" },
  { src: "/gallery/10.jpg", category: "General Resort Views" },
  { src: "/gallery/12.jpg", category: "General Resort Views" },
  { src: "/gallery/13.jpg", category: "General Resort Views" },
  { src: "/gallery/14.jpg", category: "General Resort Views" },
  { src: "/gallery/16.jpg", category: "General Resort Views" },
  { src: "/gallery/17.jpg", category: "General Resort Views" },
  { src: "/gallery/18.jpg", category: "General Resort Views" },
  { src: "/gallery/19.jpg", category: "General Resort Views" },
  { src: "/gallery/20.jpg", category: "General Resort Views" },
  { src: "/gallery/21.jpg", category: "General Resort Views" },
  { src: "/gallery/22.jpg", category: "General Resort Views" },
  { src: "/gallery/24.jpg", category: "General Resort Views" },
  { src: "/gallery/26.jpg", category: "General Resort Views" },
  { src: "/gallery/27.jpg", category: "General Resort Views" },
  { src: "/gallery/adventure-3.jpg", category: "Adventure & Activities" },
  { src: "/gallery/adventure-4.jpg", category: "Adventure & Activities" },
  { src: "/gallery/turf-2.jpg", category: "Resort Grounds" },
  { src: "/gallery/outdoor-game-1.jpg", category: "Adventure & Activities" },
  { src: "/gallery/soft-play-1.jpg", category: "Family & Kids" },
  { src: "/gallery/room-1.jpg", category: "Accommodations" },
  { src: "/gallery/room-2.jpg", category: "Accommodations" },
  { src: "/gallery/room-3.jpg", category: "Accommodations" },
  { src: "/gallery/woody-restaurant-top.jpg", category: "Dining" },
  { src: "/gallery/woody-restaurant-1.jpg", category: "Dining" },
  { src: "/gallery/woody-restaurant-2.jpg", category: "Dining" },
  { src: "/gallery/gate-school-trip.jpg", category: "Events & Celebrations" },
  { src: "/gallery/diamond-2.jpg", category: "Events & Celebrations" },
  { src: "/gallery/day-wedding-setup.jpg", category: "Events & Celebrations" },
  { src: "/gallery/night-wedding.jpg", category: "Events & Celebrations" },
  { src: "/gallery/night-wedding-2.jpg", category: "Events & Celebrations" },
  { src: "/gallery/hoorda-party.jpg", category: "Events & Celebrations" },
  { src: "/gallery/food-stall.jpg", category: "Dining" },
  { src: "/gallery/burd-zone.jpg", category: "Family & Kids" },
  { src: "/gallery/antakshiri.jpg", category: "Events & Celebrations" },
];

const initialImages = [
  { img: adventure1, category: "Adventure & Activities" },
  { img: adventure2, category: "Adventure & Activities" },
  { img: diamondHall, category: "Events & Celebrations" },
  { img: diamondWedding, category: "Events & Celebrations" },
  { img: silverLawns, category: "Resort Grounds" },
  { img: turf, category: "Resort Grounds" },
  { img: img1, category: "General Resort Views" },
  { img: img2, category: "General Resort Views" },
  { img: img3, category: "General Resort Views" },
  { img: img4, category: "General Resort Views" },
  { img: img5, category: "General Resort Views" },
];

export function GalleryPageOptimized() {
  const [loadedImages, setLoadedImages] = useState(initialImages);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(loadedImages.map(img => img.category))];
    return cats;
  }, [loadedImages]);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") return loadedImages;
    return loadedImages.filter(img => img.category === selectedCategory);
  }, [loadedImages, selectedCategory]);

  const loadMoreImages = async () => {
    setIsLoadingMore(true);
    // Simulate loading more images
    setTimeout(() => {
      const newImages = lazyImages.slice(0, 10).map(img => ({
        img: img.src,
        category: img.category
      }));
      setLoadedImages(prev => [...prev, ...newImages]);
      setIsLoadingMore(false);
    }, 500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.03 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4 }} 
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our resort through stunning visuals of our facilities, activities, and memorable moments.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.4, delay: 0.1 }} 
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Images Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredImages.map((image, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              whileHover={{ scale: 1.02 }} 
              className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={image.img}
                  alt={`Gallery image ${index + 1}`}
                  width={300}
                  height={300}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={80}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {loadedImages.length < lazyImages.length + initialImages.length && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.4, delay: 0.3 }} 
            className="text-center mt-8"
          >
            <button
              onClick={loadMoreImages}
              disabled={isLoadingMore}
              className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoadingMore ? "Loading..." : "Load More Images"}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
