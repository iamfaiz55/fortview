"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Store,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetFoodStallsQuery,
  useCreateFoodStallMutation,
  useUpdateFoodStallMutation,
  useDeleteFoodStallMutation,
  useToggleFoodStallStatusMutation,
  type FoodStall,
  type CreateFoodStallRequest,
  type UpdateFoodStallRequest,
} from "@/redux/apis/foodStallApi";

export default function FoodStallManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStall, setEditingStall] = useState<FoodStall | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    order: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // RTK Query hooks
  const { data: stallsResponse, isLoading, error } = useGetFoodStallsQuery();
  const [createStall, { isLoading: isCreating }] = useCreateFoodStallMutation();
  const [updateStall, { isLoading: isUpdating }] = useUpdateFoodStallMutation();
  const [deleteStall, { isLoading: isDeleting }] = useDeleteFoodStallMutation();
  const [toggleStallStatus] = useToggleFoodStallStatusMutation();

  const stalls = stallsResponse?.data || [];
  const loading = isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile && !editingStall) {
      toast.error("Please select an image");
      return;
    }

    try {
      if (editingStall) {
        const updateData: UpdateFoodStallRequest = {
          id: editingStall._id,
          title: formData.title,
          description: formData.description,
          location: formData.location,
          order: formData.order,
          isActive: formData.isActive,
          ...(imageFile && { image: imageFile }),
        };

        await updateStall(updateData).unwrap();
        toast.success("Food stall updated successfully");
      } else {
        const createData: CreateFoodStallRequest = {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          order: formData.order,
          isActive: formData.isActive,
          image: imageFile!,
        };

        await createStall(createData).unwrap();
        toast.success("Food stall created successfully");
      }

      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save food stall");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      order: 0,
      isActive: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingStall(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (stall: FoodStall) => {
    setEditingStall(stall);
    setFormData({
      title: stall.title,
      description: stall.description || "",
      location: stall.location || "",
      order: stall.order,
      isActive: stall.isActive,
    });
    setImagePreview(stall.image?.url || null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStall(id).unwrap();
      toast.success("Food stall deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete food stall");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStallStatus(id).unwrap();
      toast.success("Status updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Food Stalls</h2>
          <p className="text-gray-600 text-sm">Manage your food stalls and vendors</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Food Stall
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[min(95vw,48rem)] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{editingStall ? "Edit Food Stall" : "Add New Food Stall"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <Label htmlFor="title">Stall Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  placeholder="Describe the food stall..."
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
                  placeholder="e.g., Main Dining Area, Poolside, etc."
                />
              </div>

              {/* Order */}
              <div>
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData((p) => ({ ...p, order: parseInt(e.target.value || "0", 10) }))}
                />
              </div>

              {/* Image */}
              <div>
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required={!editingStall} />
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
                  {isCreating || isUpdating ? "Saving..." : editingStall ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Food Stalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stalls.map((stall) => {
          return (
            <Card key={stall._id} className="overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={stall.image?.url || "/placeholder-stall.jpg"}
                  alt={stall.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />

                {/* Active/Inactive badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant={stall.isActive ? "default" : "secondary"} className="text-xs">
                    {stall.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                {/* Actions dropdown */}
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

                    <DropdownMenuContent
                      align="end"
                      sideOffset={6}
                      className="z-[60] w-44 rounded-md !bg-white !text-gray-900 border border-gray-200 shadow-lg"
                    >
                      <DropdownMenuItem onClick={() => handleEdit(stall)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleToggleStatus(stall._id)}>
                        {stall.isActive ? (
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
                              This action cannot be undone. This will permanently delete the food stall.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(stall._id)}>
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
                      <Store className="w-4 h-4 text-emerald-500" />
                      <CardTitle className="text-base sm:text-lg truncate">{stall.title}</CardTitle>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{stall.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  {stall.location && (
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Location:</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="truncate">{stall.location}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Order:</span>
                    <span>{stall.order}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {stalls.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Store className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No food stalls yet</h3>
            <p>Get started by adding your first food stall</p>
          </div>
        </div>
      )}
    </div>
  );
}
