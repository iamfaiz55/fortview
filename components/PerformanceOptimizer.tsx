'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  imageLoadTime: number;
}

export function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    // Monitor page load
    const handleLoad = () => {
      const loadTime = performance.now() - startTime;
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;
      
      setMetrics({
        loadTime: Math.round(loadTime),
        renderTime: Math.round(performance.now() - startTime),
        memoryUsage: Math.round((endMemory - startMemory) / 1024 / 1024), // MB
        imageLoadTime: 0, // Will be updated by image components
      });

      // Show metrics for 3 seconds
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    };

    // Monitor image loading
    const handleImageLoad = (event: Event) => {
      const img = event.target as HTMLImageElement;
      const loadTime = performance.now() - startTime;
      
      setMetrics(prev => prev ? {
        ...prev,
        imageLoadTime: Math.round(loadTime)
      } : null);
    };

    // Add event listeners
    window.addEventListener('load', handleLoad);
    document.addEventListener('load', handleImageLoad, true);

    return () => {
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('load', handleImageLoad, true);
    };
  }, []);

  if (!metrics || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg text-xs font-mono backdrop-blur-sm"
      >
        <div className="space-y-1">
          <div className="text-green-400 font-bold">Performance Metrics</div>
          <div>Load: {metrics.loadTime}ms</div>
          <div>Render: {metrics.renderTime}ms</div>
          <div>Memory: {metrics.memoryUsage}MB</div>
          <div>Images: {metrics.imageLoadTime}ms</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

