"use client"
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import lawn from "@/gallery/outdoor-game-1.jpg";
import rooms from "@/gallery/room-1.jpg";
import dining from "@/gallery/woody-restaurant-top.jpg";

export function AboutSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 as any } }
  } as const;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } }
  } as const;

  return (
    <section className="relative py-16 sm:py-24 bg-gray-50 overflow-hidden">
      {/* Ambient gradient blobs */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-300/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as any }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-teal-300/30 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as any, delay: 0.8 }}
      />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.h2 variants={item} className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tagesschrift-regular">
              The FortView Resorts
            </motion.h2>
            <motion.p variants={item} className="text-gray-700 text-base sm:text-lg mb-4">
              The FortView Resorts is located in a natural Scenic beauty and very close to the world heritage Ellora and within the periphery of the historical Deogiri Fort. Catering to the national & international standards of worldwide Tourists to enjoy the necklace beauty added by a range of mountains having variety of flora & fauna giving a mental peace just 15 km. away from Industrial Crowdedness of Aurangabad city.
            </motion.p>
            <motion.p variants={item} className="text-gray-700 text-base sm:text-lg">
              A place for relief from mental fatigue & physical stress. The concept of Fortview Resort is unique because of its eco-friendly concepts to preserve the natural environment.
            </motion.p>

            {/* Animated badges */}
            <motion.div variants={item} className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {[
                "Near Ellora Caves",
                "Periphery of Deogiri Fort",
                "Eco‑friendly Concept",
                "15 km from Aurangabad"
              ].map((label) => (
                <motion.span
                  key={label}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1.5 rounded-full text-xs sm:text-sm bg-white/70 backdrop-blur border border-emerald-200 text-emerald-800 shadow-sm"
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Small metrics */}
            <motion.div variants={item} className="mt-6 grid grid-cols-3 sm:grid-cols-3 gap-4 max-w-md">
              {[{n:"100%", l:"Eco Focus"},{n:"24/7", l:"Hospitality"},{n:"3+", l:"Event Venues"}].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-bold text-emerald-700">{s.n}</div>
                  <div className="text-xs text-gray-500">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Images composition: non-overlapping responsive grid */}
          <motion.div className="relative" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.div whileHover={{ y: -4 }} className="col-span-2 overflow-hidden rounded-2xl shadow-lg">
                <ImageWithFallback src={lawn} alt="Expansive green lawns" className="w-full h-56 sm:h-72 lg:h-80 object-cover" />
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl shadow-md">
                <ImageWithFallback src={rooms} alt="Comfortable rooms" className="w-full h-40 sm:h-48 lg:h-56 object-cover" />
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="overflow-hidden rounded-2xl shadow-md">
                <ImageWithFallback src={dining} alt="Signature dining" className="w-full h-40 sm:h-48 lg:h-56 object-cover" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center text-emerald-800"
        >
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-2 text-sm border border-emerald-200">
            FortView Resort — all around you, nature and history in harmony
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;


