"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import gate from "@/gallery/gate-school-trip.jpg";
import waterfall from "@/gallery/adventure-1.jpg";
import lawn from "@/gallery/24.jpg";
import night from "@/gallery/night-wedding.jpg";

export function SelfiePointsPage() {
  const spots = [
    { img: gate, title: "Fort Gateway", desc: "Historic backdrop with grandeur" },
    { img: waterfall, title: "Waterfall Vista", desc: "Nature’s flowing canvas" },
    { img: lawn, title: "Emerald Lawns", desc: "Vast greeneries for golden hour" },
    { img: night, title: "Twilight Lights", desc: "Romantic evening ambience" },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } } as const;

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Selfie Points</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Capture memorable moments at our most picturesque spots around the resort.</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {spots.map((s, i) => (
            <motion.div key={i} variants={item} whileHover={{ y: -4 }} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[4/5] overflow-hidden">
                <ImageWithFallback src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SelfiePointsPage;



