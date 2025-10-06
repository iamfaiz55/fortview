'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useCreateOfferMutation, useUpdateOfferMutation } from '@/redux/apis/offerApi';
import { Offer } from '@/redux/apis/offerApi';
import { toast } from 'sonner';

const offerSchema = z.object({
  image: z.instanceof(File, 'Image is required'),
  isActive: z.boolean(),
  order: z.number().min(0, 'Order must be at least 0'),
});

type OfferFormData = z.infer<typeof offerSchema>;

interface OfferFormProps {
  offer?: Offer | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function OfferForm({ offer, onClose, onSuccess }: OfferFormProps) {
  const [createOffer, { isLoading: isCreating }] = useCreateOfferMutation();
  const [updateOffer, { isLoading: isUpdating }] = useUpdateOfferMutation();

  const isEditing = !!offer;
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      image: undefined as any,
      isActive: true,
      order: 0,
    },
  });

  useEffect(() => {
    if (offer) {
      reset({
        isActive: offer.isActive,
        order: offer.order,
      });
    }
  }, [offer, reset]);

  const onSubmit = async (data: OfferFormData) => {
    try {
      if (isEditing && offer) {
        await updateOffer({
          id: offer._id,
          isActive: data.isActive,
          order: data.order,
          image: data.image,
        }).unwrap();
        toast.success('Offer updated successfully');
      } else {
        await createOffer(data).unwrap();
        toast.success('Offer created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update offer' : 'Failed to create offer');
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
                <Gift className="h-5 w-5" />
                {isEditing ? 'Edit Offer' : 'Create New Offer'}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="image">Offer Image *</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue('image', file);
                      }
                    }}
                    className={errors.image ? 'border-red-500' : ''}
                  />
                  {errors.image && (
                    <p className="text-sm text-red-500">{errors.image.message}</p>
                  )}
                  {isEditing && offer?.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-2">Current image:</p>
                      <img
                        src={offer.image.url}
                        alt="Current offer"
                        className="w-32 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="order">Order</Label>
                    <Input
                      id="order"
                      type="number"
                      min="0"
                      {...register('order', { valueAsNumber: true })}
                      className={errors.order ? 'border-red-500' : ''}
                    />
                    {errors.order && (
                      <p className="text-sm text-red-500">{errors.order.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isActive">Status</Label>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        id="isActive"
                        checked={watch('isActive')}
                        onCheckedChange={(checked) => setValue('isActive', checked)}
                      />
                      <Label htmlFor="isActive" className="text-sm">
                        {watch('isActive') ? 'Active' : 'Inactive'}
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : isEditing ? 'Update Offer' : 'Create Offer'}
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
