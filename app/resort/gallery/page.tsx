import { GalleryPageOptimized } from "@/components/GalleryPageOptimized";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Gallery() {
  return (
    <div className="min-h-screen">
      <Header />
      <GalleryPageOptimized />
      <Footer />
    </div>
  );
}

