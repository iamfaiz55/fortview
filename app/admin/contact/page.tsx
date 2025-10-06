'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGetContactsQuery } from '@/redux/apis/contactApi';
import { Search, Download } from 'lucide-react';
import { ContactsTable } from '@/components/admin/contact-table';

export default function AdminContacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: contacts, isLoading } = useGetContactsQuery();

  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.mobile.includes(searchTerm)
  ) || [];

  const exportToCSV = () => {
    if (!contacts || contacts.length === 0) return;

    const headers = ['Name', 'Email', 'Mobile', 'Message', 'Date'];
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => [
        `"${contact.name}"`,
        `"${contact.email}"`,
        `"${contact.mobile}"`,
        `"${contact.message.replace(/"/g, '""')}"`,
        `"${new Date(contact.createdAt).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Submissions</h1>
        <Button
          onClick={exportToCSV}
          variant="outline"
          className="border-gray-300 dark:border-gray-600"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ContactsTable
        contacts={filteredContacts}
        isLoading={isLoading}
      />
    </motion.div>
  );
}