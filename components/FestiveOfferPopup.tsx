"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface OfferPopupProps {
  imageUrl: string;
  onClose: () => void;
  onCtaClick: () => void;
}


export function FestiveOfferPopup({
  imageUrl,
  onClose,
  onCtaClick
}: OfferPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 640px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => {
      mq.removeEventListener?.("change", set);
    };
  }, []);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit:   { opacity: 0, transition: { duration: 0.2 } },
  };

  const cardInitial = shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 };
  const cardAnimate = shouldReduce
    ? { opacity: 1 }
    : {
        opacity: 1,
        y: 0,
        scale: 1,
      };
  const cardExit = shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        // ABOVE navbar (navbar <= z-[70])
        className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

        {/* Popup */}
        <motion.div
          initial={cardInitial}
          animate={cardAnimate}
          exit={cardExit}
          transition={shouldReduce ? { duration: 0.3 } : { type: "spring", stiffness: 340, damping: 26, mass: 0.9 }}
          className="relative z-[90] w-full max-w-[95vw] sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Close */}
          <motion.button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white/90 hover:bg-white backdrop-blur-sm text-gray-800 rounded-full p-1.5 sm:p-2 transition"
            whileTap={{ scale: 0.95 }}
            aria-label="Close offer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={shouldReduce ? {} : { scale: 0.8, opacity: 0 }}
              animate={shouldReduce ? {} : { scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                delay: 0.1 
              }}
              className="relative flex items-center justify-center min-h-[60vh] sm:min-h-[70vh]"
            >
              <img
                src={imageUrl}
                alt="Special Offer"
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain"
                loading="lazy"
              />
              
              {/* Overlay with CTA */}
              <motion.div
                initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
                animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-6"
              >
                <div className="text-center">
                  <motion.div
                    initial={shouldReduce ? {} : { opacity: 0, scale: 0.9 }}
                    animate={shouldReduce ? {} : { opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      onClick={onCtaClick}
                      className="w-full bg-white text-gray-800 hover:bg-gray-100 font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg transition"
                      size="lg"
                    >
                      View Offer
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}


// Hook to manage popup state
export function useFestiveOfferPopup(showDelay: number = 2) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log('Setting up popup timer with delay:', showDelay);
    // Show popup after specified delay (convert to milliseconds)
    const timer = setTimeout(() => {
      console.log('Popup timer triggered, setting isOpen to true');
      setIsOpen(true);
    }, showDelay * 1000);
    return () => clearTimeout(timer);
  }, [showDelay]);

  const closePopup = () => {
    console.log('Closing popup');
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    // Scroll to booking section or open booking modal
    const bookingSection = document.getElementById('booking') || document.getElementById('contact');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    closePopup();
  };

  console.log('Popup state:', { isOpen, showDelay });

  return {
    isOpen,
    closePopup,
    handleCtaClick
  };
}
