'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  MoreHorizontal,
  Gift,
  Calendar,
  Clock,
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
import { useGetOffersQuery, useDeleteOfferMutation, useToggleOfferStatusMutation } from '@/redux/apis/offerApi';
import { Offer } from '@/redux/apis/offerApi';
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
import { OfferForm } from './offer-form';

export function OfferManagement() {
  const { data: offers = [], isLoading, error, refetch } = useGetOffersQuery();
  const [deleteOffer] = useDeleteOfferMutation();
  const [toggleOfferStatus] = useToggleOfferStatusMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    offer: Offer | null;
  }>({
    isOpen: false,
    offer: null,
  });

  const hasOffers = offers.length > 0;

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setIsFormOpen(true);
  };

  const handleDelete = (offer: Offer) => {
    setDeleteDialog({ isOpen: true, offer });
  };

  const confirmDelete = async () => {
    if (deleteDialog.offer) {
      try {
        await deleteOffer(deleteDialog.offer._id).unwrap();
        toast.success('Offer deleted successfully');
        setDeleteDialog({ isOpen: false, offer: null });
      } catch (error) {
        toast.error('Failed to delete offer');
      }
    }
  };

  const toggleActive = async (offer: Offer) => {
    try {
      await toggleOfferStatus(offer._id).unwrap();
      toast.success(
        `Offer ${!offer.isActive ? 'activated' : 'deactivated'}`
      );
    } catch (error) {
      toast.error('Failed to update offer status');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingOffer(null);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingOffer(null);
    refetch();
  };


  // Loading skeleton
  if (isLoading && !hasOffers) {
    return (
      <div className="py-8 sm:py-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Offers
            </h2>
            <p className="text-sm text-gray-500">Loading offers…</p>
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
          <p className="text-red-600">Failed to load offers</p>
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
            Offers
          </h2>
          <p className="text-sm text-gray-500">
            {hasOffers ? `${offers.length} offer${offers.length === 1 ? '' : 's'}` : 'No offers yet'}
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Offer
        </Button>
      </div>

      {!hasOffers ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No offers yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first offer to start engaging with visitors
          </p>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Your First Offer
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {offers.map((offer, index) => (
            <motion.div
              key={offer._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Offer Image
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs bg-emerald-100 text-emerald-800 border-emerald-200"
                      >
                        Image
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Order: {offer.order}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {offer.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={offer.isActive ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {offer.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(offer)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleActive(offer)}>
                        {offer.isActive ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(offer)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <OfferForm
          offer={editingOffer}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) =>
          setDeleteDialog({ isOpen: open, offer: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Offer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog.offer?.title}"? This action cannot be undone.
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
