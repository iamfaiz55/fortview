import { GalleryPreviewPage } from "@/components/GalleryPreviewPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Suspense } from "react";

export default function GalleryPreview() {
  return (
    <div className="min-h-screen">
      <Header />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <GalleryPreviewPage />
      </Suspense>
      <Footer />
    </div>
  );
}