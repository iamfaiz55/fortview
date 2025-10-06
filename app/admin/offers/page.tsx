'use client';

import { motion } from 'framer-motion';
import { OfferManagement } from '@/components/admin/offer-management';

export default function AdminOffersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Offer Management</h1>
        <p className="text-gray-600 mt-2">
          Create and manage promotional offers and popups for your website
        </p>
      </div>
      <OfferManagement />
    </motion.div>
  );
}
