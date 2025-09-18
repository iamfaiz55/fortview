"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { FestiveOfferPopup } from "./FestiveOfferPopup";

// Demo component to test different festival popups
export function FestivePopupDemo() {
  const [activePopup, setActivePopup] = useState<"diwali" | "holi" | "general" | null>(null);

  const handleCtaClick = () => {
    alert("Redirecting to booking page...");
    setActivePopup(null);
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Festive Offer Popup Demo</h2>
      
      <div className="flex gap-4">
        <Button 
          onClick={() => setActivePopup("diwali")}
          className="bg-yellow-500 hover:bg-yellow-600"
        >
          Show Diwali Popup
        </Button>
        
        <Button 
          onClick={() => setActivePopup("holi")}
          className="bg-pink-500 hover:bg-pink-600"
        >
          Show Holi Popup
        </Button>
        
        <Button 
          onClick={() => setActivePopup("general")}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          Show General Popup
        </Button>
      </div>

      {/* Diwali Popup */}
      {activePopup === "diwali" && (
        <FestiveOfferPopup
          festival="diwali"
          title="Diwali Special! 🪔"
          subtitle="Light up your holidays with our exclusive offers"
          offer="Book your stay during the Festival of Lights"
          discount="UP TO 40% OFF"
          validUntil="November 15, 2024"
          ctaText="Book Now & Celebrate Diwali"
          onClose={() => setActivePopup(null)}
          onCtaClick={handleCtaClick}
        />
      )}

      {/* Holi Popup */}
      {activePopup === "holi" && (
        <FestiveOfferPopup
          festival="holi"
          title="Holi Celebration! 🌈"
          subtitle="Join us for the most colorful festival"
          offer="Special Holi packages with traditional celebrations"
          discount="30% OFF"
          validUntil="March 25, 2024"
          ctaText="Join Holi Festivities"
          onClose={() => setActivePopup(null)}
          onCtaClick={handleCtaClick}
        />
      )}

      {/* General Popup */}
      {activePopup === "general" && (
        <FestiveOfferPopup
          festival="general"
          title="Special Offer! ✨"
          subtitle="Exclusive deals just for you"
          offer="Book your perfect getaway today"
          discount="25% OFF"
          validUntil="December 31, 2024"
          ctaText="Claim Your Offer"
          onClose={() => setActivePopup(null)}
          onCtaClick={handleCtaClick}
        />
      )}
    </div>
  );
}
