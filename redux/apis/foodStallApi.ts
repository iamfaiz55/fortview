import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface FoodStall {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FoodStallResponse {
  success: boolean;
  data: FoodStall[];
  count?: number;
  message?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

export interface SingleFoodStallResponse {
  success: boolean;
  data: FoodStall;
  message?: string;
}

export interface CreateFoodStallRequest {
  title: string;
  description?: string;
  location?: string;
  image: File;
  isActive?: boolean;
  order?: number;
}

export interface UpdateFoodStallRequest {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  image?: File;
  isActive?: boolean;
  order?: number;
}

export interface ReorderFoodStallsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export interface FoodStallQueryParams {
  active?: boolean;
  page?: number;
  limit?: number;
}

export const foodStallApi = createApi({
  reducerPath: 'foodStallApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://fortview-backend.vercel.app/api/food-stalls`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['FoodStall'],
  endpoints: (builder) => ({
    // Get all food stalls
    getFoodStalls: builder.query<FoodStallResponse, FoodStallQueryParams | void>({
      query: (params) => {
        if (!params) return '';
        
        const searchParams = new URLSearchParams();
        if ('active' in params && params.active !== undefined) searchParams.append('active', params.active.toString());
        if ('page' in params && params.page) searchParams.append('page', params.page.toString());
        if ('limit' in params && params.limit) searchParams.append('limit', params.limit.toString());
        
        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'FoodStall' as const, id: _id })),
              { type: 'FoodStall', id: 'LIST' },
            ]
          : [{ type: 'FoodStall', id: 'LIST' }],
    }),

    // Get single food stall
    getFoodStall: builder.query<SingleFoodStallResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'FoodStall', id }],
    }),

    // Create food stall
    createFoodStall: builder.mutation<SingleFoodStallResponse, CreateFoodStallRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.location) formData.append('location', body.location);
        formData.append('image', body.image);
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());

        return {
          url: '/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'FoodStall', id: 'LIST' }],
    }),

    // Update food stall
    updateFoodStall: builder.mutation<SingleFoodStallResponse, UpdateFoodStallRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        if (body.title) formData.append('title', body.title);
        if (body.description !== undefined) formData.append('description', body.description);
        if (body.location !== undefined) formData.append('location', body.location);
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
        { type: 'FoodStall', id },
        { type: 'FoodStall', id: 'LIST' },
      ],
    }),

    // Delete food stall
    deleteFoodStall: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'FoodStall', id },
        { type: 'FoodStall', id: 'LIST' },
      ],
    }),

    // Reorder food stalls
    reorderFoodStalls: builder.mutation<{ success: boolean; message: string }, ReorderFoodStallsRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'FoodStall', id: 'LIST' }],
    }),

    // Toggle food stall status
    toggleFoodStallStatus: builder.mutation<SingleFoodStallResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'FoodStall', id },
        { type: 'FoodStall', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetFoodStallsQuery,
  useGetFoodStallQuery,
  useCreateFoodStallMutation,
  useUpdateFoodStallMutation,
  useDeleteFoodStallMutation,
  useReorderFoodStallsMutation,
  useToggleFoodStallStatusMutation,
} = foodStallApi;
