'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  MoreHorizontal,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetAllEventsQuery, useDeleteEventMutation, useToggleEventStatusMutation } from '@/redux/apis/eventApi';
import { Event } from '@/redux/apis/eventApi';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EventForm } from './event-form';

export function EventManagement() {
  const { data: events = [], isLoading, error, refetch } = useGetAllEventsQuery();
  const [deleteEvent] = useDeleteEventMutation();
  const [toggleEventStatus] = useToggleEventStatusMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    event: Event | null;
  }>({
    isOpen: false,
    event: null,
  });

  const hasEvents = events.length > 0;

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (event: Event) => {
    setDeleteDialog({ isOpen: true, event });
  };

  const handleToggleStatus = async (event: Event) => {
    try {
      await toggleEventStatus(event._id).unwrap();
      toast.success(`Event ${event.isActive ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      toast.error('Failed to toggle event status');
    }
  };

  const confirmDelete = async () => {
    if (deleteDialog.event) {
      try {
        await deleteEvent(deleteDialog.event._id).unwrap();
        toast.success('Event deleted successfully');
        setDeleteDialog({ isOpen: false, event: null });
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
    refetch();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Loading skeleton
  if (isLoading && !hasEvents) {
    return (
      <div className="py-8 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Events
            </h2>
            <p className="text-sm text-gray-500">Loading events…</p>
          </div>
          <div className="h-9 w-28 rounded-md bg-gray-200 dark:bg-neutral-800 animate-pulse" />
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5"
            >
              <div className="aspect-video rounded-lg bg-gray-200 dark:bg-neutral-800 animate-pulse mb-4" />
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-10">
        <div className="text-center">
          <p className="text-red-600">Failed to load events</p>
          <Button onClick={() => refetch()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-10">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Events
          </h2>
          <p className="text-sm text-gray-500">
            {hasEvents ? `${events.length} event${events.length === 1 ? '' : 's'}` : 'No events yet'}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      {!hasEvents ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No events yet
          </h3>
          <p className="text-gray-500 mb-6">
            Add events to showcase your resort's activities and special occasions
          </p>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Event
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden"
            >
              {/* Event Image */}
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={event.image.url}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={event.isActive ? "default" : "secondary"}
                    className="bg-black/50 text-white border-0"
                  >
                    {event.isActive ? (
                      <Eye className="w-3 h-3 mr-1" />
                    ) : (
                      <EyeOff className="w-3 h-3 mr-1" />
                    )}
                    {event.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                {/* Actions Menu */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="bg-black/50 hover:bg-black/70 text-white border-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(event)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(event)}>
                        {event.isActive ? (
                          <EyeOff className="h-4 w-4 mr-2" />
                        ) : (
                          <Eye className="h-4 w-4 mr-2" />
                        )}
                        {event.isActive ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(event)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Event Info */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs ml-2">
                    {event.category}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>

                  {(event.price || event.capacity) && (
                    <div className="flex items-center gap-4">
                      {event.price && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${event.price}</span>
                        </div>
                      )}
                      {event.capacity && (
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{event.capacity} people</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">Order: #{event.order}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <EventForm
          event={editingEvent}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) =>
          setDeleteDialog({ isOpen: open, event: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog.event?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
