'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateGameMutation, useUpdateGameMutation } from '@/redux/apis/gamesApi';
import { Game } from '@/redux/apis/gamesApi';
import { toast } from 'sonner';
import { Loader2, Upload, X } from 'lucide-react';

const gameSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  isActive: z.boolean(),
  isUpcoming: z.boolean(),
  image: z.any().optional(),
});

type GameFormData = z.infer<typeof gameSchema>;

interface GameFormProps {
  game?: Game;
  onSuccess: () => void;
}

const categoryOptions = [
  { value: 'adult', label: 'Adult' },
  { value: 'child', label: 'Child' },
  { value: 'common', label: 'Common' },
];

export function GameForm({ game, onSuccess }: GameFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(game?.categories || ['common']);
  const [imagePreview, setImagePreview] = useState<string | null>(game?.image?.url || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [createGame, { isLoading: isCreating }] = useCreateGameMutation();
  const [updateGame, { isLoading: isUpdating }] = useUpdateGameMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GameFormData>({
    resolver: zodResolver(gameSchema),
    defaultValues: {
      title: game?.title || '',
      description: game?.description || '',
      categories: game?.categories || ['common'],
      isActive: game?.isActive ?? true,
      isUpcoming: game?.isUpcoming ?? false,
    },
  });

  const isActive = watch('isActive');
  const isUpcoming = watch('isUpcoming');

  useEffect(() => {
    setValue('categories', selectedCategories);
  }, [selectedCategories, setValue]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(game?.image?.url || null);
  };

  const onSubmit = async (data: GameFormData) => {
    try {
      if (!game) {
        // Create new game
        if (!selectedFile) {
          toast.error('Please select an image');
          return;
        }
        await createGame({
          ...data,
          image: selectedFile,
        }).unwrap();
      } else {
        // Update existing game
        await updateGame({
          id: game._id,
          ...data,
          image: selectedFile,
        }).unwrap();
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to save game');
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="Enter game title"
                className={errors.title ? 'border-red-500' : ''}
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
                placeholder="Enter game description"
                rows={4}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <Label>Categories *</Label>
              <div className="space-y-2 mt-2">
                {categoryOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={selectedCategories.includes(option.value)}
                      onCheckedChange={(checked) => handleCategoryChange(option.value, checked as boolean)}
                    />
                    <Label htmlFor={option.value} className="text-sm font-normal">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.categories && (
                <p className="text-sm text-red-600 mt-1">{errors.categories.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Game Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image">Image {!game && '*'}</Label>
              <div className="mt-2">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No image selected</p>
                  </div>
                )}
              </div>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Status Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={isActive}
              onCheckedChange={(checked) => setValue('isActive', checked as boolean)}
            />
            <Label htmlFor="isActive">Active (Visible to users)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isUpcoming"
              checked={isUpcoming}
              onCheckedChange={(checked) => setValue('isUpcoming', checked as boolean)}
            />
            <Label htmlFor="isUpcoming">Upcoming (Mark as upcoming event)</Label>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {game ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            game ? 'Update Game' : 'Create Game'
          )}
        </Button>
      </div>
    </form>
  );
}

