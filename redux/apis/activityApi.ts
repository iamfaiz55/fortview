import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Activity {
  _id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ageGroup: string;
  features: string[];
  rating?: number;
  icon: string;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivitiesResponse {
  success: boolean;
  data: Activity[];
  count: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

export interface SingleActivityResponse {
  success: boolean;
  data: Activity;
}

export interface CreateActivityRequest {
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ageGroup: string;
  features: string[];
  rating?: number;
  icon: string;
  order: number;
  isActive: boolean;
  image: File;
}

export interface UpdateActivityRequest {
  id: string;
  title?: string;
  description?: string;
  detailedDescription?: string;
  category?: string;
  duration?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  ageGroup?: string;
  features?: string[];
  rating?: number;
  icon?: string;
  order?: number;
  isActive?: boolean;
  image?: File;
}

export const activityApi = createApi({
  reducerPath: 'activityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/activities`,
  }),
  tagTypes: ['Activity'],
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all activities
    getActivities: builder.query<ActivitiesResponse, { active?: boolean; category?: string; difficulty?: string; page?: number; limit?: number }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.active !== undefined) searchParams.append('active', params.active.toString());
        if (params.category) searchParams.append('category', params.category);
        if (params.difficulty) searchParams.append('difficulty', params.difficulty);
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());
        
        return `?${searchParams.toString()}`;
      },
      providesTags: ['Activity'],
    }),

    // Get single activity
    getActivity: builder.query<SingleActivityResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Activity', id }],
    }),

    // Create activity
    createActivity: builder.mutation<SingleActivityResponse, CreateActivityRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        formData.append('detailedDescription', body.detailedDescription);
        formData.append('category', body.category);
        formData.append('duration', body.duration);
        formData.append('difficulty', body.difficulty);
        formData.append('ageGroup', body.ageGroup);
        // Append each feature individually to maintain array format
        body.features.forEach((feature, index) => {
          formData.append(`features[${index}]`, feature);
        });
        if (body.rating !== undefined) {
          formData.append('rating', body.rating.toString());
        }
        formData.append('icon', body.icon);
        formData.append('order', (body.order || 0).toString());
        formData.append('isActive', (body.isActive !== false).toString());
        formData.append('image', body.image);

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Activity'],
    }),

    // Update activity
    updateActivity: builder.mutation<SingleActivityResponse, UpdateActivityRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.title) formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.detailedDescription) formData.append('detailedDescription', body.detailedDescription);
        if (body.category) formData.append('category', body.category);
        if (body.duration) formData.append('duration', body.duration);
        if (body.difficulty) formData.append('difficulty', body.difficulty);
        if (body.ageGroup) formData.append('ageGroup', body.ageGroup);
        if (body.features) {
          // Append each feature individually to maintain array format
          body.features.forEach((feature, index) => {
            formData.append(`features[${index}]`, feature);
          });
        }
        if (body.rating !== undefined) formData.append('rating', body.rating.toString());
        if (body.icon) formData.append('icon', body.icon);
        if (body.order !== undefined) formData.append('order', body.order.toString());
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.image) formData.append('image', body.image);

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Activity', id },
        'Activity',
      ],
    }),

    // Delete activity
    deleteActivity: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Activity'],
    }),

    // Toggle activity status
    toggleActivityStatus: builder.mutation<SingleActivityResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Activity', id },
        'Activity',
      ],
    }),

    // Reorder activities
    reorderActivities: builder.mutation<ActivitiesResponse, { items: { id: string; order: number }[] }>({
      query: (body) => ({
        url: '/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Activity'],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivityQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
  useToggleActivityStatusMutation,
  useReorderActivitiesMutation,
} = activityApi;
