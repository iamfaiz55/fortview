"use client"
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Users, Waves, Star, Calendar, Users2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import adventure1 from "@/gallery/adventure-1.jpg"
import adventure2 from "@/gallery/adventure-2.jpg"
import outdoor1 from "@/gallery/outdoor-game-1.jpg"
import gateSchoolTrip from "@/gallery/gate-school-trip.jpg"
import diamondHallWedding from "@/gallery/diamond-hall-wedding.jpg"
import turf from "@/gallery/turf.jpg"
import room1 from "@/gallery/room-1.jpg"
import woodyRestaurant1 from "@/gallery/woody-restaurant-1.jpg"
import { useState, useEffect, useCallback } from "react";
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
  // pricing?: string;
  // additionalImages?: StaticImageData[];
  rating?: number;
  // duration?: string;
}

export function HomeGallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing selectedImage to prevent flicker
    setTimeout(() => setSelectedImage(null), 300);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || !selectedImage) return;

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Navigate to previous thumbnail if available
          
        case 'ArrowRight':
          e.preventDefault();
         
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedImage, closeModal]);

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
        // pricing: "Included with resort stay",
    
        rating: 4.8,
      // duration: "2-3 hours"
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
        // pricing: "Starting from $2,500 per event",
    
        rating: 4.9,
      // duration: "All day"
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
        // pricing: "Included with family packages",
    
        rating: 4.7,
      // duration: "1-2 hours"
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
        // pricing: "Starting from $150 per night",
    
        rating: 4.9,
      // duration: "Overnight"
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
        // pricing: "Starting from $45 per person",
    
        rating: 4.8,
      // duration: "1-2 hours"
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
        // pricing: "Starting from $5,000 per event",
    
        rating: 4.9,
      // duration: "Full day"
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

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group overflow-hidden rounded-3xl shadow-xl cursor-pointer bg-white hover:shadow-2xl transition-all duration-500"
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => handleImageClick(item)}
            >
              {/* Image Container */}
              <div className="aspect-square sm:aspect-[2/1] md:aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  quality={75}
                />
              </div>

              {/* Overlay Info */}
              <div className="absolute bottom-2 left-2 right-2 bg-black/30 rounded-lg p-2 text-white text-xs sm:text-sm">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="truncate">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => (!open ? closeModal() : null)}>
  <DialogContent
    className={`
      w-[min(96vw,1100px)] h-[92vh] p-0
      bg-white text-slate-900
      border border-neutral-200 shadow-2xl
      rounded-xl sm:rounded-2xl
      backdrop-blur-sm
      dark:bg-neutral-900 dark:text-neutral-100 dark:border-white/10
      data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
      data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
    `}
  >
    {selectedImage && (
      <>
        <DialogTitle className="sr-only">
          {selectedImage.title} - {selectedImage.category}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {selectedImage.detailedDescription}. Capacity: {selectedImage.capacity}. Area: {selectedImage.area}.
          {/* {selectedImage.duration && ` Duration: ${selectedImage.duration}.`} */}
          {/* {selectedImage.pricing && ` Pricing: ${selectedImage.pricing}.`} */}
        </DialogDescription>

        {/* Main layout: allow scroll on mobile, contain on desktop */}
        <div className="relative flex h-full w-full flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
          {/* Sticky Close */}
          <button
            onClick={closeModal}
            className="
              sticky top-[max(0.75rem,env(safe-area-inset-top))] self-end z-30 mr-3
              rounded-full p-2 sm:p-3 border
              bg-white/90 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500
              border-neutral-200 shadow-md
              dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white
              transition-all
            "
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* LEFT COLUMN: Image (flex-1) + Thumbnails (shrink-0) */}
          <div className="lg:w-2/3 flex flex-col min-h-0">
            {/* Image canvas */}
            <div
              className="
                relative flex-1 min-h-0
                h-[38vh] sm:h-[48vh] lg:h-auto
                flex items-center justify-center
                bg-neutral-50 px-2 sm:px-4 pb-2
                dark:bg-black/90
              "
            >
              <ImageWithFallback
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1400}
                height={900}
                className="w-auto h-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-xl"
                quality={80}
                priority
              />
            </div>

          
          </div>

          {/* RIGHT PANEL: Header (fixed) + Body (scroll) */}
          <aside
            className="
              lg:w-1/3 min-h-0
              border-t lg:border-t-0 lg:border-l
              border-neutral-200 dark:border-white/10
              bg-gradient-to-b from-white to-neutral-50
              dark:from-neutral-900 dark:to-neutral-900
              p-4 sm:p-6 lg:p-7
              flex flex-col gap-6
            "
          >
            {/* Header stays visible */}
            <header className="flex items-start justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-emerald-600 dark:text-emerald-400">{selectedImage.icon}</div>
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-snug">
                    {selectedImage.title}
                  </h2>
                  <span
                    className="
                      text-xs sm:text-sm
                      text-emerald-700 bg-emerald-50
                      dark:text-emerald-300 dark:bg-emerald-500/20
                      px-2 py-0.5 rounded-full
                    "
                  >
                    {selectedImage.category}
                  </span>
                </div>
              </div>
              {selectedImage.rating && (
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm sm:text-base">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span className="font-semibold">{selectedImage.rating}</span>
                </div>
              )}
            </header>

            {/* Scrollable body – never conflicts with thumbnails */}
            <div className="min-h-0 max-h-full overflow-y-auto pr-1 [&>*+*]:mt-6 mt-2 py-10">
              {/* Description */}
              <section>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 ">Description</h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-200 leading-relaxed ">
                  {selectedImage.detailedDescription}
                </p>
              </section>

              {/* Details */}
              <section>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Details</h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                    <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                      Capacity
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{selectedImage.capacity}</div>
                  </div>
                  <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                    <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                      Area
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{selectedImage.area}</div>
                  </div>
                  {/* {selectedImage.duration && (
                    <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                      <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                        Duration
                      </div>
                      <div className="font-semibold text-sm sm:text-base">{selectedImage.duration}</div>
                    </div>
                  )} */}
                  {/* {selectedImage.pricing && (
                    <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                      <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                        Pricing
                      </div>
                      <div className="font-semibold text-sm sm:text-base">{selectedImage.pricing}</div>
                    </div>
                  )} */}
                </div>
              </section>

              {/* Features */}
              <section>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Features</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedImage.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="
                        px-2 sm:px-3 py-1 sm:py-1.5 rounded-full
                        text-[11px] sm:text-xs font-medium
                        bg-emerald-50 text-emerald-700
                        dark:bg-emerald-500/20 dark:text-emerald-300
                      "
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>





    </section>
  );
}