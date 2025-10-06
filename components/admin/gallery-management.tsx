'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  MoreHorizontal,
  Image as ImageIcon,
  Video,
  Play,
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
import { useGetGalleryItemsQuery, useDeleteGalleryItemMutation } from '@/redux/apis/galleryApi';
import { GalleryItem } from '@/redux/apis/galleryApi';
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
import { GalleryForm } from './gallery-form';

export function GalleryManagement() {
  const { data: galleryItems = [], isLoading, error, refetch } = useGetGalleryItemsQuery();
  const [deleteGalleryItem] = useDeleteGalleryItemMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    item: GalleryItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  const hasItems = galleryItems.length > 0;

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: GalleryItem) => {
    setDeleteDialog({ isOpen: true, item });
  };

  const confirmDelete = async () => {
    if (deleteDialog.item) {
      try {
        await deleteGalleryItem(deleteDialog.item._id).unwrap();
        toast.success('Gallery item deleted successfully');
        setDeleteDialog({ isOpen: false, item: null });
      } catch (error) {
        toast.error('Failed to delete gallery item');
      }
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    refetch();
  };

  // Loading skeleton
  if (isLoading && !hasItems) {
    return (
      <div className="py-8 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gallery
            </h2>
            <p className="text-sm text-gray-500">Loading gallery items…</p>
          </div>
          <div className="h-9 w-28 rounded-md bg-gray-200 dark:bg-neutral-800 animate-pulse" />
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5"
            >
              <div className="aspect-square rounded-lg bg-gray-200 dark:bg-neutral-800 animate-pulse mb-4" />
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-neutral-800 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-10">
        <div className="text-center">
          <p className="text-red-600">Failed to load gallery items</p>
          <Button onClick={() => refetch()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-10">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Gallery
          </h2>
          <p className="text-sm text-gray-500">
            {hasItems ? `${galleryItems.length} item${galleryItems.length === 1 ? '' : 's'}` : 'No items yet'}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Media
        </Button>
      </div>

      {!hasItems ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No gallery items yet
          </h3>
          <p className="text-gray-500 mb-6">
            Add images and videos to showcase your resort
          </p>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Item
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden"
            >
              {/* Media Preview */}
              <div className="aspect-square relative overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.media.url}
                    alt="Gallery item"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                    <video
                      src={item.media.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Type Badge */}
                <div className="absolute top-2 left-2">
                  <Badge
                    variant="secondary"
                    className="bg-black/50 text-white border-0"
                  >
                    {item.type === 'image' ? (
                      <ImageIcon className="w-3 h-3 mr-1" />
                    ) : (
                      <Video className="w-3 h-3 mr-1" />
                    )}
                    {item.type}
                  </Badge>
                </div>

                {/* Actions Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="bg-black/50 hover:bg-black/70 text-white border-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(item)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(item)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">#{item.order}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <GalleryForm
          item={editingItem}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) =>
          setDeleteDialog({ isOpen: open, item: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Gallery Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deleteDialog.item?.type}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
