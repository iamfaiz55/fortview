'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LazyWrapperProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  animation?: boolean;
  delay?: number;
}

export function LazyWrapper({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
  animation = true,
  delay = 0,
}: LazyWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setHasBeenVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  if (!hasBeenVisible && fallback) {
    return (
      <div ref={elementRef} className={className}>
        {fallback}
      </div>
    );
  }

  if (!isVisible) {
    return (
      <div ref={elementRef} className={className}>
        {fallback}
      </div>
    );
  }

  if (animation) {
    return (
      <motion.div
        ref={elementRef}
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

