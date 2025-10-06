"use client";

import AwardManagement from '@/components/admin/award-management';

export default function AwardsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Awards Management</h1>
        <p className="text-gray-600 mt-2">
          Manage the awards and recognitions displayed on the website
        </p>
      </div>
      
      <AwardManagement />
    </div>
  );
}
