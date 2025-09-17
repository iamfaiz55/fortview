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
  pricing?: string;
  additionalImages?: StaticImageData[];
  rating?: number;
  duration?: string;
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
          if (selectedImage.additionalImages && selectedImage.additionalImages.length > 0) {
            const currentIndex = selectedImage.additionalImages.findIndex(
              img => img.src === selectedImage.image.src
            );
            if (currentIndex > 0) {
              setSelectedImage(prev => prev ? {
                ...prev,
                image: selectedImage.additionalImages![currentIndex - 1]
              } : prev);
            }
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          // Navigate to next thumbnail if available
          if (selectedImage.additionalImages && selectedImage.additionalImages.length > 0) {
            const currentIndex = selectedImage.additionalImages.findIndex(
              img => img.src === selectedImage.image.src
            );
            if (currentIndex < selectedImage.additionalImages.length - 1) {
              setSelectedImage(prev => prev ? {
                ...prev,
                image: selectedImage.additionalImages![currentIndex + 1]
              } : prev);
            }
          }
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
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-7xl w-full h-[95vh] p-0 overflow-hidden bg-black/95 backdrop-blur-sm border-0">
          <AnimatePresence mode="wait">
            {selectedImage && (
              <>
                {/* Accessibility Title and Description - Hidden visually but available to screen readers */}
                <DialogTitle className="sr-only">
                  {selectedImage.title} - {selectedImage.category}
          </DialogTitle>
                <DialogDescription className="sr-only">
                  {selectedImage.detailedDescription}. Capacity: {selectedImage.capacity}. Area: {selectedImage.area}.
                  {selectedImage.duration && ` Duration: ${selectedImage.duration}.`}
                  {selectedImage.pricing && ` Pricing: ${selectedImage.pricing}.`}
                </DialogDescription>

            <div className="relative w-full h-full flex flex-col">
                  {/* Close Button */}
                  <button
                onClick={closeModal}
                    className="absolute top-6 right-6 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all duration-300 border border-white/20"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="flex-1 flex flex-col">
                      {/* Main Image */}
                      <div className="flex-1 flex items-center justify-center bg-black/90 relative min-h-[50vh] lg:min-h-full">
                        <div className="relative max-h-full max-w-full p-4">
                          <ImageWithFallback
                            src={selectedImage.image}
                            alt={selectedImage.title}
                            width={1200}
                            height={800}
                            className="w-auto h-auto max-h-[60vh] lg:max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                            quality={75}
                            priority
                          />
                        </div>
              </div>

              {/* Thumbnails */}
              {selectedImage.additionalImages && selectedImage.additionalImages.length > 0 && (
                        <div className="flex overflow-x-auto gap-4 py-4 px-6 bg-black/80 scrollbar-hide border-t border-white/10">
                          <div className="flex gap-4 min-w-max">
                            {selectedImage.additionalImages.map((thumb, idx) => (
                              <button
                                key={`${selectedImage.id}-thumb-${idx}`}
                                onClick={() =>
                                  setSelectedImage((prev) =>
                                    prev ? { ...prev, image: thumb } : prev
                                  )
                                }
                                className={`relative flex-shrink-0 w-24 h-16 lg:w-32 lg:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                  selectedImage.image.src === thumb.src
                                    ? "border-emerald-500"
                                    : "border-transparent hover:border-white/50"
                                }`}
                                aria-label={`View thumbnail ${idx + 1} of ${selectedImage.title}`}
                              >
                                <ImageWithFallback
                                  src={thumb}
                                  alt={`Thumbnail ${idx + 1}`}
                                  fill
                                  sizes="(max-width: 1024px) 96px, 128px"
                                  className="object-cover"
                                  quality={75}
                                />
                              </button>
                  ))}
                          </div>
                </div>
              )}
                    </div>

                    {/* Details Panel */}
                    <div className="w-full lg:w-96 bg-gradient-to-b from-black/95 via-black/90 to-black/95 p-6 lg:p-8 overflow-y-auto">
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-3">
                            <div className="text-emerald-400">{selectedImage.icon}</div>
                  <div>
                              <h2 className="text-2xl font-bold text-white mb-2">
                                {selectedImage.title}
                              </h2>
                              <span className="text-sm text-gray-300 bg-emerald-500/20 px-3 py-1 rounded-full">
                                {selectedImage.category}
                              </span>
                            </div>
                  </div>
                  {selectedImage.rating && (
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-5 h-5 fill-current" />
                      <span className="font-semibold">{selectedImage.rating}</span>
                    </div>
                  )}
                </div>
                
                        {/* Description */}
                    <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                          <p className="text-gray-200 leading-relaxed">
                            {selectedImage.detailedDescription}
                          </p>
                    </div>
                        
                        {/* Details Grid */}
                    <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Details</h3>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white/10 rounded-lg p-4">
                              <div className="text-emerald-400 text-sm font-medium mb-1">Capacity</div>
                              <div className="text-white font-semibold">{selectedImage.capacity}</div>
                    </div>
                            <div className="bg-white/10 rounded-lg p-4">
                              <div className="text-emerald-400 text-sm font-medium mb-1">Area</div>
                              <div className="text-white font-semibold">{selectedImage.area}</div>
                  </div>
                  {selectedImage.duration && (
                              <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-emerald-400 text-sm font-medium mb-1">Duration</div>
                                <div className="text-white font-semibold">{selectedImage.duration}</div>
                      </div>
                            )}
                            {selectedImage.pricing && (
                              <div className="bg-white/10 rounded-lg p-4">
                                <div className="text-emerald-400 text-sm font-medium mb-1">Pricing</div>
                                <div className="text-white font-semibold">{selectedImage.pricing}</div>
                    </div>
                  )}
                </div>
                </div>

                        {/* Features */}
                  <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                          <div className="flex flex-wrap gap-2">
                      {selectedImage.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="bg-emerald-500/20 text-emerald-300 px-3 py-2 rounded-full text-sm font-medium"
                              >
                          {feature}
                              </span>
                      ))}
                          </div>
                        </div>
                  </div>
                    </div>
                  </div>
                </div>
              </>
          )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}