"use client";

import { useGetFoodStallsQuery } from "@/redux/apis/foodStallApi";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Store, MapPin, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function FoodStallsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: stallsResponse, isLoading, error } = useGetFoodStallsQuery({ active: true });
  const stalls = stallsResponse?.data || [];

  // Filter stalls based on search term
  const filteredStalls = useMemo(() => {
    return stalls.filter(stall => 
      stall.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stall.description && stall.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (stall.location && stall.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [stalls, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Stalls</h1>
          <p className="text-gray-600">Unable to load food stalls at this time. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white py-20 sm:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-300/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-300/10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Store className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-yellow-300 drop-shadow-lg" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tagesschrift-regular"
          >
            Food Stalls
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed"
          >
            Explore our diverse food stalls offering a variety of cuisines and culinary experiences
          </motion.p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search food stalls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </motion.div>

        {/* Food Stalls Grid */}
        {filteredStalls.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredStalls.map((stall) => (
              <Card key={stall._id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <ImageWithFallback
                    src={stall.image?.url || "/placeholder-stall.jpg"}
                    alt={stall.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-emerald-500 text-white">
                      <Store className="w-3 h-3 mr-1" />
                      Food Stall
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {stall.title}
                  </CardTitle>
                  {stall.description && (
                    <p className="text-gray-600 text-sm line-clamp-2">{stall.description}</p>
                  )}
                </CardHeader>

                <CardContent className="pt-0">
                  {stall.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{stall.location}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <Store className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Food Stalls Found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm 
                ? "Try adjusting your search criteria."
                : "Our food stalls are being set up. Please check back soon!"
              }
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-emerald-700 text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tagesschrift-regular">Diverse Culinary Experiences</h2>
          <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            From local street food to international cuisine, our food stalls bring together the best flavors from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resort/foods"
              className="bg-white text-emerald-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              View Food Menu
            </a>
            <a
              href="/resort/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-700 transition-colors shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
