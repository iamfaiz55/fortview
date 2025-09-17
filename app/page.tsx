import { ActivitiesSection } from "@/components/ActivitiesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { HomeGallerySection } from "@/components/HomeGallerySection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { PreFooterCTA } from "@/components/PreFooterCTA";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HomeGallerySection />
        <AboutSection />
        <ActivitiesSection />
        <CTASection />
        <PreFooterCTA />
      </main>
      <Footer />
    </div>
  );
}
