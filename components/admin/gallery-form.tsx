'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image as ImageIcon, Video, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateGalleryItemMutation, useUpdateGalleryItemMutation } from '@/redux/apis/galleryApi';
import { GalleryItem } from '@/redux/apis/galleryApi';
import { toast } from 'sonner';

const gallerySchema = z.object({
  type: z.enum(['image', 'video'], {
    required_error: 'Please select a media type',
  }),
  media: z.instanceof(File, 'Media file is required'),
});

type GalleryFormData = z.infer<typeof gallerySchema>;

interface GalleryFormProps {
  item?: GalleryItem | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function GalleryForm({ item, onClose, onSuccess }: GalleryFormProps) {
  const [createGalleryItem, { isLoading: isCreating }] = useCreateGalleryItemMutation();
  const [updateGalleryItem, { isLoading: isUpdating }] = useUpdateGalleryItemMutation();

  const isEditing = !!item;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      type: 'image',
      media: undefined as any,
    },
  });

  const watchedType = watch('type');
  const watchedMedia = watch('media');

  useEffect(() => {
    if (item) {
      reset({
        type: item.type,
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: GalleryFormData) => {
    try {
      if (isEditing && item) {
        await updateGalleryItem({
          id: item._id,
          type: data.type,
          media: data.media,
        }).unwrap();
        toast.success('Gallery item updated successfully');
      } else {
        await createGalleryItem({
          type: data.type,
          media: data.media,
        }).unwrap();
        toast.success('Gallery item created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update gallery item' : 'Failed to create gallery item');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('media', file);
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
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-950 rounded-xl shadow-2xl"
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2">
                {watchedType === 'video' ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <ImageIcon className="h-5 w-5" />
                )}
                {isEditing ? 'Edit Gallery Item' : 'Add New Gallery Item'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Media Type *</Label>
                  <Select
                    value={watchedType}
                    onValueChange={(value) => setValue('type', value as 'image' | 'video')}
                  >
                    <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">
                        <span className="flex items-center gap-2">
                          <ImageIcon className="h-4 w-4" />
                          Image
                        </span>
                      </SelectItem>
                      <SelectItem value="video">
                        <span className="flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Video
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-red-500">{errors.type.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="media">Media File *</Label>
                  <div className="relative">
                    <Input
                      id="media"
                      type="file"
                      accept={watchedType === 'video' ? 'video/*' : 'image/*'}
                      onChange={handleFileChange}
                      className={errors.media ? 'border-red-500' : ''}
                    />
                    <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.media && (
                    <p className="text-sm text-red-500">{errors.media.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {watchedType === 'video' 
                      ? 'Upload a video file (MP4, MOV, etc.)' 
                      : 'Upload an image file (JPG, PNG, etc.)'
                    }
                  </p>
                </div>

                {/* Current Media Preview */}
                {isEditing && item && !watchedMedia && (
                  <div className="space-y-2">
                    <Label>Current Media</Label>
                    <div className="aspect-video rounded-lg overflow-hidden border">
                      {item.type === 'image' ? (
                        <img
                          src={item.media.url}
                          alt="Current media"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.media.url}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* New Media Preview */}
                {watchedMedia && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="aspect-video rounded-lg overflow-hidden border">
                      {watchedType === 'image' ? (
                        <img
                          src={URL.createObjectURL(watchedMedia)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={URL.createObjectURL(watchedMedia)}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : isEditing ? 'Update Item' : 'Add Item'}
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
