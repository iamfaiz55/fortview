"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  GripVertical,
  Camera,
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SelfiePointForm } from "./selfie-point-form";
import { SelfiePoint } from "@/redux/apis/selfiePointApi";
import {
  useGetSelfiePointsQuery,
  useCreateSelfiePointMutation,
  useUpdateSelfiePointMutation,
  useDeleteSelfiePointMutation,
  useToggleSelfiePointStatusMutation,
} from "@/redux/apis/selfiePointApi";
import Image from "next/image";

export function SelfiePointManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingSelfiePoint, setEditingSelfiePoint] = useState<SelfiePoint | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<SelfiePoint | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: selfiePointsResponse, isLoading, error: queryError } = useGetSelfiePointsQuery({});
  const [createSelfiePoint, { isLoading: isCreating }] = useCreateSelfiePointMutation();
  const [updateSelfiePoint, { isLoading: isUpdating }] = useUpdateSelfiePointMutation();
  const [deleteSelfiePoint, { isLoading: isDeleting }] = useDeleteSelfiePointMutation();
  const [toggleStatus, { isLoading: isToggling }] = useToggleSelfiePointStatusMutation();

  const selfiePoints = selfiePointsResponse?.data || [];

  const handleEdit = (selfiePoint: SelfiePoint) => {
    setEditingSelfiePoint(selfiePoint);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingSelfiePoint(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSelfiePoint(null);
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setError(null);
      console.log('Submitting form data:', {
        title: formData.get('title'),
        description: formData.get('description'),
        order: formData.get('order'),
        isActive: formData.get('isActive'),
        hasImage: formData.has('image'),
        editing: !!editingSelfiePoint
      });

      if (editingSelfiePoint) {
        // Update existing selfie point
        const updateData: any = {
          id: editingSelfiePoint._id,
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          order: parseInt(formData.get('order') as string),
          isActive: formData.get('isActive') === 'true',
        };

        // Only add image if a new one was selected
        const imageFile = formData.get('image') as File;
        if (imageFile && imageFile.size > 0) {
          updateData.image = imageFile;
        }

        console.log('Update data:', updateData);
        await updateSelfiePoint(updateData).unwrap();
      } else {
        // Create new selfie point
        const createData = {
          title: formData.get('title') as string,
          description: formData.get('description') as string,
          order: parseInt(formData.get('order') as string),
          image: formData.get('image') as File,
        };
        console.log('Create data:', createData);
        await createSelfiePoint(createData).unwrap();
      }
      handleFormClose();
    } catch (error: any) {
      console.error('Error saving selfie point:', error);
      setError(error?.data?.message || error?.message || 'Failed to save selfie point');
    }
  };

  const handleDelete = async (selfiePoint: SelfiePoint) => {
    try {
      await deleteSelfiePoint(selfiePoint._id).unwrap();
      setDeleteDialog(null);
    } catch (error) {
      console.error('Error deleting selfie point:', error);
    }
  };

  const handleToggleStatus = async (selfiePoint: SelfiePoint) => {
    try {
      await toggleStatus(selfiePoint._id).unwrap();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  if (showForm) {
    return (
      <SelfiePointForm
        selfiePoint={editingSelfiePoint}
        onSubmit={handleFormSubmit}
        onCancel={handleFormClose}
        isLoading={isCreating || isUpdating}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Selfie Points Management</h1>
          <p className="text-gray-600 mt-1">
            Manage selfie points for your resort
          </p>
        </div>
        <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Selfie Point
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Camera className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Selfie Points</p>
                <p className="text-2xl font-bold text-gray-900">{selfiePoints.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {selfiePoints.filter(sp => sp.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <EyeOff className="h-8 w-8 text-gray-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive</p>
                <p className="text-2xl font-bold text-gray-900">
                  {selfiePoints.filter(sp => !sp.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {queryError && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">Error loading selfie points. Please try again.</p>
          </CardContent>
        </Card>
      )}

      {/* Form Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Selfie Points Grid */}
      {!isLoading && !queryError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <AnimatePresence>
  {selfiePoints.map((selfiePoint, index) => (
    <motion.div
      key={selfiePoint._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.28, delay: index * 0.06 }}
      className="relative" // helps stacking contexts
    >
      <Card className="group border border-gray-200/70 hover:border-gray-300/90 hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={selfiePoint.image.url}
              alt={selfiePoint.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              priority={index < 3}
            />
            <div className="absolute top-2 right-2">
              <Badge variant={selfiePoint.isActive ? "default" : "secondary"}>
                {selfiePoint.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-white/90">
                Order: {selfiePoint.order}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 line-clamp-1">
              {selfiePoint.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {selfiePoint.description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => handleEdit(selfiePoint)}
                  aria-label="Edit selfie point"
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => handleToggleStatus(selfiePoint)}
                  disabled={isToggling}
                  aria-label={selfiePoint.isActive ? "Deactivate" : "Activate"}
                >
                  {selfiePoint.isActive ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="h-8 w-8 ">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                {/* z-index ensures it’s above a fixed navbar; sideOffset prevents overlap */}
                <DropdownMenuContent
                  align="end"
                  sideOffset={6}
                  className="z-50 rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <DropdownMenuItem
                    onClick={() => handleEdit(selfiePoint)}
                    className="text-blue-600 focus:text-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteDialog(selfiePoint)}
                    className="text-red-600 focus:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</AnimatePresence>

        </div>
      )}

      {/* Empty State */}
      {!isLoading && !queryError && selfiePoints.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No selfie points found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by adding your first selfie point.
            </p>
            <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Selfie Point
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selfie Point</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDialog && handleDelete(deleteDialog)}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

