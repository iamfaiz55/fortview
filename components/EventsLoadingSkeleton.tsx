"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function EventsLoadingSkeleton() {
  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-48 mx-auto mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="group rounded-xl overflow-hidden shadow-md bg-white">
              <div className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-300"></div>
                <CardHeader className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </CardHeader>
                <CardContent className="pt-0 px-4 pb-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
