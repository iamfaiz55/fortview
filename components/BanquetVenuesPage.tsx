"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import diamond from "@/gallery/diamond-hall.jpg";
import diamondWedding from "@/gallery/diamond-hall-wedding.jpg";
import silver from "@/gallery/silver-lawns.jpg";
import turf from "@/gallery/turf.jpg";

export function BanquetVenuesPage() {
  const venues = [
    { img: silver, title: "Silver Lawns", cap: "Outdoor lawns • 800+ guests", desc: "Expansive green setting ideal for large gatherings." },
    { img: diamond, title: "Diamond Hall", cap: "Indoor banquet • 500+ guests", desc: "Elegant hall with premium lighting & decor." },
    { img: turf, title: "Turf Arena", cap: "Open air • 400 guests", desc: "Versatile open space for sports and events." },
    { img: diamondWedding, title: "Diamond Weddings", cap: "Signature weddings", desc: "Stunning wedding setups tailored to your vision." },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } } as const;

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Banquet Venues</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Choose from our four signature venues for weddings, receptions, and grand events.</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {venues.map((v, i) => (
            <motion.div key={i} variants={item} whileHover={{ y: -4 }} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="aspect-[16/10] overflow-hidden">
                <ImageWithFallback 
                  src={v.img} 
                  alt={v.title} 
                  width={600}
                  height={375}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  quality={85}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{v.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{v.cap}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BanquetVenuesPage;



