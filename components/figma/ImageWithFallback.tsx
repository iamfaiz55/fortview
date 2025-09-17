"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

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

  const handleError = () => setDidError(true);
  const handleLoad = () => setIsLoading(false);

  // ✅ Ensure src is always a string
  const resolvedSrc =
    typeof src === "string" ? src : (src as StaticImageData | undefined)?.src || fallbackSrc;

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ""}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={fallbackSrc} alt="Error loading image" data-original-url={src as any} />
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
        {...rest}
      />
    </div>
  );
}
  