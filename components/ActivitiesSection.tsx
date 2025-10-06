"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { LazyWrapper } from "./ui/lazy-wrapper";
import { CardSkeleton } from "./ui/loading-skeleton";
import {
  ArrowRight,
  Mountain,
  Waves,
  Utensils,
  Users,
  Camera,
  Heart,
  Sparkles,
  Zap,
  Star,
  X,
  Clock,
  MapPin,
  Users2,
  ChevronLeft,
  ChevronRight,
  Bike,
  Flower,
  Activity,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useGetActivitiesQuery } from "@/redux/apis/activityApi";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import { Activity as ActivityType } from "@/redux/apis/activityApi";

interface ActivityDisplay {
  _id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ageGroup: string;
  features: string[];
  rating?: number;
  icon: React.ReactNode;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  color: string; // tailwind gradient (e.g., 'from-emerald-500 to-teal-600')
  bgColor: string; // tailwind bg (e.g., 'bg-emerald-50')
  iconBg: string; // tailwind bg (e.g., 'bg-emerald-100')
  included: string[];
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    Activity: <Activity className="w-8 h-8 text-white" />,
    Mountain: <Mountain className="w-8 h-8 text-white" />,
    Waves: <Waves className="w-8 h-8 text-white" />,
    Utensils: <Utensils className="w-8 h-8 text-white" />,
    Users: <Users className="w-8 h-8 text-white" />,
    Camera: <Camera className="w-8 h-8 text-white" />,
    Heart: <Heart className="w-8 h-8 text-white" />,
    Zap: <Zap className="w-8 h-8 text-white" />,
    Star: <Star className="w-8 h-8 text-white" />,
    Clock: <Clock className="w-8 h-8 text-white" />,
    MapPin: <MapPin className="w-8 h-8 text-white" />,
    Users2: <Users2 className="w-8 h-8 text-white" />,
    Bike: <Bike className="w-8 h-8 text-white" />,
    Flower: <Flower className="w-8 h-8 text-white" />,
  };
  return iconMap[iconName] || <Activity className="w-8 h-8 text-white" />;
};

// Helper function to get color scheme based on category
const getColorScheme = (category: string) => {
  const colorMap: { [key: string]: { color: string; bgColor: string; iconBg: string } } = {
    "Adventure Sports": { color: "from-emerald-500 to-teal-600", bgColor: "bg-emerald-50", iconBg: "bg-emerald-100" },
    "Water Activities": { color: "from-blue-500 to-cyan-600", bgColor: "bg-blue-50", iconBg: "bg-blue-100" },
    "Nature & Wildlife": { color: "from-green-500 to-lime-600", bgColor: "bg-green-50", iconBg: "bg-green-100" },
    "Cultural Experiences": { color: "from-purple-500 to-pink-600", bgColor: "bg-purple-50", iconBg: "bg-purple-100" },
    "Wellness & Spa": { color: "from-purple-500 to-pink-600", bgColor: "bg-purple-50", iconBg: "bg-purple-100" },
    "Dining & Entertainment": { color: "from-red-500 to-pink-600", bgColor: "bg-red-50", iconBg: "bg-red-100" },
    "Family Activities": { color: "from-green-500 to-lime-600", bgColor: "bg-green-50", iconBg: "bg-green-100" },
    "Educational Tours": { color: "from-indigo-500 to-purple-600", bgColor: "bg-indigo-50", iconBg: "bg-indigo-100" },
    "Photography": { color: "from-indigo-500 to-purple-600", bgColor: "bg-indigo-50", iconBg: "bg-indigo-100" },
    "Fitness & Sports": { color: "from-amber-500 to-orange-600", bgColor: "bg-amber-50", iconBg: "bg-amber-100" },
  };
  return colorMap[category] || { color: "from-gray-500 to-gray-600", bgColor: "bg-gray-50", iconBg: "bg-gray-100" };
};

