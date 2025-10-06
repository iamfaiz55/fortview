"use client"
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCreateContactMutation } from "@/redux/apis/contactApi";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", message: "" });
  const [createContact, { isLoading }] = useCreateContactMutation();
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 as any } } } as const;
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } } as const;

  return (
    <section className="pt-24 pb-16 bg-gray-50 overflow-hidden relative">
      {/* Ambient animated blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-300/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as any }}
      />
      <motion.div
        className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-teal-300/30 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as any, delay: 0.8 }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Send us a message and our team will get back shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Info Card */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-xl p-6"
          >
            <motion.h2 variants={item} className="text-xl font-semibold text-gray-900 mb-4">
              Fort View Resort
            </motion.h2>
            <motion.div variants={item} className="space-y-3 text-gray-700">
              <p><strong>Reservation:</strong> 9545 301 888</p>
              <p><strong>Email:</strong> mail@fortviewresort.com</p>
              <p><strong>Address:</strong> Beside H2O Water Park, Near Daultabad Fort, At Post Daultabad, Dist. Aurangabad, Maharashtra</p>
            </motion.div>
            <motion.div variants={item} className="mt-6">
  <div className="w-full h-56 rounded-xl overflow-hidden shadow-md">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3746.734447210223!2d75.14718207508248!3d19.95072218143898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9f7df9f46c9d%3A0x7f3d29f6f4d1e9b3!2sFort%20View%20Resort!5e0!3m2!1sen!2sin!4v1696605075072!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</motion.div>

          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await createContact(form).unwrap();
                setForm({ name: "", email: "", mobile: "", message: "" });
                alert("Thanks! Your message has been sent.");
              } catch (err) {
                alert("Failed to send. Please try again.");
              }
            }}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-xl p-6 space-y-4"
          >
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Your name"
                required
              />
            </motion.div>
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                type="email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="name@example.com"
                required
              />
            </motion.div>
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Phone</label>
              <input
                value={form.mobile}
                onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="+91-"
                required
              />
            </motion.div>
            <motion.div variants={item}>
              <label className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={5}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="Tell us about your plan..."
                required
              />
            </motion.div>
            <motion.div variants={item} className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
