import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface GalleryItem {
  _id: string;
  type: 'image' | 'video';
  media: {
    url: string;
    publicId: string;
  };
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryItemRequest {
  type: 'image' | 'video';
  media: File;
}

export interface UpdateGalleryItemRequest {
  id: string;
  type?: 'image' | 'video';
  media?: File;
}

export interface ReorderGalleryItemsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export interface GalleryResponse {
  success: boolean;
  data: GalleryItem[];
  count?: number;
  message?: string;
}

export interface SingleGalleryResponse {
  success: boolean;
  data: GalleryItem;
  message?: string;
}

export const galleryApi = createApi({
  reducerPath: 'galleryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/gallery`,
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
  tagTypes: ['Gallery'],
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all gallery items (admin only)
    getGalleryItems: builder.query<GalleryItem[], void>({
      query: () => '',
      providesTags: ['Gallery'],
    }),

    // Get active gallery items (public)
    getActiveGalleryItems: builder.query<GalleryItem[], void>({
      query: () => '/active',
      providesTags: ['Gallery'],
    }),

    // Get single gallery item
    getGalleryItem: builder.query<GalleryItem, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Gallery', id }],
    }),

    // Create gallery item
    createGalleryItem: builder.mutation<GalleryItem, CreateGalleryItemRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('type', body.type);
        formData.append('media', body.media);

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Gallery'],
    }),

    // Update gallery item
    updateGalleryItem: builder.mutation<GalleryItem, UpdateGalleryItemRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.type) formData.append('type', body.type);
        if (body.media) formData.append('media', body.media);

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Gallery', id },
        'Gallery',
      ],
    }),

    // Delete gallery item
    deleteGalleryItem: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Gallery'],
    }),

    // Toggle gallery item status
    toggleGalleryItemStatus: builder.mutation<GalleryItem, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Gallery', id },
        'Gallery',
      ],
    }),

    // Reorder gallery items
    reorderGalleryItems: builder.mutation<GalleryItem[], ReorderGalleryItemsRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Gallery'],
    }),
  }),
});

export const {
  useGetGalleryItemsQuery,
  useGetActiveGalleryItemsQuery,
  useGetGalleryItemQuery,
  useCreateGalleryItemMutation,
  useUpdateGalleryItemMutation,
  useDeleteGalleryItemMutation,
  useReorderGalleryItemsMutation,
} = galleryApi;