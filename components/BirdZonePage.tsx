"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import birds from "@/gallery/burd-zone.jpg";
import softplay from "@/gallery/soft-play-1.jpg";
import turf from "@/gallery/turf-2.jpg";

export function BirdZonePage() {
  const items = [
    { img: birds, title: "Bird Zone", desc: "Multiple species of birds to observe and learn." },
    { img: softplay, title: "Animal Corner", desc: "Friendly enclosures and guided interactions." },
    { img: turf, title: "Nature Trails", desc: "Green pathways to explore flora & fauna." },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } } as const;

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Bird & Animal Zone</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Discover diverse birdlife and gentle animal companions in our eco zone.</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((b, i) => (
            <motion.div key={i} variants={item} whileHover={{ y: -4 }} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[4/5] overflow-hidden">
                <ImageWithFallback src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default BirdZonePage;








