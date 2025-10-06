"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useGetActiveEventsQuery } from "@/redux/apis/eventApi";
import { EventsLoadingSkeleton } from "./EventsLoadingSkeleton";
import { Calendar, MapPin, Users, DollarSign, Clock } from "lucide-react";
import { Badge } from "./ui/badge";

export function EventsPage() {
  const { data: events = [], isLoading, error } = useGetActiveEventsQuery();

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } } as const;

  // Loading state
  if (isLoading) {
    return <EventsLoadingSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <section className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Complete event management for weddings, birthdays, corporate retreats, and more.</p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">Unable to load events at this time. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tagesschrift-regular">Events</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Complete event management for weddings, birthdays, corporate retreats, and more.</p>
        </motion.div>
        
        {events.length > 0 ? (
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event, i) => (
              <motion.div key={event._id} variants={item} whileHover={{ y: -4 }} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <ImageWithFallback 
                    src={event.image?.url || "/placeholder-event.jpg"} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-emerald-500 text-white">
                      {event.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    {event.capacity && (
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span>Up to {event.capacity} guests</span>
                      </div>
                    )}
                    {event.price && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        <span className="font-semibold text-emerald-600">₹{event.price.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Available</h3>
            <p className="text-gray-600">Check back soon for upcoming events and special occasions.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default EventsPage;



