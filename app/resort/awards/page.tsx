"use client";

import { useGetAwardsQuery } from "@/redux/apis/awardApi";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Trophy, Calendar, Building, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AwardsLoadingSkeleton } from "@/components/AwardsLoadingSkeleton";
import { motion } from "framer-motion";

export default function AwardsPage() {
  const { data: awardsResponse, isLoading, error } = useGetAwardsQuery({ active: true });
  const awards = awardsResponse?.data || [];

  if (isLoading) {
    return <AwardsLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Awards & Recognition</h1>
          <p className="text-gray-600">Unable to load awards at this time. Please try again later.</p>
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
            <Trophy className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-yellow-300 drop-shadow-lg" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tagesschrift-regular"
          >
            Awards & Recognition
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed"
          >
            Celebrating our achievements and commitment to excellence in hospitality and service
          </motion.p>
        </div>
      </div>

      {/* Awards Section */}
      <div className="container mx-auto px-4 py-16 sm:py-20">
        {awards.length > 0 ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 tagesschrift-regular">
                Our Achievements
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We are proud to be recognized for our outstanding service, innovation, and commitment to excellence in hospitality.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award) => (
                <Card key={award._id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={award.image?.url || "/placeholder-award.jpg"}
                      alt={award.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-white">
                        <Trophy className="w-3 h-3 mr-1" />
                        {award.year}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {award.title}
                    </CardTitle>
                    <p className="text-gray-600 line-clamp-3">{award.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {award.organization && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{award.organization}</span>
                        </div>
                      )}

                      {award.category && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <Badge variant="outline" className="text-xs">
                            {award.category}
                          </Badge>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Awarded in {award.year}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Awards Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're working hard to earn recognition for our excellent service and commitment to quality.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience Excellence</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our awards reflect our commitment to providing exceptional service and unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resort/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/resort/gallery"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
