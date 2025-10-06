'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const adminRoutes = [
  '/admin',
  '/admin/carousel',
  '/admin/home-gallery',
  '/admin/activities',
  '/admin/adventure-activities',
  '/admin/selfie-points',
  '/admin/offers',
  '/admin/contact',
];

export function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch all admin routes when the component mounts
    const prefetchRoutes = async () => {
      for (const route of adminRoutes) {
        try {
          router.prefetch(route);
        } catch (error) {
          // Silently fail prefetching errors
          console.debug('Prefetch failed for route:', route);
        }
      }
    };

    // Delay prefetching slightly to not block initial render
    const timeoutId = setTimeout(prefetchRoutes, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [router]);

  return null; // This component doesn't render anything
}
