'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Images, 
  MessageSquare, 
  Camera, 
  Gift, 
  Activity,
  ImageIcon,
  Loader2,
  Building
} from 'lucide-react';
import { useGetCarouselsQuery } from '@/redux/apis/carouselApi';
import { useGetGalleryItemsQuery } from '@/redux/apis/galleryApi';
import { useGetOffersQuery } from '@/redux/apis/offerApi';
import { useGetSelfiePointsQuery } from '@/redux/apis/selfiePointApi';
import { useGetActivitiesQuery } from '@/redux/apis/activityApi';
import { useGetAdventureActivitiesQuery } from '@/redux/apis/adventureActivityApi';
import { useGetContactsQuery } from '@/redux/apis/contactApi';
import { useGetBanquetVenuesQuery } from '@/redux/apis/banquetVenueApi';

export function DashboardStats() {
  // Fetch data from all APIs with optimized parameters
  const { data: carousels, isLoading: carouselsLoading } = useGetCarouselsQuery();
  const { data: galleryItems, isLoading: galleryLoading } = useGetGalleryItemsQuery({ limit: 1 }); // Only need count
  const { data: offers, isLoading: offersLoading } = useGetOffersQuery();
  const { data: selfiePoints, isLoading: selfiePointsLoading } = useGetSelfiePointsQuery({ limit: 1 }); // Only need count
  const { data: activities, isLoading: activitiesLoading } = useGetActivitiesQuery({ limit: 1 }); // Only need count
  const { data: adventureActivities, isLoading: adventureActivitiesLoading } = useGetAdventureActivitiesQuery({ limit: 1 }); // Only need count
  const { data: contacts, isLoading: contactsLoading } = useGetContactsQuery();
  const { data: banquetVenues, isLoading: banquetVenuesLoading } = useGetBanquetVenuesQuery();

  const isLoading = carouselsLoading || galleryLoading || offersLoading || 
                   selfiePointsLoading || activitiesLoading || adventureActivitiesLoading || contactsLoading || banquetVenuesLoading;

  const stats = [
    {
      title: 'Carousel Items',
      value: carousels?.data?.length || 0,
      icon: Images,
      loading: carouselsLoading,
    },
    {
      title: 'Home Gallery Items',
      value: galleryItems?.count || 0,
      icon: ImageIcon,
      loading: galleryLoading,
    },
    {
      title: 'Adventure Activities',
      value: adventureActivities?.pagination?.totalCount || 0,
      icon: Activity,
      loading: adventureActivitiesLoading,
    },
    {
      title: 'Regular Activities',
      value: activities?.pagination?.totalCount || 0,
      icon: Activity,
      loading: activitiesLoading,
    },
    {
      title: 'Selfie Points',
      value: selfiePoints?.count || 0,
      icon: Camera,
      loading: selfiePointsLoading,
    },
    {
      title: 'Offers',
      value: offers?.length || 0,
      icon: Gift,
      loading: offersLoading,
    },
    {
      title: 'Banquet Venues',
      value: banquetVenues?.length || 0,
      icon: Building,
      loading: banquetVenuesLoading,
    },
    {
      title: 'Contact Messages',
      value: contacts?.length || 0,
      icon: MessageSquare,
      loading: contactsLoading,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {stat.loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                stat.value
              )}
            </div>
            <p className="text-xs text-gray-500">
              Total items
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
