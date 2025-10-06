"use client";

import FoodStallManagement from '@/components/admin/food-stall-management';

export default function FoodStallsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Food Stalls Management</h1>
        <p className="text-gray-600 mt-2">
          Manage the food stalls and vendors available at the resort
        </p>
      </div>
      
      <FoodStallManagement />
    </div>
  );
}
