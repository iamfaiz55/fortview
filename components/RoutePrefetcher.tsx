"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function RoutePrefetcher() {
  const pathname = usePathname();

  useEffect(() => {
    // Preload critical routes on mount
    const criticalRoutes = [
      '/resort/gallery',
      '/resort/awards',
      '/resort/events',
      '/resort/contact',
      '/resort/games',
      '/resort/selfie-points',
      '/resort/rooms',
      '/resort/adventure-activities',
      '/resort/banquet-venues',
      '/resort/dining',
      '/resort/spa-wellness',
      '/resort/bird-zone'
    ];

    // Preload routes after a short delay
    const timer = setTimeout(() => {
      criticalRoutes.forEach(route => {
        // Create a hidden link to trigger prefetch
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Preload on hover for better UX
  const handleMouseEnter = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  return null; // This component doesn't render anything
}
