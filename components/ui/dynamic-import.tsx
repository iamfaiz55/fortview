'use client';

import { ComponentType, lazy, Suspense } from 'react';
import { CardSkeleton } from './loading-skeleton';

interface DynamicImportProps {
  fallback?: React.ReactNode;
  delay?: number;
}

// Higher-order component for dynamic imports with loading states
export function withDynamicImport<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc);

  return function DynamicComponent(props: T & DynamicImportProps) {
    const { fallback: propFallback, delay = 0, ...rest } = props as any;
    
    return (
      <Suspense fallback={propFallback || fallback || <CardSkeleton />}>
        <LazyComponent {...(rest as T)} />
      </Suspense>
    );
  };
}

// Pre-configured dynamic imports for common components
export const DynamicGallerySection = withDynamicImport(
  () => import('@/components/HomeGallerySection'),
  <CardSkeleton className="h-96" />
);

export const DynamicActivitiesSection = withDynamicImport(
  () => import('@/components/ActivitiesSection'),
  <CardSkeleton className="h-96" />
);

export const DynamicOfferManager = withDynamicImport(
  () => import('@/components/FestiveOffers').then(module => ({ default: module.FestiveOfferManager })),
  null
);

export const DynamicAdminOffers = withDynamicImport(
  () => import('@/components/admin/offer-management'),
  <CardSkeleton className="h-96" />
);

