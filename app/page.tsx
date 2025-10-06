import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DynamicHeroSection } from "@/components/DynamicHeroSection";
import { AboutSection } from "@/components/AboutSection";
import { PreFooterCTA } from "@/components/PreFooterCTA";
import { HomeGallerySection } from "@/components/HomeGallerySection";
import { HomeGamesSection } from "@/components/HomeGamesSection";
import { ActivitiesSection } from "@/components/ActivitiesSection";
import { FestiveOfferManager } from "@/components/FestiveOffers";
import AwardsSection from "@/components/AwardsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <DynamicHeroSection />
        <HomeGallerySection />
        <HomeGamesSection />
        <AboutSection />
        <ActivitiesSection />
        <CTASection />
        <PreFooterCTA />
        <AwardsSection />
      </main>
      <Footer />
      
      {/* Festive Offer Popup */}
      <FestiveOfferManager />
    </div>
  );
}
