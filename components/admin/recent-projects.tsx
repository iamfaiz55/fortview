'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RecentProjects() {
  // Mock data - replace with real data from API
  const projects = [
    {
      id: 1,
      name: 'Homepage Carousel Update',
      status: 'completed',
      lastModified: '2 hours ago',
    },
    {
      id: 2,
      name: 'Gallery Optimization',
      status: 'in-progress',
      lastModified: '1 day ago',
    },
    {
      id: 3,
      name: 'Contact Form Enhancement',
      status: 'pending',
      lastModified: '3 days ago',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
        <CardDescription>
          Latest updates and modifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="text-xs text-gray-500">{project.lastModified}</p>
              </div>
              <Badge className={getStatusColor(project.status)}>
                {project.status.replace('-', ' ')}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
