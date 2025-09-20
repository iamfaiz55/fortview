"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
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
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

interface Activity {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string; // tailwind gradient (e.g., 'from-emerald-500 to-teal-600')
  bgColor: string; // tailwind bg (e.g., 'bg-emerald-50')
  iconBg: string; // tailwind bg (e.g., 'bg-emerald-100')
  features: string[];
  detailedDescription: string;
  duration: string;
  location: string;
  maxParticipants: string;
  included: string[];
  // pricing: string;
}

export function ActivitiesSection() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activities: Activity[] = useMemo(
    () => [
      {
        icon: <Mountain className="w-8 h-8 text-white" />,
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
          "Tenting Nights Adventure",
        ],
        detailedDescription:
          "Experience the thrill of adventure in pristine natural surroundings. Our activities are designed to challenge and excite while ensuring your safety with professional guides and top-quality equipment.",
        
        duration: "2-4 hours",
        location: "Mountain Trail & Adventure Zone",
        maxParticipants: "8 people",
        included: ["Professional Guide", "Safety Equipment", "Water & Snacks", "First Aid Kit"],
        // pricing: "Starting from $89 per person",
      },
      {
        icon: <Waves className="w-8 h-8 text-white" />,
        title: "Water Sports",
        description: "Swimming, water zorbing, and fun water activities",
        color: "from-blue-500 to-cyan-600",
        bgColor: "bg-blue-50",
        iconBg: "bg-blue-100",
        features: ["Swimming Pool", "Water Zorbing", "Rain Dance"],
        detailedDescription:
          "Dive into crystal-clear waters and enjoy a variety of water-based activities—from peaceful swims to exciting water zorbing. Our facilities offer something for every water enthusiast.",
      
        duration: "1-3 hours",
        location: "Resort Lake & Swimming Pool",
        maxParticipants: "12 people",
        included: ["Water Equipment", "Life Jackets", "Changing Facilities", "Towel Service"],
        // pricing: "Starting from $65 per person",
      },
      {
        icon: <Flower className="w-8 h-8 text-white" />,
        title: "Wellness & Spa",
        description: "Relaxation, massage therapy, and holistic wellness programs",
        color: "from-purple-500 to-pink-600",
        bgColor: "bg-purple-50",
        iconBg: "bg-purple-100",
        features: ["Spa Treatments", "Yoga Classes", "Meditation", "Wellness Programs", "Panchakarma"],
        detailedDescription:
          "Rejuvenate your mind, body, and soul in our tranquil wellness sanctuary. Experience world-class spa treatments, guided meditation, and yoga sessions in a peaceful environment.",
        images: ["/gallery/spa-1.jpg", "/gallery/spa-2.jpg", "/gallery/spa-3.jpg", "/gallery/spa-4.jpg"],
        duration: "1-3 hours",
        location: "Wellness Center & Spa",
        maxParticipants: "6 people",
        included: ["Luxury Robes", "Aromatherapy", "Herbal Teas", "Relaxation Lounge"],
        // pricing: "Starting from $150 per person",
      },
      {
        icon: <Users className="w-8 h-8 text-white" />,
        title: "Family Activities",
        description: "Kid-friendly activities and family entertainment",
        color: "from-green-500 to-lime-600",
        bgColor: "bg-green-50",
        iconBg: "bg-green-100",
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
        detailedDescription:
          "Create lasting family memories with our specially designed family activities. Safe, fun, and engaging experiences that bring families together for quality time.",
        
        duration: "2-4 hours",
        location: "Family Activity Center",
        maxParticipants: "20 people",
        included: ["Child Supervision", "Safety Equipment", "Snacks & Drinks", "Activity Materials"],
        // pricing: "Starting from $45 per family",
      },
      {
        icon: <Camera className="w-8 h-8 text-white" />,
        title: "Photography Tours",
        description: "Capture memories with guided photography sessions",
        color: "from-indigo-500 to-purple-600",
        bgColor: "bg-indigo-50",
        iconBg: "bg-indigo-100",
        features: [
          "Sunrise Photography",
          "Nature Walks",
          "Portrait Sessions",
          "Selfie Points",
          "Pre-Wedding Shoot",
          "Fancy Dress",
        ],
        detailedDescription:
          "Capture the beauty of our resort and surrounding nature with professional photography guidance. Learn composition techniques and create stunning memories.",
       
        duration: "2-3 hours",
        location: "Nature Trails & Resort Grounds",
        maxParticipants: "6 people",
        included: ["Professional Photographer", "Camera Equipment", "Photo Editing", "Digital Gallery"],
        // pricing: "Starting from $95 per person",
      },
      {
        icon: <Bike className="w-8 h-8 text-white" />,
        title: "Riding Activities",
        description: "Horse riding, camel rides, cycling, and more",
        color: "from-amber-500 to-orange-600",
        bgColor: "bg-amber-50",
        iconBg: "bg-amber-100",
        features: [
          "Horse Riding",
          "Bullock Cart Rides",
          "Camel Riding",
          "Buggy Rides",
          "Tractor Tours",
          "Cycling",
        ],
        detailedDescription:
          "Explore the charm of traditional and modern rides. From horse and camel rides to cycling and tractor tours, experience fun and adventure while connecting with nature and culture.",
       
        duration: "2-3 hours",
        location: "Resort Grounds & Riding Trails",
        maxParticipants: "10 people",
        included: ["Safety Helmets", "Trained Instructors", "Refreshments", "Basic Riding Gear"],
        // pricing: "Starting from $75 per person",
      },
      {
        icon: <Utensils className="w-8 h-8 text-white" />,
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
          "Chaupati (Food Mall)",
        ],
        detailedDescription:
          "Savor delicious cuisines with our curated food and beverage experiences. From fine dining to seasonal specialties and live kitchen counters, there’s something for everyone to enjoy.",
        // images: ["/gallery/food-1.jpg", "/gallery/food-2.jpg", "/gallery/food-3.jpg", "/gallery/food-4.jpg"],
        duration: "Flexible",
        location: "Dining Halls & Outdoor Venues",
        maxParticipants: "Unlimited",
        included: ["Buffet Access", "Beverages", "Seasonal Specials", "Desserts"],
        // pricing: "Included with packages / À la carte options",
      },
    ],
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

  const handleActivityClick = useCallback((activity: Activity) => {
    setSelectedActivity(activity);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  }, []);

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
      {/* ... keep your animated background + header exactly as you like ... */}

      {/* Activities Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16"
      >
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            variants={item}
            whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
            whileTap={{ scale: 0.98 }}
            className="group relative cursor-pointer"
            onClick={() => handleActivityClick(activity)}
          >
            <div
              className={`relative ${activity.bgColor} rounded-3xl p-8 sm:p-10 h-full border border-white/60 shadow-xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm overflow-hidden`}
            >
              {/* Icon */}
              <motion.div
                className={`relative ${activity.iconBg} w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-lg`}
                whileHover={{ rotate: 5 }}
              >
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${activity.color}`}>{activity.icon}</div>
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{activity.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">{activity.description}</p>

              <div className="space-y-3 mb-8">
                {activity.features.slice(0, 6).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${activity.color}`} />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div
                className="relative z-10"
                onClick={(e) => {
                  e.stopPropagation(); // ensure button click doesn't bubble
                  handleActivityClick(activity); // open modal on button click too
                }}
              >
                <Button
                  variant="outline"
                  className={`w-full border-2 border-transparent bg-gradient-to-r ${activity.color} text-white hover:shadow-2xl transition-all duration-300 py-6 text-lg font-semibold rounded-2xl`}
                >
                  <span className="flex items-center justify-center">
                    Learn More
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </motion.div>
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Activity Detail Modal */}
      <Dialog
  open={isModalOpen}
  onOpenChange={(open) => {
    if (!open) closeModal();
    else setIsModalOpen(true);
  }}
