"use client";

import { useGetAwardsQuery } from "@/redux/apis/awardApi";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Trophy, Calendar, Building, Award, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AwardsSection() {
  const { data: awardsResponse, isLoading } = useGetAwardsQuery({ 
    active: true, 
    limit: 3 
  });
  const awards = awardsResponse?.data || [];

  if (isLoading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-32 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (awards.length === 0) {
    return null; // Don't show section if no awards
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Awards & Recognition</h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proud recipients of prestigious awards for excellence in hospitality and service
          </p>
        </div>

        {/* Awards Grid - Compact 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {awards.slice(0, 3).map((award) => (
            <Card key={award._id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-0 shadow-sm">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={award.image?.url || "/placeholder-award.jpg"}
                  alt={award.title}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1">
                    <Trophy className="w-3 h-3 mr-1" />
                    {award.year}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {award.title}
                </CardTitle>
                <p className="text-gray-600 text-xs line-clamp-2">{award.description}</p>
              </CardHeader>

              <CardContent className="pt-0 px-3 pb-3">
                <div className="space-y-1">
                  {award.organization && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Building className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{award.organization}</span>
                    </div>
                  )}

                  {award.category && (
                    <div className="flex items-center gap-1">
                      <Award className="w-3 h-3 text-gray-400" />
                      <Badge variant="outline" className="text-xs px-1 py-0.5">
                        {award.category}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/resort/awards"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors group shadow-md hover:shadow-lg"
          >
            Show All Awards
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
