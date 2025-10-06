"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useDeleteContactMutation, type Contact } from "@/redux/apis/contactApi";
import { Trash2 } from "lucide-react";

export function ContactsTable({ contacts, isLoading }: { contacts: Contact[]; isLoading: boolean }) {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const rows = useMemo(() => contacts ?? [], [contacts]);

  const handleDelete = async (id: string) => {
    try {
      await deleteContact(id).unwrap();
    } catch (e) {
      // no-op; could add toast here if available
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-10 text-center text-gray-500">Loading contacts…</div>
    );
  }

  if (!rows.length) {
    return (
      <div className="w-full py-10 text-center text-gray-500">No contacts found.</div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((c) => (
            <tr key={c._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{c.name}</td>
              <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{c.email}</td>
              <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{c.mobile}</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <div className="max-w-xl line-clamp-2" title={c.message}>{c.message}</div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <Button variant="outline" size="sm" onClick={() => handleDelete(c._id)} disabled={isDeleting}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


