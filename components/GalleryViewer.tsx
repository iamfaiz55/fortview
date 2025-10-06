'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GalleryItem } from '@/redux/apis/galleryApi';

interface GalleryViewerProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryViewer({ items, currentIndex, isOpen, onClose, onNavigate }: GalleryViewerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const currentItem = items[currentIndex];
  const isVideo = currentItem?.type === 'video';

  // Handle video play/pause
  const toggleVideoPlay = () => {
    if (videoRef) {
      if (isVideoPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // Handle video mute/unmute
  const toggleVideoMute = () => {
    if (videoRef) {
      videoRef.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Handle video events
  useEffect(() => {
    if (videoRef) {
      const handlePlay = () => setIsVideoPlaying(true);
      const handlePause = () => setIsVideoPlaying(false);
      const handleEnded = () => setIsVideoPlaying(false);

      videoRef.addEventListener('play', handlePlay);
      videoRef.addEventListener('pause', handlePause);
      videoRef.addEventListener('ended', handleEnded);

      return () => {
        videoRef.removeEventListener('play', handlePlay);
        videoRef.removeEventListener('pause', handlePause);
        videoRef.removeEventListener('ended', handleEnded);
      };
    }
  }, [videoRef]);

  // Reset video state when item changes
  useEffect(() => {
    setIsVideoPlaying(false);
    setIsVideoMuted(true);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < items.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
        case ' ':
          if (isVideo) {
            e.preventDefault();
            toggleVideoPlay();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, isVideo, onClose, onNavigate, toggleVideoPlay]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Close Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.1, duration: 0.2 }}
          className="absolute top-16 right-4 z-50"
        >
          <Button
            variant="ghost"
            size="lg"
            className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm hover:scale-105 transition-all duration-200"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </motion.div>

        {/* Navigation Buttons */}
        {items.length > 1 && (
          <>
            {/* Previous Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: currentIndex === 0 ? 0.3 : 0.8, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white transition-all duration-200 hover:scale-110 drop-shadow-lg ${
                currentIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'opacity-80 hover:opacity-100'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex > 0) {
                  onNavigate(currentIndex - 1);
                }
              }}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-12 w-12" />
            </motion.button>

            {/* Next Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: currentIndex === items.length - 1 ? 0.3 : 0.8, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white transition-all duration-200 hover:scale-110 drop-shadow-lg ${
                currentIndex === items.length - 1 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'opacity-80 hover:opacity-100'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (currentIndex < items.length - 1) {
                  onNavigate(currentIndex + 1);
                }
              }}
              disabled={currentIndex === items.length - 1}
            >
              <ChevronRight className="h-12 w-12" />
            </motion.button>
          </>
        )}

        {/* Media Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {isVideo ? (
              <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
                <video
                  ref={setVideoRef}
                  src={currentItem.media.url}
                  className="max-w-full max-h-full object-contain rounded-xl"
                  controls={false}
                  muted={isVideoMuted}
                  loop
                  playsInline
                />
                
                {/* Video Controls */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/70 backdrop-blur-md rounded-full px-4 py-2 shadow-lg"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleVideoPlay}
                    className="text-white hover:bg-white/20 border-0 hover:scale-105 transition-transform"
                  >
                    {isVideoPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleVideoMute}
                    className="text-white hover:bg-white/20 border-0 hover:scale-105 transition-transform"
                  >
                    {isVideoMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.img
                key={currentItem.media.url}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                src={currentItem.media.url}
                alt="Gallery item"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Item Counter */}
        {items.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            {currentIndex + 1} of {items.length}
          </motion.div>
        )}

        {/* Thumbnail Strip (Desktop) */}
        {items.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="hidden md:block absolute bottom-16 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex gap-2 max-w-[80vw] overflow-x-auto pb-2">
              {items.map((item, index) => (
                <motion.button
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(index);
                  }}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                    index === currentIndex
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-white/30 hover:border-white/60'
                  }`}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.media.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
