"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Sparkles, 
  Heart, 
  Leaf, 
  Sun, 
  Moon,
  Clock,
  Star,
  Phone,
  Calendar,
  CheckCircle,
  Quote
} from "lucide-react";
import { useGetSpaWellnessQuery } from "@/redux/apis/spaAndWellnessApi";

export function WellnessPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Fetch spa & wellness items from API
  const { data, error, isLoading } = useGetSpaWellnessQuery();
console.log("Spa & Wellness Data:", data);
  // Fallback demo data if API fails or is loading
  const fallbackServices = [
    {
      id: 1,
      name: "Massage Therapies",
      description: "Rejuvenate your body and mind with our expert therapeutic massage treatments",
      image: "https://images.unsplash.com/photo-1559185590-765cdc663325?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBtYXNzYWdlJTIwdGhlcmFweSUyMHdlbGxuZXNzfGVufDF8fHx8MTc1NzQwODM2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Heart className="w-6 h-6" />,
      treatments: ["Swedish Massage", "Deep Tissue", "Hot Stone", "Aromatherapy"],
      duration: "60-90 minutes",
      benefits: ["Stress relief", "Muscle relaxation", "Better circulation"]
    },
    {
      id: 2,
      name: "Yoga Decks",
      description: "Find your inner balance on our scenic outdoor yoga platforms surrounded by nature",
      image: "https://images.unsplash.com/photo-1692182549439-2a78c119dc40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwZGVjayUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NTc0MzI0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Sun className="w-6 h-6" />,
      treatments: ["Sunrise Yoga", "Hatha Yoga", "Vinyasa Flow", "Restorative Yoga"],
      duration: "45-75 minutes",
      benefits: ["Flexibility", "Mental clarity", "Stress reduction"]
    },
    {
      id: 3,
      name: "Meditation Rooms",
      description: "Discover tranquility in our purpose-built meditation spaces designed for inner peace",
      image: "https://images.unsplash.com/photo-1627257365018-07f00041b023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcm9vbSUyMHplbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc1NzQzMjQ5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      icon: <Moon className="w-6 h-6" />,
      treatments: ["Guided Meditation", "Mindfulness", "Breathwork", "Sound Healing"],
      duration: "30-60 minutes",
      benefits: ["Mental peace", "Emotional balance", "Improved focus"]
    }
  ];

  // Map API data to UI format
  const services = !isLoading && data?.data?.length
    ? data.data.map((item, idx) => ({
        id: item._id,
        name: item.name,
        description: item.description,
        image: item.image.url,
        icon: <Heart className="w-6 h-6" />, // You can map icons based on item.name if needed
        treatments: item.services,
        duration: item.rating ? `${item.rating * 15} minutes` : "60 minutes",
        benefits: item.location ? [item.location] : [],
      }))
    : fallbackServices;

  // ...existing code for packages and testimonials...

  // The rest of your component remains unchanged
  // (You can keep your packages and testimonials as static data)

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-mint-50 pt-16">
      {/* Hero Section */}
      {/* ...existing code... */}
      <div className="container mx-auto px-4 py-16">
        {/* Services Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our carefully curated wellness treatments designed to harmonize your physical and mental well-being
            </p>
          </div>
          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Loading spa & wellness services...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">Failed to load services.</div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={service.image}
                        alt={service.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                          {service.icon}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-light text-gray-800 mb-4">{service.name}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>Duration</span>
                          </div>
                          <span className="text-gray-700">{service.duration}</span>
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-800 mb-3">Treatments Available</h4>
                        <div className="flex flex-wrap gap-2">
                          {service.treatments.map((treatment: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              {treatment}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-800 mb-3">Benefits</h4>
                        <div className="space-y-2">
                          {service.benefits.map((benefit: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 text-white border-0">
                        Book Treatment
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
        {/* ...rest of your component unchanged... */}
      </div>
    </div>
  );
}