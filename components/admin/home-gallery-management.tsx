"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Eye,
  EyeOff,
  Star,
  MapPin,
  Users,
  Waves,
  Calendar,
  Users2,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetHomeGalleryItemsQuery,
  useCreateHomeGalleryItemMutation,
  useUpdateHomeGalleryItemMutation,
  useDeleteHomeGalleryItemMutation,
  useToggleHomeGalleryItemStatusMutation,
  type HomeGalleryItem,
  type CreateHomeGalleryItemRequest,
  type UpdateHomeGalleryItemRequest,
} from "@/redux/apis/homeGalleryApi";

const iconOptions = [
  { value: "Waves", label: "Waves", icon: <Waves className="w-4 h-4" /> },
  { value: "MapPin", label: "Map Pin", icon: <MapPin className="w-4 h-4" /> },
  { value: "Users", label: "Users", icon: <Users className="w-4 h-4" /> },
  { value: "Star", label: "Star", icon: <Star className="w-4 h-4" /> },
  { value: "Calendar", label: "Calendar", icon: <Calendar className="w-4 h-4" /> },
  { value: "Users2", label: "Users 2", icon: <Users2 className="w-4 h-4" /> },
];

const categoryOptions = [
  "Natural Attractions",
  "Resort Grounds",
  "Family Activities",
  "Accommodations",
  "Dining",
  "Events",
  "Spa & Wellness",
  "Adventure",
  "Entertainment",
];

