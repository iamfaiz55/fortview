"use client"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const quickLinks = [
    "Rooms & Suites",
    "Adventure Activities", 
    "Banquet Venues",
    "Dining Options",
    "Spa & Wellness",
    "Photo Gallery",
    "Contact Us"
  ];

  const activities = [
    "Water Zorbing",
    "Rain Dance",
    "Zipline Adventure",
    "Rock Climbing",
    "Team Building",
    "Kids' Zone",
    "Nature Walks"
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand & Description */}
          <motion.div variants={item} className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
              <span className="text-xl font-bold">WildVenture Resort</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              India's premier adventure resort offering thrilling activities, comfortable accommodations, and unforgettable experiences for families and corporate groups.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Activities */}
          <motion.div variants={item}>
            <h3 className="text-lg font-bold mb-6">Activities</h3>
            <ul className="space-y-3">
              {activities.map((activity, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">
                    {activity}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item}>
            <h3 className="text-lg font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Mountain View Resort Complex</div>
                  <div>Adventure Valley, Hill Station</div>
                  <div>Uttarakhand, India - 123456</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-500" />
                <div className="text-gray-300">
                  <div>+1 (555) 123-4567</div>
                  <div>+1 (555) 765-4321</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-500" />
                <div className="text-gray-300">
                  <div>info@wildventureresort.com</div>
                  <div>bookings@wildventureresort.com</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 WildVenture Resort. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Cancellation Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}