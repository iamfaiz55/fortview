"use client"
import { motion } from "framer-motion";
import { Button } from "./ui/button";

export function ContactPage() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } } as const;

  return (
    <section className="pt-24 pb-16 bg-gray-50 overflow-hidden relative">
      {/* Ambient animated blobs */}
      <motion.div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl" animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as any }} />
      <motion.div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-teal-300/30 blur-3xl" animate={{ x: [0, -30, 0], y: [0, 25, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as any, delay: 0.8 }} />

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">We'd love to hear from you. Send us a message and our team will get back shortly.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info Card */}
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-xl p-6">
            <motion.h2 variants={item} className="text-xl font-semibold text-gray-900 mb-4">Resort Information</motion.h2>
            <motion.div variants={item} className="space-y-3 text-gray-700">
              <p><strong>Address:</strong> Near Deogiri Fort, close to Ellora Caves</p>
              <p><strong>Phone:</strong> +91-99999-00000</p>
              <p><strong>Email:</strong> hello@fortviewresort.com</p>
              <p><strong>Hours:</strong> Mon–Sun, 8:00 AM – 10:00 PM</p>
            </motion.div>
            <motion.div variants={item} className="mt-6">
              <div className="w-full h-56 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700">Map Preview</div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-xl p-6 space-y-4">
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Your name" />
            </motion.div>
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="name@example.com" />
            </motion.div>
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Phone</label>
              <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="+91-" />
            </motion.div>
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea rows={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Tell us about your plan..." />
            </motion.div>
            <motion.div variants={item} className="pt-2">
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">Send Message</Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;