export default function HomeGalleryManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HomeGalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    category: "",
    capacity: "",
    area: "",
    features: [] as string[],
    rating: "",
    icon: "Waves",
    order: 0,
    isActive: true,
  });
  const [featureInput, setFeatureInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // RTK Query hooks
  const { data: galleryResponse, isLoading, error } = useGetHomeGalleryItemsQuery();
  const [createGalleryItem, { isLoading: isCreating }] = useCreateHomeGalleryItemMutation();
  const [updateGalleryItem, { isLoading: isUpdating }] = useUpdateHomeGalleryItemMutation();
  const [deleteGalleryItem, { isLoading: isDeleting }] = useDeleteHomeGalleryItemMutation();
  const [toggleGalleryItemStatus] = useToggleHomeGalleryItemStatusMutation();

  const galleryItems = galleryResponse?.data || [];
  const loading = isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile && !editingItem) {
      toast.error("Please select an image");
      return;
    }

    try {
      if (editingItem) {
        const updateData: UpdateHomeGalleryItemRequest = {
          id: editingItem._id,
          title: formData.title,
          description: formData.description,
          detailedDescription: formData.detailedDescription,
          category: formData.category,
          capacity: formData.capacity,
          area: formData.area,
          features: formData.features,
          rating: formData.rating ? parseFloat(formData.rating) : undefined,
          icon: formData.icon,
          order: formData.order,
          isActive: formData.isActive,
          ...(imageFile && { image: imageFile }),
        };

        await updateGalleryItem(updateData).unwrap();
        toast.success("Gallery item updated successfully");
      } else {
        const createData: CreateHomeGalleryItemRequest = {
          title: formData.title,
          description: formData.description,
          detailedDescription: formData.detailedDescription,
          category: formData.category,
          capacity: formData.capacity,
          area: formData.area,
          features: formData.features,
          rating: formData.rating ? parseFloat(formData.rating) : undefined,
          icon: formData.icon,
          order: formData.order,
          isActive: formData.isActive,
          image: imageFile!,
        };

        await createGalleryItem(createData).unwrap();
        toast.success("Gallery item created successfully");
      }

      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save gallery item");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      detailedDescription: "",
      category: "",
      capacity: "",
      area: "",
      features: [],
      rating: "",
      icon: "Waves",
      order: 0,
      isActive: true,
    });
    setFeatureInput("");
    setImageFile(null);
    setImagePreview(null);
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: HomeGalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      detailedDescription: item.detailedDescription,
      category: item.category,
      capacity: item.capacity,
      area: item.area,
      features: item.features,
      rating: item.rating?.toString() || "",
      icon: item.icon,
      order: item.order,
      isActive: item.isActive,
    });
    setImagePreview(item.image.url);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGalleryItem(id).unwrap();
      toast.success("Gallery item deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete gallery item");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleGalleryItemStatus(id).unwrap();
      toast.success("Status updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }))
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find((o) => o.value === iconName);
    return iconOption ? iconOption.icon : <Waves className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }
 
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Gallery Items</h2>
          <p className="text-gray-600 text-sm">Manage your home gallery section</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Gallery Item
            </Button>
          </DialogTrigger>

          {/* Mobile-friendly dialog width & height */}
          <DialogContent className="w-[min(95vw,48rem)] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((p) => ({ ...p, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  required
                />
              </div>

              {/* Detailed Description */}
              <div>
                <Label htmlFor="detailedDescription">Detailed Description</Label>
                <Textarea
                  id="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={(e) => setFormData((p) => ({ ...p, detailedDescription: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              {/* Capacity & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    value={formData.capacity}
                    onChange={(e) => setFormData((p) => ({ ...p, capacity: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData((p) => ({ ...p, area: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Rating & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating (0–5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData((p) => ({ ...p, rating: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData((p) => ({ ...p, order: parseInt(e.target.value || "0", 10) }))}
                  />
                </div>
              </div>

              {/* Icon */}
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select value={formData.icon} onValueChange={(value) => setFormData((p) => ({ ...p, icon: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          {opt.icon}
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Features */}
              <div>
                <Label>Features</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Add a feature"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddFeature} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, i) => (
                    <Badge key={`${feature}-${i}`} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="ml-1 hover:text-red-500"
                        aria-label={`Remove ${feature}`}
                        title={`Remove ${feature}`}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div>
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required={!editingItem} />
                {imagePreview && (
                  <div className="mt-2">
                    <ImageWithFallback
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={150}
                      className="rounded-lg border object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Active */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData((p) => ({ ...p, isActive: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating || isUpdating} className="w-full sm:w-auto">
                  {isCreating || isUpdating ? "Saving..." : editingItem ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {galleryItems.map((item) => {
          return (
            <Card key={item._id} className="overflow-hidden">
            <div className="relative">
              {/* keep the image area tall enough on phones for the menu button */}
              <ImageWithFallback
                src={item.image.url}
                alt={item.title}
                width={800}
                height={480}
                className="w-full h-44 sm:h-48 object-cover"
              />

              {/* Active/Inactive badge */}
              <div className="absolute top-2 left-2 z-10">
                <Badge variant={item.isActive ? "default" : "secondary"} className="text-xs">
                  {item.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

            {/* FIXED: portal + solid surface + high z-index */}
<div className="absolute top-2 right-2 z-50">
  <DropdownMenu>
  <DropdownMenuTrigger asChild>
      <Button
        size="icon"
        className="h-10 w-10 rounded-full !bg-white !text-gray-900 hover:!bg-white shadow-md border border-black/10 relative z-0"
        aria-label="Open actions"
      >
        <MoreVertical className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>

    {/* Force render in a portal so overflow on Card doesn't clip it */}
    <DropdownMenuContent
      align="end"
      sideOffset={6}
      className="
        z-[60] w-44 rounded-md
        !bg-white !text-gray-900
        border border-gray-200 shadow-lg
      "
    >
        <DropdownMenuItem onClick={() => handleEdit(item)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => handleToggleStatus(item._id)}>
          {item.isActive ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Deactivate
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Activate
            </>
          )}
        </DropdownMenuItem>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the gallery item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(item._id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
  </DropdownMenu>
</div>

            </div>

            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {getIconComponent(item.icon)}
                    <CardTitle className="text-base sm:text-lg truncate">{item.title}</CardTitle>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Category:</span>
                  <Badge variant="outline" className="whitespace-nowrap">{item.category}</Badge>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Capacity:</span>
                  <span className="truncate">{item.capacity}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Area:</span>
                  <span className="truncate">{item.area}</span>
                </div>

                {typeof item.rating === "number" && (
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Order:</span>
                  <span>{item.order}</span>
                </div>

                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-700 mb-1">Features:</div>
                  <ul className="space-y-1">
                    {item.features.slice(0, 5).map((feature, i) => (
                      <li key={`${feature}-${i}`} className="text-xs text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                    {item.features.length > 5 && (
                      <li className="text-xs text-gray-500 italic">
                        +{item.features.length - 5} more features
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          );
        })}
      </div>

      {galleryItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Waves className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No gallery items yet</h3>
            <p>Get started by adding your first gallery item</p>
          </div>
        </div>
      )}
    </div>
  );
}

