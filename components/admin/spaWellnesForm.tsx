'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { useSpaWellness, CreateSpaWellnessData, UpdateSpaWellnessData, SpaWellnessItem } from '@/hooks/useSpaWellness';
import { toast } from 'sonner';
import { CreateSpaWellnessData, SpaWellnessItem, UpdateSpaWellnessData, useSpaWellness } from '@/hooks/useSpaAndWEllness';

const spaWellnessSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  location: z.string().min(1, 'Location is required').max(200, 'Location must be less than 200 characters'),
  services: z.array(z.string().min(1, 'Service cannot be empty')).min(1, 'At least one service is required'),
  contact: z.string().max(100, 'Contact must be less than 100 characters').optional(),
  rating: z.number().min(0).max(5).optional(),
  order: z.number().min(1, 'Order must be at least 1').optional(),
});

type SpaWellnessFormData = z.infer<typeof spaWellnessSchema>;

interface SpaWellnessFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingItem?: SpaWellnessItem | null;
}

export function SpaWellnessForm({ isOpen, onClose, onSuccess, editingItem }: SpaWellnessFormProps) {
  const { createSpaWellness, updateSpaWellness, loading } = useSpaWellness();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [servicesInput, setServicesInput] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<SpaWellnessFormData>({
    resolver: zodResolver(spaWellnessSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      services: [],
      contact: '',
      rating: undefined,
      order: undefined,
    },
  });

  const isEditing = !!editingItem;

  useEffect(() => {
    if (editingItem) {
      setValue('name', editingItem.name);
      setValue('description', editingItem.description || '');
      setValue('location', editingItem.location);
      setValue('services', editingItem.services || []);
      setValue('contact', editingItem.contact || '');
      setValue('rating', editingItem.rating);
      setValue('order', editingItem.order);
      setImagePreview(editingItem.image.url);
      setServicesInput((editingItem.services || []).join(', '));
    } else {
      reset();
      setImage(null);
      setImagePreview('');
      setServicesInput('');
    }
  }, [editingItem, setValue, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleServicesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServicesInput(e.target.value);
    const servicesArr = e.target.value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    setValue('services', servicesArr);
  };

  const onSubmit = async (data: SpaWellnessFormData) => {
    try {
      if (isEditing) {
        const updateData: UpdateSpaWellnessData = {
          name: data.name,
          description: data.description,
          location: data.location,
          services: data.services,
          contact: data.contact,
          rating: data.rating,
          order: data.order,
        };
        if (image) updateData.image = image;

        await updateSpaWellness(editingItem._id, updateData);
        toast.success('Spa & Wellness item updated successfully');
      } else {
        if (!image) {
          toast.error('Please select an image');
          return;
        }
        const createData: CreateSpaWellnessData = {
          name: data.name,
          description: data.description,
          location: data.location,
          services: data.services,
          contact: data.contact,
          rating: data.rating,
          order: data.order,
          image,
        };
        await createSpaWellness(createData);
        toast.success('Spa & Wellness item created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update item' : 'Failed to create item');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold">
                {isEditing ? 'Edit Spa & Wellness Item' : 'Add New Spa & Wellness Item'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Enter spa & wellness name"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        {...register('description')}
                        placeholder="Enter description"
                        rows={4}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        {...register('location')}
                        placeholder="Enter location"
                      />
                      {errors.location && (
                        <p className="text-sm text-red-600 mt-1">{errors.location.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="services">Services *</Label>
                      <Input
                        id="services"
                        value={servicesInput}
                        onChange={handleServicesChange}
                        placeholder="Enter services separated by commas"
                      />
                      {errors.services && (
                        <p className="text-sm text-red-600 mt-1">{errors.services.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="contact">Contact</Label>
                      <Input
                        id="contact"
                        {...register('contact')}
                        placeholder="Enter contact info"
                      />
                      {errors.contact && (
                        <p className="text-sm text-red-600 mt-1">{errors.contact.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        {...register('rating', { valueAsNumber: true })}
                        placeholder="Enter rating (0-5)"
                        type="number"
                        min={0}
                        max={5}
                        step={0.1}
                      />
                      {errors.rating && (
                        <p className="text-sm text-red-600 mt-1">{errors.rating.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="order">Order</Label>
                      <Input
                        id="order"
                        {...register('order', { valueAsNumber: true })}
                        placeholder="Enter order number"
                        type="number"
                      />
                      {errors.order && (
                        <p className="text-sm text-red-600 mt-1">{errors.order.message}</p>
                      )}
                    </div>
                  </div>
                  {/* Image Upload */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Image *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="spa-image"
                        />
                        <label
                          htmlFor="spa-image"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                        >
                          {imagePreview ? (
                            <div className="relative w-full aspect-video">
                              <img
                                src={imagePreview}
                                alt="Spa preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400" />
                              <span className="text-sm text-gray-600">Click to upload image</span>
                            </>
                          )}
                        </label>
                      </div>
                      {!isEditing && !image && (
                        <p className="text-sm text-red-600">Image is required</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {isEditing ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      isEditing ? 'Update Item' : 'Create Item'
                    )}
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