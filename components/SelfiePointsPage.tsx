"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useGetSelfiePointsQuery } from "@/redux/apis/selfiePointApi";
import { CardSkeleton } from "./ui/loading-skeleton";

export function SelfiePointsPage() {
  const { data: selfiePointsResponse, isLoading, error } = useGetSelfiePointsQuery({ active: true });
  const selfiePoints = selfiePointsResponse?.data || [];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } } as const;

  // Loading state
  if (isLoading) {
    return (
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Selfie Points</h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Capture memorable moments at our most picturesque spots around the resort.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CardSkeleton key={i} className="aspect-[4/5]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Selfie Points</h1>
            <p className="text-red-600 mt-3">Failed to load selfie points. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Selfie Points</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Capture memorable moments at our most picturesque spots around the resort.</p>
        </motion.div>
        
        {selfiePoints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No selfie points available at the moment.</p>
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {selfiePoints.map((spot, i) => (
              <motion.div key={spot._id} variants={item} whileHover={{ y: -4 }} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-[4/5] overflow-hidden">
                  <ImageWithFallback 
                    src={spot.image.url} 
                    alt={spot.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{spot.title}</h3>
                  <p className="text-sm text-gray-600">{spot.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default SelfiePointsPage;



