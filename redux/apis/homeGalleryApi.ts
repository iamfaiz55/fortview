import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface HomeGalleryItem {
  _id: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  capacity: string;
  area: string;
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

export interface HomeGalleryResponse {
  success: boolean;
  data: HomeGalleryItem[];
  count?: number;
  message?: string;
}

export interface SingleHomeGalleryResponse {
  success: boolean;
  data: HomeGalleryItem;
  message?: string;
}

export interface CreateHomeGalleryItemRequest {
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  capacity: string;
  area: string;
  features: string[];
  rating?: number;
  icon: string;
  image: File;
  isActive?: boolean;
  order?: number;
}

export interface UpdateHomeGalleryItemRequest {
  id: string;
  title?: string;
  description?: string;
  detailedDescription?: string;
  category?: string;
  capacity?: string;
  area?: string;
  features?: string[];
  rating?: number;
  icon?: string;
  image?: File;
  isActive?: boolean;
  order?: number;
}

export interface ReorderHomeGalleryItemsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export interface HomeGalleryQueryParams {
  active?: boolean;
  category?: string;
  page?: number;
  limit?: number;
}

export const homeGalleryApi = createApi({
  reducerPath: 'homeGalleryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/home-gallery`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['HomeGalleryItem'],
  endpoints: (builder) => ({
    // Get all home gallery items
    getHomeGalleryItems: builder.query<HomeGalleryResponse, HomeGalleryQueryParams | void>({
      query: (params) => {
        if (!params) return '';
        
        const searchParams = new URLSearchParams();
        if ('active' in params && params.active !== undefined) searchParams.append('active', params.active.toString());
        if ('category' in params && params.category) searchParams.append('category', params.category);
        if ('page' in params && params.page) searchParams.append('page', params.page.toString());
        if ('limit' in params && params.limit) searchParams.append('limit', params.limit.toString());
        
        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'HomeGalleryItem' as const, id: _id })),
              { type: 'HomeGalleryItem', id: 'LIST' },
            ]
          : [{ type: 'HomeGalleryItem', id: 'LIST' }],
    }),

    // Get single home gallery item
    getHomeGalleryItem: builder.query<SingleHomeGalleryResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'HomeGalleryItem', id }],
    }),

    // Create home gallery item
    createHomeGalleryItem: builder.mutation<SingleHomeGalleryResponse, CreateHomeGalleryItemRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        formData.append('detailedDescription', body.detailedDescription);
        formData.append('category', body.category);
        formData.append('capacity', body.capacity);
        formData.append('area', body.area);
        formData.append('features', JSON.stringify(body.features));
        if (body.rating !== undefined) formData.append('rating', body.rating.toString());
        formData.append('icon', body.icon);
        formData.append('image', body.image);
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());

        return {
          url: '/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'HomeGalleryItem', id: 'LIST' }],
    }),

    // Update home gallery item
    updateHomeGalleryItem: builder.mutation<SingleHomeGalleryResponse, UpdateHomeGalleryItemRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        if (body.title) formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.detailedDescription) formData.append('detailedDescription', body.detailedDescription);
        if (body.category) formData.append('category', body.category);
        if (body.capacity) formData.append('capacity', body.capacity);
        if (body.area) formData.append('area', body.area);
        if (body.features) formData.append('features', JSON.stringify(body.features));
        if (body.rating !== undefined) formData.append('rating', body.rating.toString());
        if (body.icon) formData.append('icon', body.icon);
        if (body.image) formData.append('image', body.image);
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'HomeGalleryItem', id },
        { type: 'HomeGalleryItem', id: 'LIST' },
      ],
    }),

    // Delete home gallery item
    deleteHomeGalleryItem: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'HomeGalleryItem', id },
        { type: 'HomeGalleryItem', id: 'LIST' },
      ],
    }),

    // Reorder home gallery items
    reorderHomeGalleryItems: builder.mutation<{ success: boolean; message: string }, ReorderHomeGalleryItemsRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'HomeGalleryItem', id: 'LIST' }],
    }),

    // Toggle home gallery item status
    toggleHomeGalleryItemStatus: builder.mutation<SingleHomeGalleryResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'HomeGalleryItem', id },
        { type: 'HomeGalleryItem', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetHomeGalleryItemsQuery,
  useGetHomeGalleryItemQuery,
  useCreateHomeGalleryItemMutation,
  useUpdateHomeGalleryItemMutation,
  useDeleteHomeGalleryItemMutation,
  useReorderHomeGalleryItemsMutation,
  useToggleHomeGalleryItemStatusMutation,
} = homeGalleryApi;
