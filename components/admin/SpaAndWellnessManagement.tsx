'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SpaWellnessForm } from './spaWellnesForm';
import {
  useGetSpaWellnessQuery,
  useCreateSpaWellnessMutation,
  useUpdateSpaWellnessMutation,
  useDeleteSpaWellnessMutation,
  useReorderSpaWellnessMutation,
  SpaWellnessItem,
} from '@/redux/apis/spaAndWellnessApi';

export function SpaWellnessManagement() {
  const { data, error, isLoading, refetch } = useGetSpaWellnessQuery();
  const [createSpaWellness] = useCreateSpaWellnessMutation();
  const [updateSpaWellness] = useUpdateSpaWellnessMutation();
  const [deleteSpaWellness] = useDeleteSpaWellnessMutation();
  const [reorderSpaWellness] = useReorderSpaWellnessMutation();
// console.log("data of wellness and spa ", data)
  const spaWellnessItems = data?.data || [];
  const hasItems = spaWellnessItems.length > 0;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SpaWellnessItem | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    item: SpaWellnessItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleEdit = (item: SpaWellnessItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: SpaWellnessItem) => {
    setDeleteDialog({ isOpen: true, item });
  };

  const confirmDelete = async () => {
    if (deleteDialog.item) {
      try {
        await deleteSpaWellness(deleteDialog.item._id).unwrap();
        toast.success('Spa & Wellness item deleted successfully');
        setDeleteDialog({ isOpen: false, item: null });
        refetch();
      } catch (error) {
        toast.error('Failed to delete spa & wellness item');
      }
    }
  };

  const toggleActive = async (item: SpaWellnessItem) => {
    try {
      await updateSpaWellness({
        id: item._id,
        isActive: !item.isActive,
      }).unwrap();
      toast.success(
        `Spa & Wellness item ${!item.isActive ? 'activated' : 'deactivated'}`
      );
      refetch();
    } catch (error) {
      toast.error('Failed to update spa & wellness item');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleFormSuccess = async (formData: any) => {
    try {
      if (editingItem) {
        await updateSpaWellness({ id: editingItem._id, ...formData }).unwrap();
        toast.success('Spa & Wellness item updated successfully');
      } else {
        await createSpaWellness(formData).unwrap();
        toast.success('Spa & Wellness item created successfully');
      }
      setIsFormOpen(false);
      setEditingItem(null);
      refetch();
    } catch (error) {
      toast.error('Failed to save spa & wellness item');
    }
  };

  if (isLoading && !hasItems) {
    return (
      <div className="py-8 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Spa & Wellness
            </h2>
            <p className="text-sm text-gray-500">Loading items…</p>
          </div>
          <div className="h-9 w-28 rounded-md bg-gray-200 dark:bg-neutral-800 animate-pulse" />
        </div>
        <div className="grid gap-4 sm:gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
                  <div>
                    <div className="h-4 w-40 sm:w-56 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
                    <div className="mt-2 h-3 w-64 sm:w-96 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
                  </div>
                </div>
                <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-neutral-800 animate-pulse" />
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="aspect-video rounded-lg bg-gray-100 dark:bg-neutral-900 animate-pulse" />
                <div className="aspect-[9/16] max-w-[200px] rounded-lg bg-gray-100 dark:bg-neutral-900 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Spa & Wellness
          </h2>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage your spa & wellness items
          </p>
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {typeof error === 'string' ? error : 'Error loading data'}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsFormOpen(true)} className="h-9 sm:h-10">
            <Plus className="mr-2 h-4 w-4" />
            Add Spa & Wellness Item
          </Button>
        </div>
      </div>

      {!hasItems ? (
        <Card className="overflow-hidden">
          <CardContent className="py-10 sm:py-12">
            <div className="mx-auto max-w-md text-center px-4">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                  className="mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0114 32c2.761 0 5.239 1.12 7.041 2.929M14 32c-2.761 0-5.239 1.12-7.041 2.929M14 32h20"
                  />
                </svg>
              </div>
              <h3 className="mt-3 text-base font-medium text-gray-900 dark:text-white">
                No spa & wellness items yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create your first spa & wellness item.
              </p>
              <div className="mt-6">
                <Button onClick={() => setIsFormOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Spa & Wellness Item
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {spaWellnessItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.25 }}
            >
              <Card className="overflow-hidden border-gray-200 dark:border-neutral-800">
                {/* Header */}
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <div className="mt-1 shrink-0">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">#{item.order}</span>
                          <Badge
                            variant={item.isActive ? 'default' : 'secondary'}
                            className="whitespace-nowrap"
                          >
                            {item.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                        <CardTitle className="mt-1 text-base sm:text-lg truncate">
                          {item.name}
                        </CardTitle>
                        {item.description ? (
                          <CardDescription className="mt-1 line-clamp-2">
                            {item.description}
                          </CardDescription>
                        ) : null}
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleActive(item)}
                        className="whitespace-nowrap"
                      >
                        {item.isActive ? (
                          <EyeOff className="mr-2 h-4 w-4" />
                        ) : (
                          <Eye className="mr-2 h-4 w-4" />
                        )}
                        {item.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                        className="whitespace-nowrap"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-700 whitespace-nowrap"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                    {/* Mobile menu */}
                    <div className="md:hidden self-start">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          sideOffset={4}
                          className="
                            w-44 
                            rounded-md 
                            bg-white dark:bg-neutral-900 
                            border border-gray-200 dark:border-neutral-700 
                            shadow-lg 
                            ring-1 ring-black/5 
                            z-50
                          "
                        >
                          <DropdownMenuItem onClick={() => toggleActive(item)}>
                            {item.isActive ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" /> Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" /> Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                {/* Content */}
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Image */}
                    <figure className="space-y-2">
                      <figcaption className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Image
                      </figcaption>
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-neutral-900 ring-1 ring-inset ring-gray-200 dark:ring-neutral-800">
                        <img
                          src={item.image.url}
                          alt={`Spa & Wellness - ${item.name}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </figure>
                    {/* Services */}
                    <div>
                      <figcaption className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Services
                      </figcaption>
                      <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                        {item.services.map((service, idx) => (
                          <li key={idx}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Contact & Rating */}
                  <div className="mt-4 sm:mt-5 rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-950/60 p-3 sm:p-4">
                    {item.contact && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Contact:</span> {item.contact}
                      </p>
                    )}
                    {item.rating !== undefined && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                        <span className="font-medium">Rating:</span> {item.rating} / 5
                      </p>
                    )}
                  </div>
                  {/* Footer meta */}
                  <div className="mt-4 sm:mt-5 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Spa & Wellness Form Modal */}
      <SpaWellnessForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        editingItem={editingItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) =>
          setDeleteDialog({ isOpen: open, item: open ? deleteDialog.item : null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Spa & Wellness Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteDialog.item?.name}
              &quot;? This action cannot be undone and will permanently remove the
              item and its image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}