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
  Activity,
  MoreVertical,
  Clock,
  Users,
  Star
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
import { ActivityForm } from "./activity-form";
import { Activity as ActivityType } from "@/redux/apis/activityApi";
import {
  useGetActivitiesQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
  useToggleActivityStatusMutation,
} from "@/redux/apis/activityApi";

export function ActivityManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityType | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<ActivityType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: activitiesResponse, isLoading, error: queryError } = useGetActivitiesQuery({});
  const [createActivity, { isLoading: isCreating }] = useCreateActivityMutation();
  const [updateActivity, { isLoading: isUpdating }] = useUpdateActivityMutation();
  const [deleteActivity, { isLoading: isDeleting }] = useDeleteActivityMutation();
  const [toggleStatus, { isLoading: isToggling }] = useToggleActivityStatusMutation();

  const activities = activitiesResponse?.data || [];

  const handleEdit = (activity: ActivityType) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingActivity(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingActivity(null);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      setError(null);
      console.log('Submitting form data:', {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        editing: !!editingActivity
      });

      if (editingActivity) {
        // Update existing activity
        const updateData: any = {
          id: editingActivity._id,
          title: formData.title,
          description: formData.description,
          detailedDescription: formData.detailedDescription,
          category: formData.category,
          duration: formData.duration,
          difficulty: formData.difficulty,
          ageGroup: formData.ageGroup,
          features: formData.features,
          rating: formData.rating ? parseFloat(formData.rating) : undefined,
          icon: formData.icon,
          order: formData.order,
          isActive: formData.isActive,
        };

        // Only add image if a new one was selected
        if (formData.image && formData.image.size > 0) {
          updateData.image = formData.image;
        }

        console.log('Update data:', updateData);
        await updateActivity(updateData).unwrap();
      } else {
        // Create new activity
        const createData = {
          title: formData.title,
          description: formData.description,
          detailedDescription: formData.detailedDescription,
          category: formData.category,
          duration: formData.duration,
          difficulty: formData.difficulty,
          ageGroup: formData.ageGroup,
          features: formData.features,
          rating: formData.rating ? parseFloat(formData.rating) : undefined,
          icon: formData.icon,
          order: formData.order,
          isActive: formData.isActive,
          image: formData.image,
        };
        console.log('Create data:', createData);
        await createActivity(createData).unwrap();
      }
      handleFormClose();
    } catch (error: any) {
      console.error('Error saving activity:', error);
      setError(error?.data?.message || error?.message || 'Failed to save activity');
    }
  };

  const handleDelete = async (activity: ActivityType) => {
    try {
      await deleteActivity(activity._id).unwrap();
      setDeleteDialog(null);
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleToggleStatus = async (activity: ActivityType) => {
    try {
      await toggleStatus(activity._id).unwrap();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showForm) {
    return (
      <ActivityForm
        activity={editingActivity}
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
          <h1 className="text-3xl font-bold text-gray-900">Activities Management</h1>
          <p className="text-gray-600 mt-1">
            Manage activities for your resort
          </p>
        </div>
        <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Activity
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{activities.length}</p>
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
                  {activities.filter(a => a.isActive).length}
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
                  {activities.filter(a => !a.isActive).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {activities.length > 0 
                    ? (activities.reduce((sum, a) => sum + (a.rating || 0), 0) / activities.length).toFixed(1)
                    : '0.0'
                  }
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
            <p className="text-red-600">Error loading activities. Please try again.</p>
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

      {/* Activities Grid */}
      {!isLoading && !queryError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.div
                key={activity._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={activity.image.url}
                        alt={activity.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={activity.isActive ? "default" : "secondary"}>
                          {activity.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge className={getDifficultyColor(activity.difficulty)}>
                          {activity.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {activity.description}
                      </p>

                      {/* Activity Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {activity.duration}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {activity.ageGroup}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Activity className="w-3 h-3 mr-1" />
                          {activity.category}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-1">Features:</div>
                        <ul className="space-y-1">
                          {activity.features.slice(0, 3).map((feature, i) => (
                            <li key={`${feature}-${i}`} className="text-xs text-gray-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                              {feature}
                            </li>
                          ))}
                          {activity.features.length > 3 && (
                            <li className="text-xs text-gray-500 italic">
                              +{activity.features.length - 3} more features
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(activity)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(activity)}
                            disabled={isToggling}
                          >
                            {activity.isActive ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEdit(activity)}
                              className="text-blue-600"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteDialog(activity)}
                              className="text-red-600"
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
      {!isLoading && !queryError && activities.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No activities found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by adding your first activity.
            </p>
            <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Activity</AlertDialogTitle>
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
