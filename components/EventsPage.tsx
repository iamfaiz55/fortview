"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import wedding from "@/gallery/night-wedding-2.jpg";
import birthday from "@/gallery/day-wedding-setup.jpg";
import corporate from "@/gallery/woody-restaurant-2.jpg";
import school from "@/gallery/gate-school-trip.jpg";

export function EventsPage() {
  const events = [
    { img: wedding, title: "Weddings", desc: "From intimate vows to grand receptions with bespoke decor." },
    { img: birthday, title: "Birthdays", desc: "Joyful themes, curated menus, and fun activities for all ages." },
    { img: corporate, title: "Corporate", desc: "Offsites, team building, and conferences with full support." },
    { img: school, title: "School & College", desc: "Day trips, adventures, and learning in nature’s lap." },
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } } as const;

  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Complete event management for weddings, birthdays, corporate retreats, and more.</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.map((e, i) => (
            <motion.div key={i} variants={item} whileHover={{ y: -4 }} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[4/5] overflow-hidden">
                <ImageWithFallback src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{e.title}</h3>
                <p className="text-sm text-gray-600">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default EventsPage;



