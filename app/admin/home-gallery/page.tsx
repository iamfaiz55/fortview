"use client";

import HomeGalleryManagement from '@/components/admin/home-gallery-management';

export default function HomeGalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Home Gallery Management</h1>
        <p className="text-gray-600 mt-2">
          Manage the gallery items displayed on the home page
        </p>
      </div>
      
      <HomeGalleryManagement />
    </div>
  );
}
