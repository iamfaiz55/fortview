"use client"
import { FestiveOfferPopup, useFestiveOfferPopup } from "./FestiveOfferPopup";

// Festival offer configurations
export const festivalOffers = {
  diwali: {
    festival: "diwali" as const,
    title: "Diwali Special! 🪔",
    subtitle: "Light up your holidays with our exclusive offers",
    offer: "Book your stay during the Festival of Lights",
    discount: "UP TO 40% OFF",
    validUntil: "November 15, 2024",
    ctaText: "Book Now & Celebrate Diwali"
  },
  holi: {
    festival: "holi" as const,
    title: "Holi Celebration! 🌈",
    subtitle: "Join us for the most colorful festival",
    offer: "Special Holi packages with traditional celebrations",
    discount: "30% OFF",
    validUntil: "March 25, 2024",
    ctaText: "Join Holi Festivities"
  },
  general: {
    festival: "general" as const,
    title: "Special Offer! ✨",
    subtitle: "Exclusive deals just for you",
    offer: "Book your perfect getaway today",
    discount: "25% OFF",
    validUntil: "December 31, 2024",
    ctaText: "Claim Your Offer"
  }
};

// Function to get current festival based on date
export function getCurrentFestival() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  // Diwali (October-November)
  if (month === 10 || month === 11) {
    return "diwali";
  }
  
  // Holi (March)
  if (month === 3) {
    return "holi";
  }

  // Default to general offer
  return "general";
}

// Main component that shows the appropriate popup
export function FestiveOfferManager() {
  const { isOpen, closePopup, handleCtaClick } = useFestiveOfferPopup();
  const currentFestival = getCurrentFestival();
  const offer = festivalOffers[currentFestival];

  return (
    <>
      {isOpen && (
        <FestiveOfferPopup
          {...offer}
          onClose={closePopup}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );
}

// Individual festival popup components for manual control
export function DiwaliOfferPopup() {
  const { isOpen, closePopup, handleCtaClick } = useFestiveOfferPopup();

  return (
    <>
      {isOpen && (
        <FestiveOfferPopup
          {...festivalOffers.diwali}
          onClose={closePopup}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );
}

export function HoliOfferPopup() {
  const { isOpen, closePopup, handleCtaClick } = useFestiveOfferPopup();

  return (
    <>
      {isOpen && (
        <FestiveOfferPopup
          {...festivalOffers.holi}
          onClose={closePopup}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );
}

export function GeneralOfferPopup() {
  const { isOpen, closePopup, handleCtaClick } = useFestiveOfferPopup();

  return (
    <>
      {isOpen && (
        <FestiveOfferPopup
          {...festivalOffers.general}
          onClose={closePopup}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );
}
