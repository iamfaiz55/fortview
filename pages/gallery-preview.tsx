import { GalleryPreviewPage } from "@/components/GalleryPreviewPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function GalleryPreview() {
  return (
    <div className="min-h-screen">
      <Header />
      <GalleryPreviewPage />
      <Footer />
    </div>
  );
}
