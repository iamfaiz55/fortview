"use client";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useState } from "react";
import { useGetActiveBanquetVenuesQuery } from "@/redux/apis/banquetVenueApi";
import { BanquetVenue } from "@/redux/apis/banquetVenueApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog";

export function BanquetVenuesPage() {
  const { data: venues = [], isLoading, error } = useGetActiveBanquetVenuesQuery();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 as any } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  } as const;

  const [selected, setSelected] = useState<BanquetVenue | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleVenueSelect = (venue: BanquetVenue) => {
    setSelected(venue);
    setCurrentImageIndex(0); // Reset to first image
  };

  const nextImage = () => {
    if (selected && selected.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selected.images.length);
    }
  };

  const prevImage = () => {
    if (selected && selected.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selected.images.length) % selected.images.length);
    }
  };

  if (isLoading) {
    return (
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="aspect-[16/10] bg-gray-200" />
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Banquet Venues</h1>
          <p className="text-red-600">Error loading venues. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Banquet Venues
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover our signature banquet halls — designed for weddings,
            receptions, and unforgettable celebrations.
          </p>
        </motion.div>

        {/* Venues Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {venues.map((venue, i) => (
            <motion.div
              key={venue._id}
              variants={item}
              whileHover={{ y: -4 }}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleVenueSelect(venue)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={venue.images[0]?.url || "/placeholder-venue.jpg"}
                  alt={venue.title}
                  width={600}
                  height={375}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  quality={85}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {venue.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {venue.capacity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {venue.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dialog for details */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
  <DialogPortal>
    {/* Overlay above navbar (header is z-[100]) */}
    <DialogOverlay
      className="
        fixed inset-0 !z-[120]
        bg-black/50 backdrop-blur-[2px]
        data-[state=open]:animate-in data-[state=open]:fade-in-0
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0
      "
    />

    {/* Content above overlay & navbar */}
    <DialogContent
      className="
        !z-[130] max-w-4xl max-h-[90vh] overflow-y-auto
        bg-white border border-neutral-200 shadow-2xl
        rounded-xl
        data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
        data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
      "
    >
      {selected && (
        <>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selected.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Detailed information about {selected.title}.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
          {/* Image Slider */}
          {selected.images && selected.images.length > 0 ? (
            <div className="relative">
              <div className="relative h-64 sm:h-80 overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={selected.images[currentImageIndex]?.url || "/placeholder-venue.jpg"}
                  alt={`${selected.title} - Image ${currentImageIndex + 1}`}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-300"
                />

                {/* Navigation Arrows */}
                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Image Indicators */}
              {selected.images.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {selected.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <ImageWithFallback
              src="/placeholder-venue.jpg"
              alt={selected.title}
              width={800}
              height={500}
              className="w-full h-64 sm:h-80 object-cover rounded-lg"
            />
          )}

          {/* Details */}
          <div className="mt-4 space-y-2 text-sm sm:text-base">
            <p><strong>Capacity:</strong> {selected.capacity}</p>
            <p><strong>Area:</strong> {selected.area}</p>
            <p><strong>AC:</strong> {selected.ac}</p>
            {selected.location && <p><strong>Location:</strong> {selected.location}</p>}
            <p><strong>Description:</strong> {selected.description}</p>

            {selected?.features && selected.features.length > 0 && (
              <div>
                <strong>Features:</strong>
                <ul className="list-disc list-inside mt-1">
                  {selected.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {selected.pricing && (
              <div>
                <strong>Pricing:</strong>
                <p className="mt-1">
                  {selected.pricing.currency} {selected.pricing.basePrice}
                </p>
                {selected.pricing.includes?.length > 0 && (
                  <div>
                    <p className="font-medium">Includes:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {selected.pricing.includes.map((include, index) => (
                        <li key={index}>{include}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    )}
  </DialogContent>
  </DialogPortal>
</Dialog>

    </section>
  );
}

export default BanquetVenuesPage;
