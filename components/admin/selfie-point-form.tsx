"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Camera, Upload, X } from "lucide-react";
import { motion } from "framer-motion";
import { SelfiePoint } from "@/redux/apis/selfiePointApi";

interface SelfiePointFormProps {
  selfiePoint?: SelfiePoint | null;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SelfiePointForm({ 
  selfiePoint, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: SelfiePointFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    order: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (selfiePoint) {
      console.log('Setting up form for editing:', selfiePoint);
      setFormData({
        title: selfiePoint.title,
        description: selfiePoint.description,
        order: selfiePoint.order,
        isActive: selfiePoint.isActive,
      });
      setImagePreview(selfiePoint.image.url);
      console.log('Image preview set to:', selfiePoint.image.url);
    } else {
      console.log('Setting up form for creating new selfie point');
      setFormData({
        title: "",
        description: "",
        order: 0,
        isActive: true,
      });
      setImagePreview("");
    }
  }, [selfiePoint]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      isActive: checked
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('Image change event:', { file, hasFile: !!file });
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        console.log('File reader result:', result.substring(0, 50) + '...');
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    } else {
      // Reset to original image if no file selected
      if (selfiePoint) {
        console.log('Resetting to original image:', selfiePoint.image.url);
        setImagePreview(selfiePoint.image.url);
        setImageFile(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('order', formData.order.toString());
    submitData.append('isActive', formData.isActive.toString());
    
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    onSubmit(submitData);
  };

  const removeImage = () => {
    setImageFile(null);
    if (selfiePoint) {
      setImagePreview(selfiePoint.image.url);
    } else {
      setImagePreview("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {selfiePoint ? 'Edit Selfie Point' : 'Add New Selfie Point'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter selfie point title"
              required
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter selfie point description"
              required
              rows={4}
              className="w-full resize-none"
            />
          </div>

          {/* Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleInputChange}
              placeholder="Enter display order"
              min="0"
              className="w-full"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Image *</Label>
            <div className="space-y-4">
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                    <ImageWithFallback
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* File Input */}
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 10MB)</p>
                  </div>
                    <input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!selfiePoint && !imagePreview}
                    />
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                selfiePoint ? 'Update Selfie Point' : 'Create Selfie Point'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

