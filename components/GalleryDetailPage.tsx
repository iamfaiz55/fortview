"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, Users2, Square, Star, MapPin, Clock, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import adventure1 from "@/gallery/adventure-1.jpg"
import adventure2 from "@/gallery/adventure-2.jpg"
import outdoor1 from "@/gallery/outdoor-game-1.jpg"
import turf from "@/gallery/turf.jpg"
import diamondHallWedding from "@/gallery/diamond-hall-wedding.jpg"
import diamond2 from "@/gallery/diamond-2.jpg"
import gateSchoolTrip from "@/gallery/gate-school-trip.jpg"

interface GalleryDetailData {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  capacity: string;
  area: string;
  features: string[];
  pricing: string;
  images: any[];
  icon: React.ReactNode;
  location: string;
  duration?: string;
  included?: string[];
}

const galleryDetails: { [key: string]: GalleryDetailData } = {
  "majestic-waterfalls": {
    id: "majestic-waterfalls",
    title: "Majestic Waterfalls",
    category: "Natural Attractions",
    description: "Natural beauty that takes your breath away",
    detailedDescription: "Experience the breathtaking beauty of our natural waterfalls surrounded by lush tropical vegetation. This stunning natural attraction creates a perfect backdrop for photos and provides a peaceful retreat for guests seeking tranquility. The cascading water creates a soothing ambiance while the surrounding flora adds to the natural charm.",
    capacity: "50-100 people",
    area: "2,500 sq ft",
    features: [
      "Natural Rock Formation",
      "Tropical Vegetation",
      "Photo Opportunities",
      "Peaceful Ambiance",
      "Walking Trails",
      "Seating Areas"
    ],
    pricing: "Included with resort stay",
    images: [adventure1, adventure2, outdoor1],
    icon: "🌊",
    location: "Central Resort Area",
    duration: "30-60 minutes",
    included: ["Guided Tours", "Photography Sessions", "Refreshments"]
  },
  "lush-green-lawns": {
    id: "lush-green-lawns",
    title: "Lush Green Lawns",
    category: "Resort Grounds",
    description: "Perfect for outdoor events and relaxation",
    detailedDescription: "Our meticulously maintained green lawns offer the perfect setting for outdoor events, picnics, and relaxation. With panoramic views of the surrounding landscape, these spacious grounds provide an ideal venue for weddings, corporate events, and family gatherings. The well-manicured grass and beautiful landscaping create an elegant outdoor atmosphere.",
    capacity: "200-500 people",
    area: "15,000 sq ft",
    features: [
      "Well-Maintained Grass",
      "Panoramic Views",
      "Event Setup Available",
      "Outdoor Seating",
      "Lighting for Evening Events",
      "Audio/Visual Equipment"
    ],
    pricing: "Starting from $2,500 per event",
    images: [outdoor1, turf, diamondHallWedding],
    icon: "🌿",
    location: "Main Resort Grounds",
    duration: "2-8 hours",
    included: ["Event Planning", "Setup & Cleanup", "Catering Options"]
  },
  "kids-adventure-zone": {
    id: "kids-adventure-zone",
    title: "Kids' Adventure Zone",
    category: "Family Activities",
    description: "Safe and exciting play areas for children",
    detailedDescription: "A dedicated safe space designed specifically for children to play, explore, and have fun. Our adventure zone features age-appropriate equipment, soft play areas, and supervised activities that ensure both safety and entertainment for young guests. The colorful and engaging environment encourages creativity and physical activity.",
    capacity: "30-50 children",
    area: "3,000 sq ft",
    features: [
      "Age-Appropriate Equipment",
      "Soft Play Areas",
      "Supervised Activities",
      "Safety First",
      "Interactive Games",
      "Learning Stations"
    ],
    pricing: "Included with family packages",
    images: [adventure2, adventure1, gateSchoolTrip],
    icon: "🎪",
    location: "Family Activity Center",
    duration: "1-4 hours",
    included: ["Child Supervision", "Safety Equipment", "Snacks & Drinks"]
  }
};

interface GalleryDetailPageProps {
  itemId: string;
  onBack: () => void;
}

export function GalleryDetailPage({ itemId, onBack }: GalleryDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const item = galleryDetails[itemId];
  
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h1>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Gallery</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-full p-2 text-xl">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {item.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {item.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            {item.detailedDescription}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl bg-white">
              <ImageWithFallback
                src={item.images[currentImageIndex]}
                alt={`${item.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {item.images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </motion.button>
                </>
              )}

              {/* Image Counter */}
              {item.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {item.images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {item.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-xl transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'ring-4 ring-blue-500 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${item.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <Users2 className="w-6 h-6 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">Capacity</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{item.capacity}</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <Square className="w-6 h-6 text-green-500" />
                  <h3 className="font-semibold text-gray-900">Area</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{item.area}</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="w-6 h-6 text-purple-500" />
                  <h3 className="font-semibold text-gray-900">Location</h3>
                </div>
                <p className="text-lg font-semibold text-gray-900">{item.location}</p>
              </div>
              
              {item.duration && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="w-6 h-6 text-orange-500" />
                    <h3 className="font-semibold text-gray-900">Duration</h3>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{item.duration}</p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <h3 className="font-semibold text-gray-900">Pricing</h3>
              </div>
              <p className="text-2xl font-bold text-green-700">{item.pricing}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {item.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Included Items */}
            {item.included && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 gap-3">
                  {item.included.map((includedItem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-700">{includedItem}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white hover:shadow-2xl transition-all duration-300 py-4 px-8 text-lg font-semibold rounded-2xl"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Book This Venue
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1"
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 py-4 px-8 text-lg font-semibold rounded-2xl"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Venues
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

