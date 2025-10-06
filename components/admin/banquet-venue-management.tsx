"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye, ToggleLeft, ToggleRight, GripVertical } from "lucide-react";
import { BanquetVenue } from "@/redux/apis/banquetVenueApi";
import { useGetBanquetVenuesQuery, useDeleteBanquetVenueMutation, useToggleBanquetVenueStatusMutation } from "@/redux/apis/banquetVenueApi";
import { BanquetVenueForm } from "./banquet-venue-form";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function BanquetVenueManagement() {
  const [showForm, setShowForm] = useState(false);
  const [editingVenue, setEditingVenue] = useState<BanquetVenue | null>(null);
  const [deletingVenue, setDeletingVenue] = useState<BanquetVenue | null>(null);
  const [viewingVenue, setViewingVenue] = useState<BanquetVenue | null>(null);

  const { data: venues = [], isLoading, error } = useGetBanquetVenuesQuery();
  const [deleteVenue] = useDeleteBanquetVenueMutation();
  const [toggleStatus] = useToggleBanquetVenueStatusMutation();

  const handleEdit = (venue: BanquetVenue) => {
    setEditingVenue(venue);
    setShowForm(true);
  };

  const handleDelete = async (venue: BanquetVenue) => {
    try {
      await deleteVenue(venue._id).unwrap();
      setDeletingVenue(null);
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  const handleToggleStatus = async (venue: BanquetVenue) => {
    try {
      await toggleStatus(venue._id).unwrap();
    } catch (error) {
      console.error("Error toggling venue status:", error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingVenue(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingVenue(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Banquet Venues</h2>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded mb-1" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading banquet venues</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Banquet Venues</h2>
          <p className="text-gray-600">Manage your banquet venues and their details</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          Add New Venue
        </Button>
      </div>

      {showForm && (
        <BanquetVenueForm
          venue={editingVenue || undefined}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {!showForm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <Card key={venue._id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <ImageWithFallback
                  src={venue.images[0]?.url || "/placeholder-venue.jpg"}
                  alt={venue.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{venue.title}</h3>
                  <Badge variant={venue.isActive ? "default" : "secondary"}>
                    {venue.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{venue.capacity}</p>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{venue.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setViewingVenue(venue)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(venue)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(venue)}
                    >
                      {venue.isActive ? (
                        <ToggleRight className="w-4 h-4" />
                      ) : (
                        <ToggleLeft className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeletingVenue(venue)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View Venue Dialog */}
      {viewingVenue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{viewingVenue.title}</CardTitle>
                  <p className="text-gray-600">{viewingVenue.capacity}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingVenue(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Images */}
              {viewingVenue.images.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {viewingVenue.images.map((image, index) => (
                      <ImageWithFallback
                        key={index}
                        src={image.url}
                        alt={`${viewingVenue.title} image ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-24 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Area:</strong> {viewingVenue.area}
                </div>
                <div>
                  <strong>AC:</strong> {viewingVenue.ac}
                </div>
                {viewingVenue.location && (
                  <div className="col-span-2">
                    <strong>Location:</strong> {viewingVenue.location}
                  </div>
                )}
              </div>

              <div>
                <strong>Description:</strong>
                <p className="mt-1 text-gray-700">{viewingVenue.description}</p>
              </div>

              {/* Features */}
              {viewingVenue.features && viewingVenue.features.length > 0 && (
                <div>
                  <strong>Features:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {viewingVenue.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              {viewingVenue.pricing && (
                <div>
                  <strong>Pricing:</strong>
                  <div className="mt-1">
                    <p>
                      {viewingVenue.pricing.currency} {viewingVenue.pricing.basePrice}
                    </p>
                    {viewingVenue.pricing.includes.length > 0 && (
                      <div>
                        <p className="font-medium">Includes:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {viewingVenue.pricing.includes.map((include, index) => (
                            <li key={index}>{include}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingVenue} onOpenChange={() => setDeletingVenue(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Banquet Venue</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingVenue?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingVenue && handleDelete(deletingVenue)}
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
