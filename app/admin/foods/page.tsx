"use client";

import FoodManagement from '@/components/admin/food-management';

export default function FoodsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Food Management</h1>
        <p className="text-gray-600 mt-2">
          Manage the food items and dishes available at the resort
        </p>
      </div>
      
      <FoodManagement />
    </div>
  );
}
