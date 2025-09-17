"use client"
import { Button } from "./ui/button";
import { Menu, Phone, MapPin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const currentPage = usePathname();

  // Preload pages on hover for faster navigation
  useEffect(() => {
    const preloadPage = (href: string) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    };

    // Preload all navigation pages
    const pagesToPreload = [
      '/resort/gallery', '/resort/selfie-points', '/resort/events', '/resort/bird-zone', 
      '/resort/rooms', '/resort/adventure-activities', '/resort/banquet-venues', 
      '/resort/dining', '/resort/spa-wellness', '/resort/contact'
    ];

    // Preload after a short delay to not block initial render
    const timer = setTimeout(() => {
      pagesToPreload.forEach(page => preloadPage(page));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: "Gallery", page: "/resort/gallery" },
    { name: "Selfie Points", page: "/resort/selfie-points" },
    { name: "Events", page: "/resort/events" },
    { name: "Bird & Animal Zone", page: "/resort/bird-zone" },
    { name: "Rooms", page: "/resort/rooms" },
    { name: "Adventure Activities", page: "/resort/adventure-activities" },
    { name: "Banquet Venues", page: "/resort/banquet-venues" },
    { name: "Dining", page: "/resort/dining" },
    { name: "Spa & Wellness", page: "/resort/spa-wellness" }
  ];

  const groups: { label: string; items: { name: string; page: string }[] }[] = [
    {
      label: "Experiences",
      items: [
        { name: "Adventure Activities", page: "/resort/adventure-activities" },
        { name: "Selfie Points", page: "/resort/selfie-points" },
        { name: "Events", page: "/resort/events" },
        { name: "Bird & Animal Zone", page: "/resort/bird-zone" },
      ],
    },
    {
      label: "Venues",
      items: [
        { name: "Banquet Venues", page: "/resort/banquet-venues" },
        { name: "Rooms", page: "/resort/rooms" },
      ],
    },
    { label: "Dining", items: [{ name: "Dining", page: "/resort/dining" }] },
    { label: "Gallery", items: [{ name: "Gallery", page: "/resort/gallery" }] },
    { label: "Spa & Wellness", items: [{ name: "Spa & Wellness", page: "/resort/spa-wellness" }] },
    { label: "Contact", items: [{ name: "Contact", page: "/resort/contact" }] },
  ];

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      {/* Cloudy animated background with rounded corners */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-emerald-300/50 to-teal-300/50 rounded-full blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -25, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -top-8 -right-12 w-40 h-40 bg-gradient-to-br from-blue-300/50 to-purple-300/50 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          <motion.div
            className="absolute top-2 left-1/2 w-32 h-32 bg-gradient-to-br from-orange-300/40 to-pink-300/40 rounded-full blur-2xl"
            animate={{
              x: [0, 25, 0],
              y: [0, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-1/4 w-36 h-36 bg-gradient-to-br from-cyan-300/40 to-indigo-300/40 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 25, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
          />
        </div>
      </div>
      
      {/* Main header content */}
      <div className="relative container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Image src="https://fortviewresort.com/public/logo.png" alt="Fort View Resorts" width={32} height={32} />
            <span className="text-lg sm:text-xl font-bold text-gray-900">Fort View Resorts</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 relative">
            {groups.map((group) => {
              const isSingle = group.items.length === 1;
              const active = group.items.some((it) => it.page === currentPage);
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup((v) => (v === group.label ? null : v))}
                >
                  {isSingle ? (
                    <Link href={group.items[0].page}>
                      <motion.div
                        whileHover={{ scale: 1.06, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                          active
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                            : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {group.label}
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                        active
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                          : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {group.label}
                    </motion.div>
                  )}

                  {group.items.length > 1 && (
                    <AnimatePresence>
                      {openGroup === group.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur border border-gray-200 shadow-xl overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {group.items.map((it, idx) => (
                              <Link key={it.name} href={it.page}>
                                <motion.div
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                  className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                    currentPage === it.page
                                      ? "text-emerald-700 bg-emerald-50"
                                      : "text-gray-700 hover:bg-gray-50 hover:text-emerald-700"
                                  }`}
                                >
                                  {it.name}
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+91 9545 301 888</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-full shadow-lg">
                Book Now
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-20 left-4 right-4 z-40 lg:hidden rounded-2xl"
            >
              <div className="py-6 bg-white/95 backdrop-blur-xl max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl shadow-xl border border-white/20">
                <nav className="flex flex-col space-y-2 px-2">
                  {navItems.map((item, index) => (
                    <Link key={item.name} href={item.page}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.12 }}
                        onClick={() => setIsMenuOpen(false)}
                        whileHover={{ scale: 1.01 }}
                        className={`text-left py-3 px-4 rounded-xl transition-all duration-300 cursor-pointer ${
                          currentPage === item.page 
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg" 
                            : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                </nav>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-gray-200/50 mt-4 px-2"
                >
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 px-4">
                    <Phone className="w-4 h-4" />
                    <span>+91 9545 301 888</span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-lg">
                      Book Now
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}