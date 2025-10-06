"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export function AwardsLoadingSkeleton() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <Trophy className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <div className="h-12 bg-blue-500 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-blue-400 rounded w-80 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Awards Section Skeleton */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-48 w-full"></div>
                <CardHeader className="pb-3">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section Skeleton */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-blue-500 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-blue-400 rounded w-96 mx-auto mb-8"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 bg-white rounded w-32"></div>
              <div className="h-12 bg-blue-500 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