export function ActivitiesSection() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityDisplay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch activities from API
  const { data: activitiesResponse, isLoading, error } = useGetActivitiesQuery({ active: true });

  const activities: ActivityDisplay[] = useMemo(() => {
    if (!activitiesResponse?.data) return [];
    
    return activitiesResponse.data.map((activity) => {
      const colorScheme = getColorScheme(activity.category);
      return {
        ...activity,
        icon: getIconComponent(activity.icon),
        color: colorScheme.color,
        bgColor: colorScheme.bgColor,
        iconBg: colorScheme.iconBg,
        included: [
          "Professional Guide",
          "Safety Equipment", 
          "Refreshments",
          "First Aid Kit"
        ],
      };
    });
  }, [activitiesResponse]);

  // Fallback activities if API fails
  const fallbackActivities: ActivityDisplay[] = useMemo(() => {
    const activitiesList = [
      {
        _id: "fallback-1",
        title: "Adventure Activities",
        description: "Hiking, zip-line, wall climbing, zorbing, and nature trails",
        detailedDescription: "Experience the thrill of adventure in pristine natural surroundings. Our activities are designed to challenge and excite while ensuring your safety with professional guides and top-quality equipment.",
        category: "Adventure Sports",
        duration: "2-4 hours",
        difficulty: "Medium" as const,
        ageGroup: "12+ years",
        features: [
          "Guided Hiking Tours",
          "Zip-lining",
          "Wall Climbing",
          "Zorbing",
          "High Ropes",
          "Adventure Games",
          "Nature Photography",
          "Trekking",
          "Tenting Nights Adventure",
        ],
        rating: 4.8,
        icon: <Mountain className="w-8 h-8 text-white" />,
        image: {
          url: "/gallery/adventure-1.jpg",
          publicId: "adventure-1"
        },
        isActive: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "from-emerald-500 to-teal-600",
        bgColor: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        included: ["Professional Guide", "Safety Equipment", "Water & Snacks", "First Aid Kit"],
      },
      {
        _id: "fallback-2",
        title: "Water Sports",
        description: "Swimming, water zorbing, and fun water activities",
        detailedDescription: "Dive into crystal-clear waters and enjoy a variety of water-based activities—from peaceful swims to exciting water zorbing. Our facilities offer something for every water enthusiast.",
        category: "Water Activities",
        duration: "1-3 hours",
        difficulty: "Easy" as const,
        ageGroup: "All ages",
        features: ["Swimming Pool", "Water Zorbing", "Rain Dance"],
        rating: 4.6,
        icon: <Waves className="w-8 h-8 text-white" />,
        image: {
          url: "/gallery/water-1.jpg",
          publicId: "water-1"
        },
        isActive: true,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-50",
        iconBg: "bg-blue-100",
        included: ["Water Equipment", "Life Jackets", "Changing Facilities", "Towel Service"],
      },
      {
        _id: "fallback-3",
        title: "Wellness & Spa",
        description: "Relaxation, massage therapy, and holistic wellness programs",
        detailedDescription: "Rejuvenate your mind, body, and soul in our tranquil wellness sanctuary. Experience world-class spa treatments, guided meditation, and yoga sessions in a peaceful environment.",
        category: "Wellness & Spa",
        duration: "1-3 hours",
        difficulty: "Easy" as const,
        ageGroup: "16+ years",
        features: ["Spa Treatments", "Yoga Classes", "Meditation", "Wellness Programs", "Panchakarma"],
        rating: 4.9,
        icon: <Flower className="w-8 h-8 text-white" />,
        image: {
          url: "/gallery/spa-1.jpg",
          publicId: "spa-1"
        },
        isActive: true,
        order: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-50",
        iconBg: "bg-purple-100",
        included: ["Luxury Robes", "Aromatherapy", "Herbal Teas", "Relaxation Lounge"],
      },
      {
        _id: "fallback-4",
        title: "Family Activities",
        description: "Kid-friendly activities and family entertainment",
        detailedDescription: "Create lasting family memories with our specially designed family activities. Safe, fun, and engaging experiences that bring families together for quality time.",
        category: "Family Activities",
        duration: "2-4 hours",
        difficulty: "Easy" as const,
        ageGroup: "All ages",
        features: [
          "Kids Club",
          "Family Games",
          "Indoor Games",
          "Outdoor Games",
          "Antakshari",
          "Karaoke",
          "Birthday Parties",
          "Dandiya",
          "Rang Panchami",
          "Raksha Bandhan",
          "Marriage Anniversary",
          "Get-togethers",
          "Reunion",
        ],
        rating: 4.7,
        icon: <Users className="w-8 h-8 text-white" />,
        image: {
          url: "/gallery/family-1.jpg",
          publicId: "family-1"
        },
        isActive: true,
        order: 4,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "from-green-500 to-lime-600",
        bgColor: "bg-green-50",
        iconBg: "bg-green-100",
        included: ["Child Supervision", "Safety Equipment", "Snacks & Drinks", "Activity Materials"],
      },
      {
        _id: "fallback-5",
        title: "Photography Tours",
        description: "Capture memories with guided photography sessions",
        detailedDescription: "Capture the beauty of our resort and surrounding nature with professional photography guidance. Learn composition techniques and create stunning memories.",
        category: "Photography",
        duration: "2-3 hours",
        difficulty: "Easy" as const,
        ageGroup: "12+ years",
        features: [
          "Sunrise Photography",
          "Nature Walks",
          "Portrait Sessions",
          "Selfie Points",
          "Pre-Wedding Shoot",
          "Fancy Dress",
        ],
        rating: 4.8,
        icon: <Camera className="w-8 h-8 text-white" />,
        image: {
          url: "/gallery/photography-1.jpg",
          publicId: "photography-1"
        },
        isActive: true,
        order: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "from-indigo-500 to-purple-600",
        bgColor: "bg-indigo-50",
        iconBg: "bg-indigo-100",
        included: ["Professional Photographer", "Camera Equipment", "Photo Editing", "Digital Gallery"],
      },
      {
        _id: "fallback-6",
        title: "Riding Activities",
        description: "Horse riding, camel rides, cycling, and more",
        detailedDescription: "Explore the charm of traditional and modern rides. From horse and camel rides to cycling and tractor tours, experience fun and adventure while connecting with nature and culture.",
        category: "Fitness & Sports",
        duration: "2-3 hours",
        difficulty: "Medium" as const,
        ageGroup: "8+ years",
        features: [
          "Horse Riding",
          "Bullock Cart Rides",
          "Camel Riding",
          "Buggy Rides",
          "Tractor Tours",
          "Cycling",
        ],
        rating: 4.5,
        icon: <Bike className="w-8 h-8 text-white" />,
        image: {
          url: "/gallery/riding-1.jpg",
          publicId: "riding-1"
        },
        isActive: true,
        order: 6,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "from-amber-500 to-orange-600",
        bgColor: "bg-amber-50",
        iconBg: "bg-amber-100",
        included: ["Safety Helmets", "Trained Instructors", "Refreshments", "Basic Riding Gear"],
      },
      {
        _id: "fallback-7",
        title: "Food & Beverages",
        description: "Fine dining, seasonal parties, and live kitchen experiences",
        detailedDescription: "Savor delicious cuisines with our curated food and beverage experiences. From fine dining to seasonal specialties and live kitchen counters, there's something for everyone to enjoy.",
        category: "Dining & Entertainment",
        duration: "Flexible",
        difficulty: "Easy" as const,
        ageGroup: "All ages",
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
          "Chaupati (Food Mall)",
        ],
        rating: 4.9,
        icon: <Utensils className="w-8 h-8 text-white" />,
        image: {
          url: "/gallery/food-1.jpg",
          publicId: "food-1"
        },
        isActive: true,
        order: 7,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: "from-red-500 to-pink-600",
        bgColor: "bg-red-50",
        iconBg: "bg-red-100",
        included: ["Buffet Access", "Beverages", "Seasonal Specials", "Desserts"],
      },
    ];
    
    console.log('Activities loaded:', activitiesList.length, 'items');
    return activitiesList;
    },
    []
  );

  // Animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as any } },
  };

  const handleActivityClick = useCallback((activity: ActivityDisplay) => {
    setSelectedActivity(activity);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  }, []);

  // Use API data if available, otherwise fallback
  const displayActivities = activities.length > 0 ? activities : fallbackActivities;

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // tiny delay to avoid flicker if you add exit animations later
    setTimeout(() => {
      setSelectedActivity(null);
      setCurrentImageIndex(0);
    }, 150);
  }, []);

  
  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (!selectedActivity) return;
      if (e.key === "Escape") closeModal();
    
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isModalOpen, selectedActivity, closeModal]);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Activities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing experiences designed to create unforgettable memories
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load activities</p>
            <p className="text-gray-600">Showing sample activities below</p>
          </div>
        )}

        {/* Activities Grid */}
        {!isLoading && (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
              gap-4 sm:gap-6 lg:gap-8
              mb-12 sm:mb-16
            "
          >
              {displayActivities.map((activity) => (
      <motion.div
        key={activity._id || activity.title}
        variants={item}
        whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.3, ease: 'easeOut' } }}
        whileTap={{ scale: 0.985 }}
        className="group relative cursor-pointer will-change-transform"
        onClick={() => handleActivityClick(activity)}
      >
        <div
          className={`
            relative ${activity.bgColor}
            rounded-2xl sm:rounded-3xl
            p-4 sm:p-6 lg:p-8
            h-full
            border border-white/50
            shadow-[0_8px_24px_rgba(0,0,0,0.06)]
            hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)]
            transition-all duration-500
            overflow-hidden
          `}
        >
          

          {/* Icon */}
          <motion.div
            className={`
              ${activity.iconBg}
              w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20
              rounded-2xl sm:rounded-3xl
              flex items-center justify-center
              mb-5 sm:mb-6
              shadow-md
            `}
            whileHover={{ rotate: 4 }}
          >
            <div className={`text-transparent bg-clip-text bg-gradient-to-r ${activity.color}`}>
              {activity.icon}
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            {activity.title}
          </h3>

          {/* Description (trimmed on mobile) */}
          <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
            {activity.description}
          </p>

          {/* Features (limit visual density on small screens) */}
          <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
            {activity.features.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${activity.color}`} />
                <span className="text-[13px] sm:text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="relative z-10"
            onClick={(e) => {
              e.stopPropagation();
              handleActivityClick(activity);
            }}
          >
            <Button
              variant="outline"
              className={`
                w-full
                border-2 border-transparent
                bg-gradient-to-r ${activity.color}
                text-white
                hover:shadow-2xl
                transition-all duration-300
                py-3 sm:py-4
                text-sm sm:text-base font-semibold
                rounded-xl sm:rounded-2xl
              `}
            >
              <span className="flex items-center justify-center">
                Learn More
                <motion.div
                  aria-hidden
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </motion.div>
              </span>
            </Button>
          </div>

          {/* Subtle animated glow on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.25), transparent 40%)',
            }}
          />
        </div>
      </motion.div>
    ))}
          </motion.div>
        )}
      </div>


      {/* Activity Detail Modal */}
     {/* Activity Detail Modal (no image column) */}
{/* Activity Detail Modal (always centered) */}
<Dialog
  open={isModalOpen}
  onOpenChange={(open) => {
    if (!open) closeModal();
    else setIsModalOpen(true);
  }}
>

<DialogContent
    className="
      fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      z-[110]                                /* Higher than navbar z-[100] */
      w-[min(96vw,1100px)] h-[92vh] p-0
      bg-gradient-to-br from-white via-gray-50 to-blue-50
      border border-neutral-200 shadow-2xl
      rounded-xl sm:rounded-2xl overflow-hidden
      data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
      data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
    "
  >
    {/* a11y header (visually hidden) */}
    <DialogHeader className="sr-only">
      <DialogTitle>
        {selectedActivity ? selectedActivity.title : "Activity details"}
      </DialogTitle>
      <DialogDescription>
        {selectedActivity
          ? `${selectedActivity.category} - ${selectedActivity.duration}`
          : "Details about the selected activity"}
      </DialogDescription>
    </DialogHeader>

    {selectedActivity && (
      <div className="relative h-full w-full overflow-y-auto">
        {/* Sticky close */}
        <button
          onClick={closeModal}
          className="
            sticky top-[max(0.75rem,env(safe-area-inset-top))] z-30 ml-auto mr-3
            w-9 h-9 sm:w-10 sm:h-10 rounded-full
            bg-white/90 hover:bg-white
            border border-neutral-200 shadow-md
            flex items-center justify-center
            transition-all
          "
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
        </button>

        {/* Content */}
        <aside
          className="
            min-h-0 overflow-y-auto
            border-t border-neutral-200
            bg-gradient-to-b from-white to-neutral-50
            h-[calc(92vh-3.25rem)]
          "
        >
          {/* Header */}
          <div className="p-4 sm:p-6 lg:p-8 flex items-start justify-between gap-3 border-b border-neutral-200">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${selectedActivity.color} rounded-2xl flex items-center justify-center shadow-lg`}
              >
                {selectedActivity.icon}
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {selectedActivity.title}
                </h2>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-yellow-500">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
            {/* Description */}
            <div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {selectedActivity.detailedDescription}
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Duration</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {selectedActivity.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Category</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {selectedActivity.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200">
                <Users2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Age Group</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {selectedActivity.ageGroup}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white rounded-xl border border-neutral-200">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500">Difficulty</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900">
                    {selectedActivity.difficulty}
                  </p>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2.5 sm:mb-3">
                What's Included
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {selectedActivity.included.map((inc, i) => (
                  <div
                    key={inc + i}
                    className="flex items-center gap-3 p-2.5 sm:p-3 bg-white rounded-lg border border-neutral-200"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedActivity.color}`} />
                    <span className="text-sm sm:text-base text-gray-700">{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2.5 sm:mb-3">
                Activities
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {selectedActivity.features.map((feat, i) => (
                  <div
                    key={feat + i}
                    className="flex items-center gap-2 p-2.5 sm:p-3 bg-white rounded-lg border border-neutral-200"
                  >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span className="text-xs sm:text-sm text-gray-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className={`w-full sm:w-auto bg-gradient-to-r ${selectedActivity.color} hover:shadow-2xl transition-all duration-300 py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-2xl`}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-2xl"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </aside>
      </div>
    )}
  </DialogContent>
</Dialog>


    </section>
  );
}


