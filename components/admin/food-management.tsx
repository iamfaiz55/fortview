"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Utensils,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useToggleFoodStatusMutation,
  type Food,
  type CreateFoodRequest,
  type UpdateFoodRequest,
} from "@/redux/apis/foodApi";

const categoryOptions = [
  "Main Course",
  "Appetizers",
  "Desserts",
  "Beverages",
  "Snacks",
  "Salads",
  "Soups",
  "Rice & Dal",
  "Bread",
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
];

export default function FoodManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    order: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // RTK Query hooks
  const { data: foodsResponse, isLoading, error } = useGetFoodsQuery();
  const [createFood, { isLoading: isCreating }] = useCreateFoodMutation();
  const [updateFood, { isLoading: isUpdating }] = useUpdateFoodMutation();
  const [deleteFood, { isLoading: isDeleting }] = useDeleteFoodMutation();
  const [toggleFoodStatus] = useToggleFoodStatusMutation();

  const foods = foodsResponse?.data || [];
  const loading = isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile && !editingFood) {
      toast.error("Please select an image");
      return;
    }

    try {
      if (editingFood) {
        const updateData: UpdateFoodRequest = {
          id: editingFood._id,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          order: formData.order,
          isActive: formData.isActive,
          ...(imageFile && { image: imageFile }),
        };

        await updateFood(updateData).unwrap();
        toast.success("Food item updated successfully");
      } else {
        const createData: CreateFoodRequest = {
          name: formData.name,
          description: formData.description,
          category: formData.category,
          order: formData.order,
          isActive: formData.isActive,
          image: imageFile!,
        };

        await createFood(createData).unwrap();
        toast.success("Food item created successfully");
      }

      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save food item");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      order: 0,
      isActive: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingFood(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description || "",
      category: food.category,
      order: food.order,
      isActive: food.isActive,
    });
    setImagePreview(food.image?.url || null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFood(id).unwrap();
      toast.success("Food item deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete food item");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleFoodStatus(id).unwrap();
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
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Food Items</h2>
          <p className="text-gray-600 text-sm">Manage your food menu and dishes</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Food Item
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[min(95vw,48rem)] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{editingFood ? "Edit Food Item" : "Add New Food Item"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Food Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
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
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                  rows={3}
                  placeholder="Describe the food item..."
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
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required={!editingFood} />
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
                  {isCreating || isUpdating ? "Saving..." : editingFood ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {foods.map((food) => {
          return (
            <Card key={food._id} className="overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={food.image?.url || "/placeholder-food.jpg"}
                  alt={food.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />

                {/* Active/Inactive badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant={food.isActive ? "default" : "secondary"} className="text-xs">
                    {food.isActive ? "Active" : "Inactive"}
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
                      <DropdownMenuItem onClick={() => handleEdit(food)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleToggleStatus(food._id)}>
                        {food.isActive ? (
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
                              This action cannot be undone. This will permanently delete the food item.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(food._id)}>
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
                      <Utensils className="w-4 h-4 text-emerald-500" />
                      <CardTitle className="text-base sm:text-lg truncate">{food.name}</CardTitle>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{food.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Category:</span>
                    <Badge variant="outline" className="whitespace-nowrap">{food.category}</Badge>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Order:</span>
                    <span>{food.order}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {foods.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Utensils className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No food items yet</h3>
            <p>Get started by adding your first food item</p>
          </div>
        </div>
      )}
    </div>
  );
}
