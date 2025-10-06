'use client';

import { motion } from 'framer-motion';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { RecentProjects } from '@/components/admin/recent-projects';
import { RecentContacts } from '@/components/admin/recent-contacts';

export default function AdminDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentProjects />
        <RecentContacts />
      </div>
    </motion.div>
  );
}