>
  <DialogContent
    className="
      w-[min(96vw,1100px)] h-[92vh] p-0
      bg-gradient-to-br from-white via-gray-50 to-blue-50
      border border-neutral-200 shadow-2xl
      rounded-xl sm:rounded-2xl
      overflow-hidden
    "
  >
    {/* Required a11y header (visually hidden) */}
    <DialogHeader className="sr-only">
      <DialogTitle>
        {selectedActivity ? selectedActivity.title : "Activity details"}
      </DialogTitle>
      <DialogDescription>
        {selectedActivity
          ? `${selectedActivity.location} `
          : "Details about the selected activity"}
      </DialogDescription>
    </DialogHeader>

    {selectedActivity && (
      <div className="relative h-full w-full overflow-y-auto lg:overflow-hidden">
        {/* Sticky close */}
        <button
          onClick={closeModal}
          className="
            sticky top-[max(0.75rem,env(safe-area-inset-top))] z-30 ml-auto mr-3
            w-10 h-10 rounded-full
            bg-white/90 hover:bg-white
            border border-neutral-200 shadow-md
            flex items-center justify-center
            transition-all
          "
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Grid: column on mobile, 2 cols on lg+ */}
        <div
          className="
            grid gap-0
            lg:grid-cols-2
            h-[calc(92vh-3.25rem)]
            min-h-0
          "
        >
          {/* LEFT: image + thumbs (rows: 1fr / auto) */}
          <div className="grid grid-rows-[1fr_auto] min-h-0">
            

          
          </div>

          {/* RIGHT: details (header fixed, body scrollable) */}
          <aside
            className="
              min-h-0
              border-t lg:border-t-0 lg:border-l border-neutral-200
              bg-gradient-to-b from-white to-neutral-50
              flex flex-col
            "
          >
            {/* Header (sticky-ish: non-scrolling) */}
            <div className="p-5 sm:p-8 flex items-start justify-between gap-3 shrink-0 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <div className={`w-16 h-16 bg-gradient-to-r ${selectedActivity.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  {selectedActivity.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedActivity.title}</h2>
                  {/* <p className="text-emerald-700 font-semibold">{selectedActivity.pricing}</p> */}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>

            {/* Scrollable body */}
            <div className="min-h-0 max-h-full overflow-y-auto p-5 sm:p-8 space-y-6">
              <div>
                <p className="text-gray-700 leading-relaxed">{selectedActivity.detailedDescription}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{selectedActivity.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200">
                  <MapPin className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">{selectedActivity.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-neutral-200">
                  <Users2 className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">Max Group</p>
                    <p className="font-semibold text-gray-900">{selectedActivity.maxParticipants}</p>
                  </div>
                </div>
                {/* <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <div>
                    <p className="text-xs text-gray-600">Price</p>
                    <p className="font-semibold text-green-700">{selectedActivity.pricing}</p>
                  </div>
                </div> */}
              </div>

              {/* Included */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">What's Included</h3>
                <div className="grid grid-cols-1 gap-2">
                  {selectedActivity.included.map((inc, i) => (
                    <div key={inc + i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-neutral-200">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${selectedActivity.color}`} />
                      <span className="text-gray-700">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Activities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedActivity.features.map((feat, i) => (
                    <div key={feat + i} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-neutral-200">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700 text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className={`w-full sm:w-auto bg-gradient-to-r ${selectedActivity.color} hover:shadow-2xl transition-all duration-300 py-4 px-8 text-lg font-semibold rounded-2xl`}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-4 px-8 text-lg font-semibold rounded-2xl"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>



    </section>
  );
}
