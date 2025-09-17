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

// Import your hall images
import diamond from "@/gallery/diamond-hall.jpg";
import emerald from "@/gallery/diamond-hall-wedding.jpg";
import topaz from "@/gallery/diamond-hall-wedding.jpg";
import ruby from "@/gallery/diamond-hall-wedding.jpg";

export function BanquetVenuesPage() {
  const halls = [
    {
      img: diamond,
      title: "Diamond Hall",
      cap: "Indoor • 500+ Guests",
      area: "750 sq. ft.",
      ac: "Fully Air-Conditioned",
      desc: "An elegant hall with premium lighting, modern decor, and versatile layouts perfect for grand receptions and corporate events.",
    },
    {
      img: emerald,
      title: "Emerald Hall",
      cap: "Indoor • 200 Guests",
      area: "8,000 sq. ft.",
      ac: "Fully Air-Conditioned",
      desc: "Emerald Hall offers a modern yet warm ambiance, ideal for weddings, conferences, and intimate gatherings with style.",
    },
    {
      img: topaz,
      title: "Topaz Hall",
      cap: "Indoor • 75 Guests",
      area: "6,000 sq. ft.",
      ac: "Non-AC (Well Ventilated)",
      desc: "A charming venue that blends tradition and function, perfect for cultural events, family celebrations, and social functions.",
    },
    {
      img: ruby,
      title: "Ruby Hall",
      cap: "Indoor • 150 Guests",
      area: "4,500 sq. ft.",
      ac: "Fully Air-Conditioned",
      desc: "Ruby Hall is cozy yet elegant, ideal for smaller gatherings, cocktail parties, and private functions with premium comfort.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 as any } },
  } as const;
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  } as const;

  const [selected, setSelected] = useState<typeof halls[0] | null>(null);

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
            Discover our four signature banquet halls — designed for weddings,
            receptions, and unforgettable celebrations.
          </p>
        </motion.div>

        {/* Hall Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {halls.map((h, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -4 }}
              className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelected(h)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={h.img}
                  alt={h.title}
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
                    {h.title}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {h.cap}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {h.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dialog for details */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg sm:max-w-2xl">
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
                <ImageWithFallback
                  src={selected.img}
                  alt={selected.title}
                  width={800}
                  height={500}
                  className="w-full h-64 sm:h-80 object-cover rounded-lg"
                />
                <div className="mt-4 space-y-2 text-sm sm:text-base">
                  <p>
                    <strong>Capacity:</strong> {selected.cap}
                  </p>
                  <p>
                    <strong>Area:</strong> {selected.area}
                  </p>
                  <p>
                    <strong>AC:</strong> {selected.ac}
                  </p>
                  <p>
                    <strong>Description:</strong> {selected.desc}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default BanquetVenuesPage;
