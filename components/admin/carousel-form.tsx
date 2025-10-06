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
import { useCarousel, CreateCarouselData, UpdateCarouselData, CarouselItem } from '@/hooks/useCarousel';
import { toast } from 'sonner';

const carouselSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  buttonText: z.string().max(50, 'Button text must be less than 50 characters').optional(),
  buttonLink: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  order: z.number().min(1, 'Order must be at least 1').optional(),
});

type CarouselFormData = z.infer<typeof carouselSchema>;

interface CarouselFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingItem?: CarouselItem | null;
}

export function CarouselForm({ isOpen, onClose, onSuccess, editingItem }: CarouselFormProps) {
  const { createCarousel, updateCarousel, loading } = useCarousel();
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string>('');
  const [mobilePreview, setMobilePreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CarouselFormData>({
    resolver: zodResolver(carouselSchema),
    defaultValues: {
      title: '',
      description: '',
      buttonText: '',
      buttonLink: '',
      order: undefined,
    },
  });

  const isEditing = !!editingItem;

  useEffect(() => {
    if (editingItem) {
      setValue('title', editingItem.title);
      setValue('description', editingItem.description);
      setValue('buttonText', editingItem.buttonText || '');
      setValue('buttonLink', editingItem.buttonLink || '');
      setValue('order', editingItem.order);
      setDesktopPreview(editingItem.desktopImage.url);
      setMobilePreview(editingItem.mobileImage.url);
    } else {
      reset();
      setDesktopImage(null);
      setMobileImage(null);
      setDesktopPreview('');
      setMobilePreview('');
    }
  }, [editingItem, setValue, reset]);

  const handleDesktopImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDesktopImage(file);
      const reader = new FileReader();
      reader.onload = () => setDesktopPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMobileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMobileImage(file);
      const reader = new FileReader();
      reader.onload = () => setMobilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CarouselFormData) => {
    try {
      if (isEditing) {
        const updateData: UpdateCarouselData = {
          title: data.title,
          description: data.description,
          buttonText: data.buttonText,
          buttonLink: data.buttonLink,
          order: data.order,
        };

        if (desktopImage) updateData.desktopImage = desktopImage;
        if (mobileImage) updateData.mobileImage = mobileImage;

        await updateCarousel(editingItem._id, updateData);
        toast.success('Carousel item updated successfully');
      } else {
        if (!desktopImage || !mobileImage) {
          toast.error('Please select both desktop and mobile images');
          return;
        }

        const createData: CreateCarouselData = {
          title: data.title,
          description: data.description,
          buttonText: data.buttonText,
          buttonLink: data.buttonLink,
          order: data.order,
          desktopImage,
          mobileImage,
        };

        await createCarousel(createData);
        toast.success('Carousel item created successfully');
      }

      onSuccess();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update carousel item' : 'Failed to create carousel item');
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
                {isEditing ? 'Edit Carousel Item' : 'Add New Carousel Item'}
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
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        {...register('title')}
                        placeholder="Enter carousel title"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        {...register('description')}
                        placeholder="Enter carousel description"
                        rows={4}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="buttonText">Button Text</Label>
                      <Input
                        id="buttonText"
                        {...register('buttonText')}
                        placeholder="Enter button text (optional)"
                      />
                      {errors.buttonText && (
                        <p className="text-sm text-red-600 mt-1">{errors.buttonText.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="buttonLink">Button Link</Label>
                      <Input
                        id="buttonLink"
                        {...register('buttonLink')}
                        placeholder="Enter button link (optional)"
                        type="url"
                      />
                      {errors.buttonLink && (
                        <p className="text-sm text-red-600 mt-1">{errors.buttonLink.message}</p>
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

                  {/* Image Uploads */}
                  <div className="space-y-6">
                    {/* Desktop Image */}
                    <div className="space-y-2">
                      <Label>Desktop Image *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleDesktopImageChange}
                          className="hidden"
                          id="desktop-image"
                        />
                        <label
                          htmlFor="desktop-image"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                        >
                          {desktopPreview ? (
                            <div className="relative w-full aspect-video">
                              <img
                                src={desktopPreview}
                                alt="Desktop preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 text-gray-400" />
                              <span className="text-sm text-gray-600">Click to upload desktop image</span>
                            </>
                          )}
                        </label>
                      </div>
                      {!isEditing && !desktopImage && (
                        <p className="text-sm text-red-600">Desktop image is required</p>
                      )}
                    </div>

                    {/* Mobile Image */}
                    <div className="space-y-2">
                      <Label>Mobile Image *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMobileImageChange}
                          className="hidden"
                          id="mobile-image"
                        />
                        <label
                          htmlFor="mobile-image"
                          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                        >
                          {mobilePreview ? (
                            <div className="relative w-full max-w-[200px] aspect-[9/16] mx-auto">
                              <img
                                src={mobilePreview}
                                alt="Mobile preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          ) : (
                            <>
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                              <span className="text-sm text-gray-600">Click to upload mobile image</span>
                            </>
                          )}
                        </label>
                      </div>
                      {!isEditing && !mobileImage && (
                        <p className="text-sm text-red-600">Mobile image is required</p>
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
