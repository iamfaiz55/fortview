"use client"
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function PreFooterCTA() {
  return (
    <section className="py-12 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }} className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Plan your perfect day at FortView Resort</h3>
            <p className="text-gray-600 mt-1">From venues to adventures—we’ll help you craft a memorable experience.</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">Enquire Now</Button>
            <Button variant="outline" className="bg-white/80 text-emerald-700 border-emerald-300 hover:bg-white">WhatsApp</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PreFooterCTA;








