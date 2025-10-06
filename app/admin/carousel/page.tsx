'use client';

import { motion } from 'framer-motion';
import { CarouselManagement } from '@/components/admin/carousel-management';

export default function CarouselPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Carousel Management</h1>
      </div>
      <CarouselManagement />
    </motion.div>
  );
}
