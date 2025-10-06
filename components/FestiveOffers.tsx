"use client"
import { FestiveOfferPopup, useFestiveOfferPopup } from "./FestiveOfferPopup";
import { useGetActiveOffersQuery } from "@/redux/apis/offerApi";
import { useEffect, useState } from "react";

// Hook to get the first active offer
function useBestOffer() {
  const { data: offers = [], isLoading, error } = useGetActiveOffersQuery();
  const [bestOffer, setBestOffer] = useState<any | null>(null);

  useEffect(() => {
    console.log('Offers data:', { offers, isLoading, error });
    
    if (offers.length > 0) {
      // Get the first active offer (ordered by order field)
      const selectedOffer = offers[0];
      console.log('Selected offer:', selectedOffer);
      
      if (selectedOffer && selectedOffer.image?.url) {
        setBestOffer({
          imageUrl: selectedOffer.image.url
        });
        console.log('Best offer set:', selectedOffer.image.url);
      }
    }
  }, [offers, isLoading, error]);

  return { bestOffer, isLoading, error };
}

// Main component that shows the appropriate popup
export function FestiveOfferManager() {
  const { bestOffer, isLoading, error } = useBestOffer();
  const { isOpen, closePopup, handleCtaClick } = useFestiveOfferPopup(2); // 2 second delay

  console.log('FestiveOfferManager state:', { bestOffer, isLoading, error, isOpen });

  // Don't show popup if loading, error, or no offer available
  if (isLoading || error || !bestOffer) {
    console.log('Not showing popup because:', { isLoading, error, hasBestOffer: !!bestOffer });
    return null;
  }

  return (
    <>
      {isOpen && bestOffer && (
        <FestiveOfferPopup
          imageUrl={bestOffer.imageUrl}
          onClose={closePopup}
          onCtaClick={handleCtaClick}
        />
      )}
    </>
  );
}

