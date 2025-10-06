import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface SpaWellnessItem {
  _id: string;
  name: string;
  description: string;
  location: string;
  services: string[];
  contact?: string;
  image: {
    url: string;
    publicId: string;
  };
  rating?: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface SpaWellnessResponse {
  success: boolean;
  data: SpaWellnessItem[];
  count?: number;
  message?: string;
}

export interface SingleSpaWellnessResponse {
  success: boolean;
  data: SpaWellnessItem;
  message?: string;
}

export interface CreateSpaWellnessRequest {
  name: string;
  description?: string;
  location: string;
  services: string[];
  contact?: string;
  rating?: number;
  order?: number;
  image: File;
}

export interface UpdateSpaWellnessRequest {
  id: string;
  name?: string;
  description?: string;
  location?: string;
  services?: string[];
  contact?: string;
  rating?: number;
  order?: number;
  isActive?: boolean;
  image?: File;
}

export interface ReorderSpaWellnessRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export const spaWellnessApi = createApi({
  reducerPath: 'spaWellnessApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        const cleanToken = token.replace(/^"(.*)"$/, '$1');
        headers.set('authorization', `Bearer ${cleanToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['SpaWellness'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all spa & wellness items
    getSpaWellness: builder.query<SpaWellnessResponse, { active?: boolean } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.active !== undefined) {
          searchParams.append('active', params.active.toString());
        }
        return `spa-and-wellness?${searchParams.toString()}`;
      },
      providesTags: ['SpaWellness'],
    }),

    // Get single spa & wellness item
    getSpaWellnessItem: builder.query<SingleSpaWellnessResponse, string>({
      query: (id) => `spa-and-wellness/${id}`,
      providesTags: (result, error, id) => [{ type: 'SpaWellness', id }],
    }),

    // Create spa & wellness item
    createSpaWellness: builder.mutation<SingleSpaWellnessResponse, CreateSpaWellnessRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('name', body.name);
        if (body.description) formData.append('description', body.description);
        formData.append('location', body.location);
        if (body.services) body.services.forEach((service, idx) => formData.append(`services[${idx}]`, service));
        if (body.contact) formData.append('contact', body.contact);
        if (body.rating !== undefined) formData.append('rating', body.rating.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());
        formData.append('image', body.image);

        return {
          url: 'spa-and-wellness',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['SpaWellness'],
    }),

    // Update spa & wellness item
    updateSpaWellness: builder.mutation<SingleSpaWellnessResponse, UpdateSpaWellnessRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        if (body.name) formData.append('name', body.name);
        if (body.description) formData.append('description', body.description);
        if (body.location) formData.append('location', body.location);
        if (body.services) body.services.forEach((service, idx) => formData.append(`services[${idx}]`, service));
        if (body.contact !== undefined) formData.append('contact', body.contact);
        if (body.rating !== undefined) formData.append('rating', body.rating.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.image) formData.append('image', body.image);

        return {
          url: `spa-and-wellness/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'SpaWellness', id },
        'SpaWellness',
      ],
    }),

    // Delete spa & wellness item
    deleteSpaWellness: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `spa-and-wellness/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SpaWellness'],
    }),

    // Reorder spa & wellness items
    reorderSpaWellness: builder.mutation<SpaWellnessResponse, ReorderSpaWellnessRequest>({
      query: (body) => ({
        url: 'spa-and-wellness/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['SpaWellness'],
    }),
  }),
});

export const {
  useGetSpaWellnessQuery,
  useGetSpaWellnessItemQuery,
  useCreateSpaWellnessMutation,
  useUpdateSpaWellnessMutation,
  useDeleteSpaWellnessMutation,
  useReorderSpaWellnessMutation,
} = spaWellnessApi;