'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, DollarSign, Users, Tag, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateEventMutation, useUpdateEventMutation } from '@/redux/apis/eventApi';
import { Event } from '@/redux/apis/eventApi';
import { toast } from 'sonner';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be less than 1000 characters'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(1, 'Location is required').max(200, 'Location must be less than 200 characters'),
  image: z.instanceof(File, 'Event image is required'),
  price: z.number().min(0, 'Price must be positive').optional(),
  capacity: z.number().min(1, 'Capacity must be at least 1').optional(),
  category: z.string().min(1, 'Category is required'),
  isActive: z.boolean(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  event?: Event | null;
  onClose: () => void;
  onSuccess: () => void;
}

const eventCategories = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Conference',
  'Seminar',
  'Workshop',
  'Festival',
  'Concert',
  'Exhibition',
  'Other'
];

export function EventForm({ event, onClose, onSuccess }: EventFormProps) {
  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  const isEditing = !!event;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image: undefined as any,
      price: undefined,
      capacity: undefined,
      category: '',
      isActive: true,
    },
  });

  const watchedImage = watch('image');
  const watchedPrice = watch('price');
  const watchedCapacity = watch('capacity');

  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        description: event.description,
        date: event.date.split('T')[0], // Convert to YYYY-MM-DD format
        time: event.time,
        location: event.location,
        price: event.price,
        capacity: event.capacity,
        category: event.category,
        isActive: event.isActive,
      });
    }
  }, [event, reset]);

  const onSubmit = async (data: EventFormData) => {
    try {
      if (isEditing && event) {
        await updateEvent({
          id: event._id,
          title: data.title,
          description: data.description,
          date: data.date,
          time: data.time,
          location: data.location,
          image: data.image,
          price: data.price,
          capacity: data.capacity,
          category: data.category,
          isActive: data.isActive,
        }).unwrap();
        toast.success('Event updated successfully');
      } else {
        await createEvent({
          title: data.title,
          description: data.description,
          date: data.date,
          time: data.time,
          location: data.location,
          image: data.image,
          price: data.price,
          capacity: data.capacity,
          category: data.category,
          isActive: data.isActive,
        }).unwrap();
        toast.success('Event created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update event' : 'Failed to create event');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-950 rounded-xl shadow-2xl"
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {isEditing ? 'Edit Event' : 'Add New Event'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      className={errors.title ? 'border-red-500' : ''}
                      placeholder="Enter event title"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={watch('category')}
                      onValueChange={(value) => setValue('category', value)}
                    >
                      <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500">{errors.category.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    className={errors.description ? 'border-red-500' : ''}
                    placeholder="Enter event description"
                    rows={3}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      {...register('date')}
                      className={errors.date ? 'border-red-500' : ''}
                    />
                    {errors.date && (
                      <p className="text-sm text-red-500">{errors.date.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      {...register('time')}
                      className={errors.time ? 'border-red-500' : ''}
                    />
                    {errors.time && (
                      <p className="text-sm text-red-500">{errors.time.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      {...register('location')}
                      className={errors.location ? 'border-red-500' : ''}
                      placeholder="Enter location"
                    />
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (Optional)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      {...register('price', { valueAsNumber: true })}
                      className={errors.price ? 'border-red-500' : ''}
                      placeholder="Enter price"
                    />
                    {errors.price && (
                      <p className="text-sm text-red-500">{errors.price.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity (Optional)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min="1"
                      {...register('capacity', { valueAsNumber: true })}
                      className={errors.capacity ? 'border-red-500' : ''}
                      placeholder="Enter capacity"
                    />
                    {errors.capacity && (
                      <p className="text-sm text-red-500">{errors.capacity.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Event Image *</Label>
                  <div className="relative">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={errors.image ? 'border-red-500' : ''}
                    />
                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Upload an image for the event (JPG, PNG, etc.)
                  </p>
                </div>

                {/* Current Image Preview */}
                {isEditing && event && !watchedImage && (
                  <div className="space-y-2">
                    <Label>Current Image</Label>
                    <div className="aspect-video rounded-lg overflow-hidden border">
                      <img
                        src={event.image.url}
                        alt="Current event image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* New Image Preview */}
                {watchedImage && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="aspect-video rounded-lg overflow-hidden border">
                      <img
                        src={URL.createObjectURL(watchedImage)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    {...register('isActive')}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isActive">Active (visible to users)</Label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
