"use client"
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowRight, MapPin, Users, Waves, Clock, Square, Users2, Star, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
  detailedDescription: string;
  capacity: string;
  area: string;
  features: string[];
  pricing?: string;
  additionalImages?: any[];
}

export function GalleryPreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      additionalImages: [adventure1, adventure2]
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
      additionalImages: [outdoor1, turf]
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
      additionalImages: [adventure2, adventure1]
    }
  ];

  // Handle URL parameter to show specific item
  useEffect(() => {
    const itemId = searchParams?.get('item');
    if (itemId) {
      const item = galleryItems.find(galleryItem => galleryItem.id === itemId);
      if (item) {
        setSelectedItem(item);
        setCurrentImageIndex(0);
      }
    }
  }, [searchParams]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem && selectedItem.additionalImages) {
      setCurrentImageIndex((prev) => 
        prev === selectedItem.additionalImages!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem && selectedItem.additionalImages) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.additionalImages!.length - 1 : prev - 1
      );
    }
  };

  if (selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50">
        {/* Back Button */}
        <div className="pt-20 pb-4">
          <div className="container mx-auto px-4">
            <motion.button
              onClick={() => setSelectedItem(null)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              whileHover={{ x: -4 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Gallery</span>
            </motion.button>
          </div>
        </div>

        {/* Selected Item Detail */}
        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery Section */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-2xl shadow-xl">
              {/* Main Image */}
              <div className="relative h-[400px] lg:h-[600px]">
                <ImageWithFallback
                  src={selectedItem.additionalImages ? selectedItem.additionalImages[currentImageIndex] : selectedItem.image}
                  alt={selectedItem.title}
                  width={600}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover"
                  quality={75}
                />
                
                {/* Image Navigation */}
                {selectedItem.additionalImages && selectedItem.additionalImages.length > 1 && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                      </motion.button>
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      {selectedItem.additionalImages.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex 
                              ? 'bg-white scale-125 shadow-lg' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="py-8 lg:py-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-100 rounded-full p-3">
                    {selectedItem.icon}
                  </div>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                    {selectedItem.category}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {selectedItem.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  {selectedItem.detailedDescription}
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-4 p-6 bg-white/80 rounded-2xl shadow-md">
                  <Users2 className="w-6 h-6 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Capacity</p>
                    <p className="text-lg font-bold text-gray-900">{selectedItem.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-6 bg-white/80 rounded-2xl shadow-md">
                  <Square className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Area</p>
                    <p className="text-lg font-bold text-gray-900">{selectedItem.area}</p>
                  </div>
                </div>
                {selectedItem.pricing && (
                  <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-md col-span-1 sm:col-span-2">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Pricing</p>
                      <p className="text-lg font-bold text-green-700">{selectedItem.pricing}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedItem.features.map((feature: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-white/60 rounded-xl"
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white hover:shadow-2xl transition-all duration-300 py-4 px-8 text-lg font-semibold rounded-2xl"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Book Now
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/resort/gallery">
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-blue-300 text-blue-700 hover:bg-blue-50 py-4 px-8 text-lg font-semibold rounded-2xl"
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      View All Venues
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Explore Our Beautiful Resort
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            From stunning waterfalls to sprawling lawns and exciting play zones, every corner of our resort is designed to create unforgettable memories
          </p>
        </motion.div>

        {/* Main Gallery Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {galleryItems.map((itemData, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onClick={() => handleItemClick(itemData)}
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
          ))}
        </motion.div>

        {/* Additional Gallery Items Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            gateSchoolTrip,
            diamondHallWedding,
            turf,
            diamond2
          ].map((image, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
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
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-center"
        >
          <p className="text-gray-600 mb-6 text-lg">Discover more stunning views and exciting activities</p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/resort/gallery">
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
