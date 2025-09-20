"use client"
import { motion } from "framer-motion";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";

// Only import 3 essential images for initial load to reduce bundle size
import img1 from "@/gallery/1.jpg";
import img2 from "@/gallery/2.jpg";
import img3 from "@/gallery/3.jpg";

// All images as lazy-loaded strings for better performance
const allImages = [
  { src: "/gallery/1.jpg", category: "General Resort Views" },
  { src: "/gallery/2.jpg", category: "General Resort Views" },
  { src: "/gallery/3.jpg", category: "General Resort Views" },
  { src: "/gallery/4.jpg", category: "General Resort Views" },
  { src: "/gallery/5.jpg", category: "General Resort Views" },
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
  { src: "/gallery/adventure-1.jpg", category: "Adventure & Activities" },
  { src: "/gallery/adventure-2.jpg", category: "Adventure & Activities" },
  { src: "/gallery/adventure-3.jpg", category: "Adventure & Activities" },
  { src: "/gallery/adventure-4.jpg", category: "Adventure & Activities" },
  { src: "/gallery/turf.jpg", category: "Resort Grounds" },
  { src: "/gallery/turf-2.jpg", category: "Resort Grounds" },
  { src: "/gallery/silver-lawns.jpg", category: "Resort Grounds" },
  { src: "/gallery/outdoor-game-1.jpg", category: "Adventure & Activities" },
  { src: "/gallery/soft-play-1.jpg", category: "Family & Kids" },
  { src: "/gallery/room-1.jpg", category: "Accommodations" },
  { src: "/gallery/room-2.jpg", category: "Accommodations" },
  { src: "/gallery/room-3.jpg", category: "Accommodations" },
  { src: "/gallery/woody-restaurant-top.jpg", category: "Dining" },
  { src: "/gallery/woody-restaurant-1.jpg", category: "Dining" },
  { src: "/gallery/woody-restaurant-2.jpg", category: "Dining" },
  { src: "/gallery/gate-school-trip.jpg", category: "Events & Celebrations" },
  { src: "/gallery/diamond-hall.jpg", category: "Events & Celebrations" },
  { src: "/gallery/diamond-hall-wedding.jpg", category: "Events & Celebrations" },
  { src: "/gallery/diamond-2.jpg", category: "Events & Celebrations" },
  { src: "/gallery/day-wedding-setup.jpg", category: "Events & Celebrations" },
  { src: "/gallery/night-wedding.jpg", category: "Events & Celebrations" },
  { src: "/gallery/night-wedding-2.jpg", category: "Events & Celebrations" },
  { src: "/gallery/hoorda-party.jpg", category: "Events & Celebrations" },
  { src: "/gallery/food-stall.jpg", category: "Dining" },
  { src: "/gallery/burd-zone.jpg", category: "Family & Kids" },
  { src: "/gallery/antakshiri.jpg", category: "Events & Celebrations" },
];

// Start with only 6 images for faster initial load
const initialImages = allImages.slice(0, 6);

export function GalleryPageOptimized() {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadedCount, setLoadedCount] = useState(6);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  // Get all unique categories from all images, not just loaded ones
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(allImages.map(img => img.category))];
    return cats;
  }, []);

  // Filter all images by category, then slice to loaded count
  const filteredImages = useMemo(() => {
    const filtered = selectedCategory === "All" 
      ? allImages 
      : allImages.filter(img => img.category === selectedCategory);
    return filtered.slice(0, loadedCount);
  }, [selectedCategory, loadedCount]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && loadedCount < allImages.length) {
          loadMoreImages();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, loadedCount]);

  const loadMoreImages = useCallback(() => {
    if (isLoadingMore || loadedCount >= allImages.length) return;
    
    setIsLoadingMore(true);
    // Load 6 more images at a time for better performance
    setTimeout(() => {
      setLoadedCount(prev => Math.min(prev + 6, allImages.length));
      setIsLoadingMore(false);
    }, 200);
  }, [isLoadingMore, loadedCount]);

  // Simplified animations for better performance
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.01 } }
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0, transition: { duration: 0.15 } }
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

        {/* Images Masonry - Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]"
        >
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => {
              const aspectClass =
                index % 6 === 0 ? "aspect-[3/4]" :
                index % 6 === 1 ? "aspect-[4/3]" :
                index % 6 === 2 ? "aspect-[1/1]" :
                index % 6 === 3 ? "aspect-[2/3]" :
                index % 6 === 4 ? "aspect-[5/4]" :
                                  "aspect-[4/5]";

              return (
                <div
                  key={`${image.src}-${index}`}
                  className="mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 group"
                >
                  <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                    <Image
                      src={image.src}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No images found for the selected category.
            </div>
          )}
        </motion.div>


        {/* Load More Button - Optimized */}
        {loadedCount < allImages.length && (
          <div className="text-center mt-8">
            <button
              ref={loadMoreRef}
              onClick={loadMoreImages}
              disabled={isLoadingMore}
              className="px-6 py-3 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoadingMore ? "Loading..." : "Load More Images"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
