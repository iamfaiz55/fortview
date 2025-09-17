"use client"
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Mountain, Waves, Utensils, Users, Camera, Heart, Space, Sparkles, Zap, Star, X, Clock, MapPin, Users2, ChevronLeft, ChevronRight, LucideOctagonPause, Icon, BarrelIcon, Bike, Flower } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface Activity {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  iconBg: string;
  features: string[];
  detailedDescription: string;
  images: string[];
  duration: string;
  location: string;
  maxParticipants: string;
  included: string[];
  pricing: string;
}

export function ActivitiesSection() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


 
  
  const activities: Activity[] = [
    {
      icon: <Mountain className="w-8 h-8" />,
      title: "Adventure Activities",
      description: "Hiking, zip-line, wall climbing, zorbing, and nature trails",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      features: [
        "Guided Hiking Tours",
        "Zip-lining",
        "Wall Climbing",
        "Zorbing",
        "High Ropes",
        "Adventure Games",
        "Nature Photography",
        "Trekking",
        "Tenting Nights Adventure"
      ],
      detailedDescription:
        "Experience the thrill of adventure in our pristine natural surroundings. Our activities are designed to challenge and excite while ensuring your safety with professional guides and top-quality equipment.",
      images: ["/gallery/adventure-1.jpg","/gallery/adventure-2.jpg","/gallery/adventure-3.jpg","/gallery/adventure-4.jpg"],
      duration: "2-4 hours",
      location: "Mountain Trail & Adventure Zone",
      maxParticipants: "8 people",
      included: ["Professional Guide", "Safety Equipment", "Water & Snacks", "First Aid Kit"],
      pricing: "Starting from $89 per person"
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Water Sports",
      description: "Swimming, water zorbing, and fun water activities",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      features: ["Swimming Pool", "Water Zorbing", "Rain Dance"],
      detailedDescription:
        "Dive into crystal-clear waters and enjoy a variety of water-based activities. From peaceful swims to exciting water zorbing, our facilities offer something for every water enthusiast.",
      images: ["/gallery/water-1.jpg","/gallery/water-2.jpg","/gallery/water-3.jpg","/gallery/water-4.jpg"],
      duration: "1-3 hours",
      location: "Resort Lake & Swimming Pool",
      maxParticipants: "12 people",
      included: ["Water Equipment", "Life Jackets", "Changing Facilities", "Towel Service"],
      pricing: "Starting from $65 per person"
    },
    {
      icon: <Flower className="w-8 h-8" />,
      title: "Wellness & Spa",
      description: "Relaxation, massage therapy, and holistic wellness programs",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      features: ["Spa Treatments", "Yoga Classes", "Meditation", "Wellness Programs", "Panchakarma"],
      detailedDescription:
        "Rejuvenate your mind, body, and soul in our tranquil wellness sanctuary. Experience world-class spa treatments, guided meditation, and yoga sessions in a peaceful environment.",
      images: ["/gallery/spa-1.jpg","/gallery/spa-2.jpg","/gallery/spa-3.jpg","/gallery/spa-4.jpg"],
      duration: "1-3 hours",
      location: "Wellness Center & Spa",
      maxParticipants: "6 people",
      included: ["Luxury Robes", "Aromatherapy", "Herbal Teas", "Relaxation Lounge"],
      pricing: "Starting from $150 per person"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Activities",
      description: "Kid-friendly activities and family entertainment",
      color: "from-green-500 to-lime-600",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      features: ["Kids Club", "Family Games", "Indoor Games", "Outdoor Games", "Antakshari", "Keraoke", "Birthday paarties", "Daandiya", "Rangapanchami", "Raksha Bandhan", "Marriage Anniversary ", "GetTogethers", "Reunion"],
      detailedDescription:
        "Create lasting family memories with our specially designed family activities. Safe, fun, and engaging experiences that bring families together for quality time.",
      images: ["/gallery/family-1.jpg","/gallery/family-2.jpg","/gallery/family-3.jpg","/gallery/family-4.jpg"],
      duration: "2-4 hours",
      location: "Family Activity Center",
      maxParticipants: "20 people",
      included: ["Child Supervision", "Safety Equipment", "Snacks & Drinks", "Activity Materials"],
      pricing: "Starting from $45 per family"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photography Tours",
      description: "Capture memories with guided photography sessions",
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      features: ["Sunrise Photography", "Nature Walks", "Portrait Sessions", "Selfie Points", "Pre Wedding Shoot ", "Fancy Dress", ],
      detailedDescription:
        "Capture the beauty of our resort and surrounding nature with professional photography guidance. Learn composition techniques and create stunning memories.",
      images: ["/gallery/photography-1.jpg","/gallery/photography-2.jpg","/gallery/photography-3.jpg","/gallery/photography-4.jpg"],
      duration: "2-3 hours",
      location: "Nature Trails & Resort Grounds",
      maxParticipants: "6 people",
      included: ["Professional Photographer", "Camera Equipment", "Photo Editing", "Digital Gallery"],
      pricing: "Starting from $95 per person"
    },
    {
      icon: <Bike className="w-8 h-8" />,
      title: "Riding Activities",
      description: "Horse riding, camel rides, cycling, and more",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100",
      features: ["Horse Riding","Bullock Cart Rides","Camel Riding","Buggy Rides","Tractor Tours","Cycling"],
      detailedDescription:
        "Explore the charm of traditional and modern rides. From horse and camel rides to cycling and tractor tours, experience fun and adventure while connecting with nature and culture.",
      images: ["/gallery/riding-1.jpg","/gallery/riding-2.jpg","/gallery/riding-3.jpg","/gallery/riding-4.jpg"],
      duration: "2-3 hours",
      location: "Resort Grounds & Riding Trails",
      maxParticipants: "10 people",
      included: ["Safety Helmets", "Trained Instructors", "Refreshments", "Basic Riding Gear"],
      pricing: "Starting from $75 per person"
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "Food & Beverages",
      description: "Fine dining, seasonal parties, and live kitchen experiences",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      features: [
        "Fine Dining",
        "Buffet Counters",
        "Live Kitchen",
        "Hoorda Party (Seasonal)",
        "Aam Ras Party (Seasonal)",
        "Dessert Station",
        "Tea & Coffee",
        "Mocktails",
        "Continental",
        "Woody Restaurant",
        "Hill View Restaurant",
        "Coffee Shop Pizza & Continental",
        "Chaupati (Food Mall)"
        
      ],
      detailedDescription:
        "Savor delicious cuisines with our curated food and beverage experiences. From fine dining to seasonal specialties and live kitchen counters, there’s something for everyone to enjoy.",
      images: ["/gallery/food-1.jpg","/gallery/food-2.jpg","/gallery/food-3.jpg","/gallery/food-4.jpg"],
      duration: "Flexible",
      location: "Dining Halls & Outdoor Venues",
      maxParticipants: "Unlimited",
      included: ["Buffet Access", "Beverages", "Seasonal Specials", "Desserts"],
      pricing: "Included with packages / À la carte options"
    }
  ];
    
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as any
      } 
    }
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedActivity && selectedActivity.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedActivity.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedActivity && selectedActivity.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedActivity.images.length - 1 : prev - 1
      );
    }
  };


  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Multi-layered Background System */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 via-transparent to-cyan-100/30"></div>
        
        {/* Large floating orbs with enhanced animations */}
        <motion.div 
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-gradient-to-br from-emerald-300/20 via-teal-300/15 to-cyan-300/20 rounded-full blur-3xl"
        ></motion.div>
        
        <motion.div 
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-60 -left-60 w-[700px] h-[700px] bg-gradient-to-tr from-blue-300/20 via-purple-300/15 to-pink-300/20 rounded-full blur-3xl"
        ></motion.div>
        
        <motion.div 
          animate={{
            x: [0, 30, -50, 0],
            y: [0, -20, 40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-orange-200/15 via-yellow-200/10 to-red-200/15 rounded-full blur-2xl"
        ></motion.div>
        
        <motion.div 
          animate={{
            x: [0, -40, 60, 0],
            y: [0, 30, -50, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-gradient-to-tr from-violet-200/20 via-indigo-200/15 to-blue-200/20 rounded-full blur-2xl"
        ></motion.div>

        {/* Geometric patterns overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                                 radial-gradient(circle at 75% 75%, #10b981 2px, transparent 2px),
                                 radial-gradient(circle at 50% 50%, #8b5cf6 1px, transparent 1px)`,
                 backgroundSize: '100px 100px, 150px 150px, 75px 75px'
               }}>
          </div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full"
               style={{
                 backgroundImage: `linear-gradient(90deg, #6366f1 1px, transparent 1px),
                                 linear-gradient(180deg, #6366f1 1px, transparent 1px)`,
                 backgroundSize: '50px 50px'
               }}>
          </div>
        </div>

        {/* Enhanced floating particles with more variety */}
        <motion.div 
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg"
        ></motion.div>
        
        <motion.div 
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-32 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-md"
        ></motion.div>
        
        <motion.div 
          animate={{
            y: [0, -25, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-40 w-2.5 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-md"
        ></motion.div>
        
        <motion.div 
          animate={{
            y: [0, -35, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-60 left-1/2 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full shadow-sm"
        ></motion.div>
        
        <motion.div 
          animate={{
            y: [0, -28, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute bottom-60 right-20 w-2 h-2 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full shadow-md"
        ></motion.div>

        {/* Subtle light rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-300/20 to-transparent transform rotate-12"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-300/15 to-transparent transform -rotate-12"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300/10 to-transparent transform rotate-6"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.8 }} 
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut" as any
            }}
            className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-full mb-8 shadow-2xl"
          >
            <Sparkles className="w-10 h-10 text-white" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-white/30"
            ></motion.div>
          </motion.div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent mb-6">
            Endless Adventures Await
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From thrilling adventures to peaceful relaxation, discover a world of experiences designed to create lasting memories for every guest
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Premium Experience Guaranteed</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Activities Grid */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true, amount: 0.1 }} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16"
        >
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative cursor-pointer"
              onClick={() => handleActivityClick(activity)}
            >
              {/* Enhanced Card */}
              <div className={`relative ${activity.bgColor} rounded-3xl p-8 sm:p-10 h-full border border-white/60 shadow-xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm overflow-hidden group/card`}>
                {/* Multi-layer gradient overlays */}
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 rounded-3xl"></div>
                
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500">
                  <div className="absolute inset-0" 
                       style={{
                         backgroundImage: `radial-gradient(circle at 20% 20%, currentColor 1px, transparent 1px),
                                         radial-gradient(circle at 80% 80%, currentColor 1px, transparent 1px)`,
                         backgroundSize: '30px 30px'
                       }}>
                  </div>
                </div>
                
                {/* Enhanced floating particles */}
                <motion.div 
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 right-4 w-2 h-2 bg-white/70 rounded-full shadow-sm"
                  style={{animationDelay: `${index * 0.5}s`}}
                ></motion.div>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl"></div>
                
                {/* Enhanced Icon */}
                <motion.div 
                  className={`relative ${activity.iconBg} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${activity.color}`}>
                    {activity.icon}
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${activity.color} opacity-20`}
                  ></motion.div>
                </motion.div>

                {/* Enhanced Content */}
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 relative z-10">
                  {activity.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg relative z-10">
                  {activity.description}
                </p>

                {/* Enhanced Features */}
                <div className="space-y-3 mb-8 relative z-10">
                  {activity.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.1 }}
                      className="flex items-center space-x-3 group/feature"
                    >
                      <motion.div 
                        className={`w-3 h-3 rounded-full bg-gradient-to-r ${activity.color} shadow-sm`}
                        whileHover={{ scale: 1.3 }}
                      ></motion.div>
                      <span className="text-sm text-gray-600 group-hover/feature:text-gray-800 transition-colors duration-200">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActivityClick(activity);
                  }}
                >
                  <Button 
                    variant="outline" 
                    className={`w-full border-2 border-transparent bg-gradient-to-r ${activity.color} text-white hover:shadow-2xl transition-all duration-300 py-6 text-lg font-semibold rounded-2xl group/btn`}
                  >
                    <span className="flex items-center justify-center">
                      Learn More
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.8 }} 
          className="text-center"
        >
          <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-blue-50/80 backdrop-blur-lg rounded-3xl p-10 sm:p-16 border border-white/60 shadow-2xl overflow-hidden group/cta">
            {/* Enhanced multi-layer background decorations */}
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full -translate-y-16 translate-x-16"
            ></motion.div>
            
            <motion.div 
              animate={{
                scale: [1, 0.9, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full translate-y-12 -translate-x-12"
            ></motion.div>
            
            <motion.div 
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-0 w-20 h-20 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full -translate-x-10"
            ></motion.div>
            
            <motion.div 
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-1/3 right-0 w-16 h-16 bg-gradient-to-tl from-violet-200/25 to-pink-200/25 rounded-full translate-x-8"
            ></motion.div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02] group-hover/cta:opacity-[0.05] transition-opacity duration-500">
              <div className="absolute inset-0" 
                   style={{
                     backgroundImage: `radial-gradient(circle at 30% 30%, #6366f1 1px, transparent 1px),
                                     radial-gradient(circle at 70% 70%, #10b981 1px, transparent 1px)`,
                     backgroundSize: '40px 40px'
                   }}>
              </div>
            </div>

            {/* Light rays effect */}
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent transform rotate-12 opacity-50"></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent transform -rotate-12 opacity-40"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-10"
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-blue-800 bg-clip-text text-transparent mb-6">
                Ready for Your Next Adventure?
              </h3>
              <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Book your stay today and unlock access to all these amazing activities and more. Create memories that will last a lifetime!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white px-10 py-6 text-xl font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 rounded-2xl"
                  >
                    <Sparkles className="w-6 h-6 mr-3" />
                    Explore All Activities
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </motion.div>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 rounded-2xl"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Save for Later
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Activity Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 border-0 shadow-2xl">
          {selectedActivity && (
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Gallery Section */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {/* Main Image */}
                  <div className="relative h-[400px] lg:h-full">
                    <img
                      src={selectedActivity.images[currentImageIndex]}
                      alt={selectedActivity.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to a placeholder if image doesn't exist
                        e.currentTarget.src = `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 1000000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
                      }}
                    />
                    
                    {/* Image Navigation */}
                    <div className="absolute inset-0 flex items-center justify-between p-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                      </motion.button>
                    </div>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedActivity.images.map((_: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            index === currentImageIndex 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
                  {/* Header */}
                  <div className="mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${selectedActivity.color} rounded-2xl mb-6 shadow-lg`}>
                      {selectedActivity.icon}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {selectedActivity.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                      {selectedActivity.detailedDescription}
                    </p>
                  </div>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">{selectedActivity.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold text-gray-900">{selectedActivity.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl">
                      <Users2 className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">Max Group</p>
                        <p className="font-semibold text-gray-900">{selectedActivity.maxParticipants}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-semibold text-green-700">{selectedActivity.pricing}</p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedActivity.included.map((item: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-white/40 rounded-lg"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedActivity.color}`}></div>
                          <span className="text-gray-700">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Activities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedActivity.features.map((feature: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg"
                        >
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 text-sm">{feature}</span>
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
                        className={`w-full sm:w-auto bg-gradient-to-r ${selectedActivity.color} hover:shadow-2xl transition-all duration-300 py-4 px-8 text-lg font-semibold rounded-2xl`}
                      >
                        <Heart className="w-5 h-5 mr-2" />
                        Book Now
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 px-8 text-lg font-semibold rounded-2xl"
                      >
                        <ArrowRight className="w-5 h-5 mr-2" />
                        Learn More
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

