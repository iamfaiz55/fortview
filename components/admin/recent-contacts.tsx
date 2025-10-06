'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RecentContacts() {
  // Mock data - replace with real data from API
  const contacts = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Interested in booking a room...',
      status: 'unread',
      timestamp: '1 hour ago',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'Question about spa services...',
      status: 'read',
      timestamp: '3 hours ago',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      message: 'Event booking inquiry...',
      status: 'unread',
      timestamp: '5 hours ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contacts</CardTitle>
        <CardDescription>
          Latest messages from visitors
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(contact.status)}>
                    {contact.status}
                  </Badge>
                  <span className="text-xs text-gray-500">{contact.timestamp}</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{contact.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
