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
  Trophy,
  Calendar,
  Building,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetAwardsQuery,
  useCreateAwardMutation,
  useUpdateAwardMutation,
  useDeleteAwardMutation,
  useToggleAwardStatusMutation,
  type Award,
  type CreateAwardRequest,
  type UpdateAwardRequest,
} from "@/redux/apis/awardApi";

const categoryOptions = [
  "Excellence in Service",
  "Best Resort",
  "Hospitality Award",
  "Environmental Excellence",
  "Customer Satisfaction",
  "Innovation Award",
  "Community Service",
  "Leadership Award",
  "Quality Assurance",
  "Recognition",
];

export default function AwardManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    organization: "",
    category: "",
    order: 0,
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // RTK Query hooks
  const { data: awardsResponse, isLoading, error } = useGetAwardsQuery();
  const [createAward, { isLoading: isCreating }] = useCreateAwardMutation();
  const [updateAward, { isLoading: isUpdating }] = useUpdateAwardMutation();
  const [deleteAward, { isLoading: isDeleting }] = useDeleteAwardMutation();
  const [toggleAwardStatus] = useToggleAwardStatusMutation();

  const awards = awardsResponse?.data || [];
  const loading = isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile && !editingAward) {
      toast.error("Please select an image");
      return;
    }

    try {
      if (editingAward) {
        const updateData: UpdateAwardRequest = {
          id: editingAward._id,
          title: formData.title,
          description: formData.description,
          year: formData.year,
          organization: formData.organization,
          category: formData.category,
          order: formData.order,
          isActive: formData.isActive,
          ...(imageFile && { image: imageFile }),
        };

        await updateAward(updateData).unwrap();
        toast.success("Award updated successfully");
      } else {
        const createData: CreateAwardRequest = {
          title: formData.title,
          description: formData.description,
          year: formData.year,
          organization: formData.organization,
          category: formData.category,
          order: formData.order,
          isActive: formData.isActive,
          image: imageFile!,
        };

        await createAward(createData).unwrap();
        toast.success("Award created successfully");
      }

      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save award");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      year: new Date().getFullYear(),
      organization: "",
      category: "",
      order: 0,
      isActive: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingAward(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (award: Award) => {
    setEditingAward(award);
    setFormData({
      title: award.title,
      description: award.description,
      year: award.year,
      organization: award.organization || "",
      category: award.category || "",
      order: award.order,
      isActive: award.isActive,
    });
    setImagePreview(award.image?.url || null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAward(id).unwrap();
      toast.success("Award deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete award");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleAwardStatus(id).unwrap();
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Awards</h2>
          <p className="text-gray-600 text-sm">Manage your awards and recognitions</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add Award
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[min(95vw,48rem)] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{editingAward ? "Edit Award" : "Add New Award"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title & Year */}
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
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => setFormData((p) => ({ ...p, year: parseInt(e.target.value) }))}
                    required
                  />
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
                  required
                />
              </div>

              {/* Organization & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData((p) => ({ ...p, organization: e.target.value }))}
                    placeholder="Awarding organization"
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
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} required={!editingAward} />
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
                  {isCreating || isUpdating ? "Saving..." : editingAward ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {awards.map((award) => {
          return (
            <Card key={award._id} className="overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={award.image?.url || "/placeholder-award.jpg"}
                  alt={award.title}
                  width={800}
                  height={480}
                  className="w-full h-44 sm:h-48 object-cover"
                />

                {/* Active/Inactive badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant={award.isActive ? "default" : "secondary"} className="text-xs">
                    {award.isActive ? "Active" : "Inactive"}
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
                      <DropdownMenuItem onClick={() => handleEdit(award)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={() => handleToggleStatus(award._id)}>
                        {award.isActive ? (
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
                              This action cannot be undone. This will permanently delete the award.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(award._id)}>
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
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <CardTitle className="text-base sm:text-lg truncate">{award.title}</CardTitle>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{award.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Year:</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{award.year}</span>
                    </div>
                  </div>

                  {award.organization && (
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Organization:</span>
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{award.organization}</span>
                      </div>
                    </div>
                  )}

                  {award.category && (
                    <div className="flex justify-between gap-3">
                      <span className="text-gray-500">Category:</span>
                      <Badge variant="outline" className="whitespace-nowrap">{award.category}</Badge>
                    </div>
                  )}

                  <div className="flex justify-between gap-3">
                    <span className="text-gray-500">Order:</span>
                    <span>{award.order}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {awards.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No awards yet</h3>
            <p>Get started by adding your first award</p>
          </div>
        </div>
      )}
    </div>
  );
}
