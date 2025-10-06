"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import { BanquetVenue, CreateBanquetVenueRequest, UpdateBanquetVenueRequest } from "@/redux/apis/banquetVenueApi";
import { useCreateBanquetVenueMutation, useUpdateBanquetVenueMutation } from "@/redux/apis/banquetVenueApi";

interface BanquetVenueFormProps {
  venue?: BanquetVenue;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BanquetVenueForm({ venue, onSuccess, onCancel }: BanquetVenueFormProps) {
  const [createVenue, { isLoading: isCreating }] = useCreateBanquetVenueMutation();
  const [updateVenue, { isLoading: isUpdating }] = useUpdateBanquetVenueMutation();

  const [formData, setFormData] = useState({
    title: venue?.title || "",
    capacity: venue?.capacity || "",
    area: venue?.area || "",
    ac: venue?.ac || "",
    description: venue?.description || "",
    location: venue?.location || "",
    isActive: venue?.isActive ?? true,
    order: venue?.order || 0,
  });

  const [features, setFeatures] = useState<string[]>(venue?.features || []);
  const [pricing, setPricing] = useState({
    basePrice: venue?.pricing?.basePrice || 0,
    currency: venue?.pricing?.currency || "INR",
    includes: venue?.pricing?.includes || [],
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState(venue?.images || []);
  const [newFeature, setNewFeature] = useState("");
  const [newInclude, setNewInclude] = useState("");
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

 

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature("");
    }
  };
  const removeExistingImageById = (publicId: string) => {
    setExistingImages(prev => prev.filter(img => img.publicId !== publicId));
    setImagesToRemove(prev => [...prev, publicId]);
  };
  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const addInclude = () => {
    if (newInclude.trim()) {
      setPricing(prev => ({
        ...prev,
        includes: [...prev.includes, newInclude.trim()]
      }));
      setNewInclude("");
    }
  };

  const removeInclude = (index: number) => {
    setPricing(prev => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index)
    }));
  };

 // 4) Include deletions in the submit payload
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.title || !formData.capacity || !formData.area || !formData.ac || !formData.description) {
    alert("Please fill in all required fields");
    return;
  }

  try {
    if (venue) {
      const updateData: UpdateBanquetVenueRequest = {
        id: venue._id,
        ...formData,
        features: features.length > 0 ? features : undefined,
        pricing: pricing.basePrice > 0 ? pricing : undefined,
        images: images.length > 0 ? images : undefined,
        existingImages: existingImages.length > 0 ? existingImages : undefined,
        imagesToRemove: imagesToRemove.length > 0 ? imagesToRemove : undefined,
      } as UpdateBanquetVenueRequest;
      await updateVenue(updateData).unwrap();
    } else {
      const createData: CreateBanquetVenueRequest = {
        title: formData.title,
        capacity: formData.capacity,
        area: formData.area,
        ac: formData.ac,
        description: formData.description,
        location: formData.location,
        isActive: formData.isActive,
        order: formData.order,
        features: features.length > 0 ? features : undefined,
        pricing: pricing.basePrice > 0 ? pricing : undefined,
        images: images.length > 0 ? images : undefined,
      };
      await createVenue(createData).unwrap();
    }

    onSuccess?.();
  } catch (error) {
    console.error("Error saving banquet venue:", error);
    alert("Error saving banquet venue");
  }
};


  const isLoading = isCreating || isUpdating;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{venue ? "Edit Banquet Venue" : "Add New Banquet Venue"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Diamond Hall"
                required
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange("capacity", e.target.value)}
                placeholder="e.g., Indoor • 500+ Guests"
                required
              />
            </div>
            <div>
              <Label htmlFor="area">Area *</Label>
              <Input
                id="area"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
                placeholder="e.g., 750 sq. ft."
                required
              />
            </div>
            <div>
              <Label htmlFor="ac">AC Status *</Label>
              <Input
                id="ac"
                value={formData.ac}
                onChange={(e) => handleInputChange("ac", e.target.value)}
                placeholder="e.g., Fully Air-Conditioned"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Ground Floor, Main Building"
              />
            </div>
            <div>
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Detailed description of the venue..."
              rows={4}
              required
            />
          </div>

          {/* Features */}
          <div>
            <Label>Features</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                    <span className="text-sm">{feature}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <Label>Pricing Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="basePrice">Base Price</Label>
                <Input
                  id="basePrice"
                  type="number"
                  value={pricing.basePrice}
                  onChange={(e) => setPricing(prev => ({ ...prev, basePrice: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={pricing.currency} onValueChange={(value) => setPricing(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-2">
              <Label>What's Included</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newInclude}
                    onChange={(e) => setNewInclude(e.target.value)}
                    placeholder="Add what's included..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInclude())}
                  />
                  <Button type="button" onClick={addInclude} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pricing.includes.map((include, index) => (
                    <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                      <span className="text-sm">{include}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInclude(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <Label>Images</Label>
            <div className="space-y-4">
              {/* Existing Images */}
              {/* // 3) Existing Images section (replace your existing-images map) */}
{existingImages.length > 0 && (
  <div>
    <Label className="text-sm text-gray-600">Current Images</Label>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
      {existingImages.map((image, index) => (
        <div key={image.publicId || index} className="relative group">
          <img
            src={image.url}
            alt="Venue image"
            className="w-full h-24 object-cover rounded border"
          />

          {/* Delete button: visible on mobile, hover on desktop */}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            aria-label="Remove image"
            onClick={() => removeExistingImageById(image.publicId)}
            className="
              absolute top-1 right-1 h-7 w-7 p-0 rounded-full
              z-20 shadow
              bg-white/90 text-red-600 hover:text-white hover:bg-red-600
              opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity
              flex items-center justify-center
            "
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          {/* Optional subtle overlay on hover (desktop only) */}
          <div
            className="hidden md:block pointer-events-none absolute inset-0 rounded
                       bg-black/0 group-hover:bg-black/10 transition-colors"
          />
        </div>
      ))}
    </div>
  </div>
)}


              {/* New Images */}
              <div>
                <Label className="text-sm text-gray-600">Add New Images</Label>
                <div className="mt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Images
                  </Button>
                </div>
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`New image ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : venue ? "Update Venue" : "Create Venue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
