"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Check if URL is external
const isExternalUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

// Check if URL is a data URL (base64)
const isDataUrl = (url: string) => {
  return url.startsWith('data:');
}

interface ImageWithFallbackProps {
  src?: string | StaticImageData
  alt: string
  className?: string
  style?: React.CSSProperties
  fallbackSrc?: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  sizes?: string
  fill?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
  fallbackSrc = ERROR_IMG_SRC,
  width,
  height,
  priority = false,
  quality = 75,
  sizes,
  fill = false,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    console.warn('Image failed to load:', src);
    setDidError(true);
  };
  
  const handleLoad = () => setIsLoading(false);

  // ✅ Ensure src is always a string
  const resolvedSrc =
    typeof src === "string" ? src : (src as StaticImageData | undefined)?.src || fallbackSrc;

  // If it's a data URL, external URL, or we've had an error, use regular img tag
  if (didError || 
      (typeof resolvedSrc === 'string' && isDataUrl(resolvedSrc)) ||
      (typeof resolvedSrc === 'string' && isExternalUrl(resolvedSrc) && resolvedSrc.includes('via.placeholder.com'))) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src={resolvedSrc} 
            alt={alt} 
            className={`w-full h-full object-cover ${className}`}
            style={style}
            onError={() => {
              // If even the fallback fails, show error state
              const img = document.querySelector(`img[alt="${alt}"]`) as HTMLImageElement;
              if (img) {
                img.src = fallbackSrc;
              }
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={resolvedSrc}
        alt={alt}
        width={fill ? undefined : width || 400}
        height={fill ? undefined : height || 300}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={isExternalUrl(resolvedSrc) || isDataUrl(resolvedSrc)}
        {...rest}
      />
    </div>
  );
}
  