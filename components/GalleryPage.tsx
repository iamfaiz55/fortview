'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Image as ImageIcon, Video, ChevronDown } from 'lucide-react';
import { useGetActiveGalleryItemsQuery } from '@/redux/apis/galleryApi';
import { GalleryItem } from '@/redux/apis/galleryApi';
import { GalleryViewer } from './GalleryViewer';
import { LoadingSpinner } from './LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useLazyLoad } from '@/hooks/useLazyLoad';

export function GalleryPage() {
  const { data: galleryItems = [], isLoading, error } = useGetActiveGalleryItemsQuery();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);
  const { loadedImages, handleImageLoad, observeElement } = useLazyLoad();

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
    setIsViewerOpen(true);
  };

  const handleViewerClose = () => {
    setIsViewerOpen(false);
  };

  const handleNavigate = (index: number) => {
    setSelectedIndex(index);
  };

  const handleShowMore = () => {
    setVisibleItems(prev => Math.min(prev + 6, galleryItems.length));
  };


  // Load first 6 images immediately
  useEffect(() => {
    const initialImages = Math.min(6, galleryItems.length);
    for (let i = 0; i < initialImages; i++) {
      handleImageLoad(i);
    }
  }, [galleryItems.length]);

  // Simple 2-column layout - no complex masonry
  const getItemClass = (index: number) => {
    return 'col-span-1'; // Always 1 column in a 2-column grid
  };

  const displayedItems = galleryItems.slice(0, visibleItems);
  const hasMoreItems = visibleItems < galleryItems.length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load gallery</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Gallery Items</h2>
          <p className="text-gray-600">Gallery items will appear here once they are added.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resort Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our beautiful resort through stunning images and videos
          </p>
        </div>

        {/* Simple 2-Column Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {displayedItems.map((item, index) => {
            const itemClass = getItemClass(index);
            const isLoaded = loadedImages.has(index);
            
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 ${itemClass}`}
                onClick={() => handleItemClick(index)}
                data-index={index}
                ref={observeElement}
              >
                {/* Loading Skeleton */}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Actual Content */}
                <AnimatePresence>
                  {isLoaded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.media.url}
                          alt="Gallery item"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                          <video
                            src={item.media.url}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            loading="lazy"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                              <Play className="w-8 h-8 text-white ml-1" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm">
                          {item.type === 'image' ? (
                            <ImageIcon className="w-3 h-3" />
                          ) : (
                            <Video className="w-3 h-3" />
                          )}
                          {item.type}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Show More Button */}
        {hasMoreItems && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={handleShowMore}
              variant="outline"
              className="gap-2 px-6 py-3"
            >
              <ChevronDown className="h-4 w-4" />
              Show More ({galleryItems.length - visibleItems} remaining)
            </Button>
          </motion.div>
        )}

        {/* Gallery Viewer */}
        <GalleryViewer
          items={galleryItems}
          currentIndex={selectedIndex}
          isOpen={isViewerOpen}
          onClose={handleViewerClose}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}