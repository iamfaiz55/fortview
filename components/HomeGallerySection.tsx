"use client"
import { OptimizedImage } from "./ui/optimized-image";
import { LazyWrapper } from "./ui/lazy-wrapper";
import { GallerySkeleton, CardSkeleton } from "./ui/loading-skeleton";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Users, Waves, Star, Calendar, Users2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useGetHomeGalleryItemsQuery, type HomeGalleryItem } from "@/redux/apis/homeGalleryApi";

export function HomeGallerySection() {
  const [selectedImage, setSelectedImage] = useState<HomeGalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch gallery items using RTK Query with caching
  const { data: galleryResponse, isLoading, error } = useGetHomeGalleryItemsQuery({ active: true });
  
  const galleryItems = useMemo(() => {
    const items = galleryResponse?.data || [];
    console.log('Gallery items loaded:', items.length, 'items');
    console.log('First item:', items[0]);
    return items;
  }, [galleryResponse?.data]);
  const loading = isLoading;

  const handleImageClick = (item: HomeGalleryItem) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing selectedImage to prevent flicker
    setTimeout(() => setSelectedImage(null), 300);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || !selectedImage) return;

      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          // Navigate to previous thumbnail if available
          
        case 'ArrowRight':
          e.preventDefault();
         
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedImage, closeModal]);

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Waves': <Waves className="w-5 h-5" />,
      'MapPin': <MapPin className="w-5 h-5" />,
      'Users': <Users className="w-5 h-5" />,
      'Star': <Star className="w-5 h-5" />,
      'Calendar': <Calendar className="w-5 h-5" />,
      'Users2': <Users2 className="w-5 h-5" />,
    };
    return iconMap[iconName] || <Waves className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Our Resort
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A vibrant collection of attractions and facilities – designed to surprise and delight.
            </p>
          </div>
          <GallerySkeleton count={8} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Our Resort
            </h2>
            <p className="text-lg text-red-600 max-w-3xl mx-auto">
              Failed to load gallery items. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Our Resort
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Gallery items will be displayed here once they are added by the admin.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Our Resort
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A vibrant collection of attractions and facilities – designed to surprise and delight.
          </p>
        </div>

        {/* Responsive Gallery Grid with Lazy Loading */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item: HomeGalleryItem, index: number) => {
            console.log('Rendering gallery item:', index, item.title, item.image?.url);
            return (
              <motion.div
                key={item._id}
                className="relative group overflow-hidden rounded-3xl shadow-xl cursor-pointer bg-white hover:shadow-2xl transition-all duration-500"
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => handleImageClick(item)}
              >
                {/* Image Container */}
                <div className="aspect-square sm:aspect-[2/1] md:aspect-[16/10] overflow-hidden relative">
                  <ImageWithFallback
                    src={item.image.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    quality={75}
                    priority={index < 4} // Prioritize first 4 images
                  />
                </div>

                {/* Overlay Info */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/30 rounded-lg p-2 text-white text-xs sm:text-sm">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="truncate">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => (!open ? closeModal() : null)}>
      <DialogContent
  className={`
     z-[9999]
     w-[min(96vw,1100px)] max-h-[92vh] overflow-y-auto p-0
     bg-white text-slate-900
     border border-neutral-200 shadow-2xl
     rounded-xl sm:rounded-2xl
     backdrop-blur-sm
     dark:bg-neutral-900 dark:text-neutral-100 dark:border-white/10
     data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
     data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
  `}
>

    {selectedImage && (
      <>
        <DialogTitle className="sr-only">
          {selectedImage.title} - {selectedImage.category}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {selectedImage.detailedDescription}. Capacity: {selectedImage.capacity}. Area: {selectedImage.area}.
          {/* {selectedImage.duration && ` Duration: ${selectedImage.duration}.`} */}
          {/* {selectedImage.pricing && ` Pricing: ${selectedImage.pricing}.`} */}
        </DialogDescription>

        {/* Main layout: allow scroll on mobile, contain on desktop */}
        <div className="relative flex w-full flex-col lg:flex-row">
          {/* Sticky Close */}
          <button
            onClick={closeModal}
            className="
              sticky top-[max(0.75rem,env(safe-area-inset-top))] self-end z-30 mr-3
              rounded-full p-2 sm:p-3 border
              bg-white/90 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500
              border-neutral-200 shadow-md
              dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white
              transition-all
            "
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* LEFT COLUMN: Image (flex-1) + Thumbnails (shrink-0) */}
          <div className="lg:w-2/3 flex flex-col min-h-0">
            {/* Image canvas */}
            <div
              className="
                relative flex-1 min-h-0
                h-[38vh] sm:h-[48vh] lg:h-auto
                flex items-center justify-center
                bg-neutral-50 px-2 sm:px-4 pb-2
                dark:bg-black/90
              "
            >
              <ImageWithFallback
                src={selectedImage.image.url}
                alt={selectedImage.title}
                width={1400}
                height={900}
                className="w-auto h-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-xl"
                quality={80}
                priority
              />
            </div>

          
          </div>

          {/* RIGHT PANEL: Header (fixed) + Body (scroll) */}
          <aside
            className="
              lg:w-1/3 min-h-0
              border-t lg:border-t-0 lg:border-l
              border-neutral-200 dark:border-white/10
              bg-gradient-to-b from-white to-neutral-50
              dark:from-neutral-900 dark:to-neutral-900
              p-4 sm:p-6 lg:p-7
              flex flex-col gap-6
            "
          >
            {/* Header stays visible */}
            <header className="flex items-start justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="text-emerald-600 dark:text-emerald-400">{getIconComponent(selectedImage.icon)}</div>
                <div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold leading-snug">
                    {selectedImage.title}
                  </h2>
                  <span
                    className="
                      text-xs sm:text-sm
                      text-emerald-700 bg-emerald-50
                      dark:text-emerald-300 dark:bg-emerald-500/20
                      px-2 py-0.5 rounded-full
                    "
                  >
                    {selectedImage.category}
                  </span>
                </div>
              </div>
              {selectedImage.rating && (
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm sm:text-base">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  <span className="font-semibold">{selectedImage.rating}</span>
                </div>
              )}
            </header>

            {/* Scrollable body – never conflicts with thumbnails */}
            <div className="pr-1 [&>*+*]:mt-6 mt-2 py-10">
              {/* Description */}
              <section>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 ">Description</h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-gray-200 leading-relaxed ">
                  {selectedImage.detailedDescription}
                </p>
              </section>

              {/* Details */}
              <section>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Details</h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                    <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                      Capacity
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{selectedImage.capacity}</div>
                  </div>
                  <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                    <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                      Area
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{selectedImage.area}</div>
                  </div>
                  {/* {selectedImage.duration && (
                    <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                      <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                        Duration
                      </div>
                      <div className="font-semibold text-sm sm:text-base">{selectedImage.duration}</div>
                    </div>
                  )} */}
                  {/* {selectedImage.pricing && (
                    <div className="rounded-lg p-3 sm:p-4 border border-neutral-200 bg-white dark:bg-white/10 dark:border-white/10">
                      <div className="text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium mb-1">
                        Pricing
                      </div>
                      <div className="font-semibold text-sm sm:text-base">{selectedImage.pricing}</div>
                    </div>
                  )} */}
                </div>
              </section>

              {/* Features */}
              <section>
                <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-3">Features</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedImage.features.map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      className="
                        px-2 sm:px-3 py-1 sm:py-1.5 rounded-full
                        text-[11px] sm:text-xs font-medium
                        bg-emerald-50 text-emerald-700
                        dark:bg-emerald-500/20 dark:text-emerald-300
                      "
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>





    </section>
  );
}