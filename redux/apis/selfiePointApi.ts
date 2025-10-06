import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SelfiePoint {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSelfiePointRequest {
  title: string;
  description: string;
  order?: number;
  image: File;
}

export interface UpdateSelfiePointRequest {
  id: string;
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
  image?: File;
}

export interface ReorderSelfiePointsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export interface SelfiePointResponse {
  success: boolean;
  data: SelfiePoint[];
  count?: number;
  message?: string;
}

export interface SingleSelfiePointResponse {
  success: boolean;
  data: SelfiePoint;
  message?: string;
}

export const selfiePointApi = createApi({
  reducerPath: 'selfiePointApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/selfie-points`,
    prepareHeaders: (headers) => {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Remove any quotes that might be around the token
        const cleanToken = token.replace(/^"(.*)"$/, '$1');
        headers.set('authorization', `Bearer ${cleanToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['SelfiePoint'],
  // Add caching configuration
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all selfie points with pagination
    getSelfiePoints: builder.query<SelfiePointResponse, { 
      active?: boolean; 
      page?: number; 
      limit?: number;
    } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params) {
          if (params.active !== undefined) {
            searchParams.append('active', params.active.toString());
          }
          if (params.page) {
            searchParams.append('page', params.page.toString());
          }
          if (params.limit) {
            searchParams.append('limit', params.limit.toString());
          }
        }
        return {
          url: `?${searchParams.toString()}`,
        };
      },
      providesTags: ['SelfiePoint'],
    }),

    // Get single selfie point
    getSelfiePoint: builder.query<SingleSelfiePointResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'SelfiePoint', id }],
    }),

    // Create selfie point
    createSelfiePoint: builder.mutation<SingleSelfiePointResponse, CreateSelfiePointRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        if (body.order !== undefined) {
          formData.append('order', body.order.toString());
        }
        formData.append('image', body.image);

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['SelfiePoint'],
    }),

    // Update selfie point
    updateSelfiePoint: builder.mutation<SingleSelfiePointResponse, UpdateSelfiePointRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.title) formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
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
        { type: 'SelfiePoint', id },
        'SelfiePoint',
      ],
    }),

    // Delete selfie point
    deleteSelfiePoint: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SelfiePoint'],
    }),

    // Toggle selfie point status
    toggleSelfiePointStatus: builder.mutation<SingleSelfiePointResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'SelfiePoint', id },
        'SelfiePoint',
      ],
    }),

    // Reorder selfie points
    reorderSelfiePoints: builder.mutation<SelfiePointResponse, ReorderSelfiePointsRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['SelfiePoint'],
    }),
  }),
});

export const {
  useGetSelfiePointsQuery,
  useGetSelfiePointQuery,
  useCreateSelfiePointMutation,
  useUpdateSelfiePointMutation,
  useDeleteSelfiePointMutation,
  useToggleSelfiePointStatusMutation,
  useReorderSelfiePointsMutation,
} = selfiePointApi;

