"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Star, Sparkles, Flame, Droplets } from "lucide-react";
import { Button } from "./ui/button";

interface OfferPopupProps {
  festival: "diwali" | "holi" | "general";
  title: string;
  subtitle: string;
  offer: string;
  discount: string;
  validUntil: string;
  ctaText: string;
  onClose: () => void;
  onCtaClick: () => void;
}

const festivalThemes = {
  diwali: {
    bgGradient: "from-yellow-400 via-orange-500 to-red-600",
    textColor: "text-yellow-100",
    accentColor: "text-yellow-300",
    borderColor: "border-yellow-400",
    icon: <Sparkles className="w-8 h-8 text-yellow-300" />,
    particles: "✨🎆🎇🕯️💫",
    animation: "animate-pulse"
  },
  holi: {
    bgGradient: "from-pink-400 via-purple-500 to-blue-500",
    textColor: "text-white",
    accentColor: "text-pink-200",
    borderColor: "border-pink-400",
    icon: <Droplets className="w-8 h-8 text-pink-300" />,
    particles: "🌈🎨🎉💕🌸",
    animation: "animate-bounce"
  },
  general: {
    bgGradient: "from-emerald-400 via-teal-500 to-blue-600",
    textColor: "text-white",
    accentColor: "text-emerald-200",
    borderColor: "border-emerald-400",
    icon: <Gift className="w-8 h-8 text-emerald-300" />,
    particles: "🎁✨💎🌟🎊",
    animation: "animate-pulse"
  }
};

export function FestiveOfferPopup({
  festival,
  title,
  subtitle,
  offer,
  discount,
  validUntil,
  ctaText,
  onClose,
  onCtaClick
}: OfferPopupProps) {
  const [showParticles, setShowParticles] = useState(false);
  const theme = festivalThemes[festival];

  useEffect(() => {
    // Show particles after a short delay
    const timer = setTimeout(() => setShowParticles(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const particleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: 0
    },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0.8],
      rotate: [0, 180, 360],
      y: [0, -20, -40],
      transition: {
        duration: 2,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 1
      }
    })
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Popup Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.6
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8,
            y: 50,
            transition: { duration: 0.3 }
          }}
          className={`relative max-w-md w-full bg-gradient-to-br ${theme.bgGradient} rounded-3xl shadow-2xl overflow-hidden border-2 ${theme.borderColor}`}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Floating Particles */}
          {showParticles && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {theme.particles.split('').map((particle, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={particleVariants}
                  initial="hidden"
                  animate="visible"
                  className={`absolute text-2xl ${theme.animation}`}
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${20 + (i * 10)}%`,
                  }}
                >
                  {particle}
                </motion.div>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 p-8 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", damping: 15 }}
              className="flex justify-center mb-6"
            >
              {theme.icon}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-3xl font-bold ${theme.textColor} mb-2`}
            >
              {title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-lg ${theme.accentColor} mb-6`}
            >
              {subtitle}
            </motion.p>

            {/* Offer Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/30"
            >
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Star className="w-6 h-6 text-yellow-300 fill-current" />
                <span className="text-2xl font-bold text-white">{discount}</span>
                <Star className="w-6 h-6 text-yellow-300 fill-current" />
              </div>
              <p className={`text-sm ${theme.accentColor} mb-2`}>{offer}</p>
              <p className={`text-xs ${theme.accentColor} opacity-80`}>
                Valid until {validUntil}
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={onCtaClick}
                className="w-full bg-white text-gray-800 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                size="lg"
              >
                {ctaText}
              </Button>
            </motion.div>

            {/* Festival Message */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`text-xs ${theme.accentColor} mt-4 opacity-80`}
            >
              {festival === "diwali" && "🌟 Celebrate the Festival of Lights with us! 🌟"}
              {festival === "holi" && "🌈 Let's paint the town with joy and colors! 🌈"}
              {festival === "general" && "✨ Special offers just for you! ✨"}
            </motion.p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-2 -left-2 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full blur-xl" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to manage popup state
export function useFestiveOfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem('festive-offer-shown');
    if (!shown) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    setHasShown(true);
    // Mark as shown in session storage
    sessionStorage.setItem('festive-offer-shown', 'true');
  };

  const handleCtaClick = () => {
    // Scroll to booking section or open booking modal
    const bookingSection = document.getElementById('booking') || document.getElementById('contact');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    closePopup();
  };

  return {
    isOpen,
    closePopup,
    handleCtaClick
  };
}
