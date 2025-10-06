'use client';

import { Suspense } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { AdminWrapper } from '@/components/admin/admin-wrapper';
import { RoutePrefetcher } from '@/components/admin/route-prefetcher';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminWrapper>
      <RoutePrefetcher />
      <AdminLayout>
        <Suspense fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }>
          {children}
        </Suspense>
      </AdminLayout>
    </AdminWrapper>
  );
}
