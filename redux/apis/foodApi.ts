import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface Food {
  _id: string;
  name: string;
  description?: string;
  category: string;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FoodResponse {
  success: boolean;
  data: Food[];
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

export interface SingleFoodResponse {
  success: boolean;
  data: Food;
  message?: string;
}

export interface CreateFoodRequest {
  name: string;
  description?: string;
  category: string;
  image: File;
  isActive?: boolean;
  order?: number;
}

export interface UpdateFoodRequest {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  image?: File;
  isActive?: boolean;
  order?: number;
}

export interface ReorderFoodsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export interface FoodQueryParams {
  active?: boolean;
  category?: string;
  page?: number;
  limit?: number;
}

export const foodApi = createApi({
  reducerPath: 'foodApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://fortview-backend.vercel.app/api/foods`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Food'],
  endpoints: (builder) => ({
    // Get all foods
    getFoods: builder.query<FoodResponse, FoodQueryParams | void>({
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
              ...result.data.map(({ _id }) => ({ type: 'Food' as const, id: _id })),
              { type: 'Food', id: 'LIST' },
            ]
          : [{ type: 'Food', id: 'LIST' }],
    }),

    // Get single food
    getFood: builder.query<SingleFoodResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Food', id }],
    }),

    // Create food
    createFood: builder.mutation<SingleFoodResponse, CreateFoodRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('name', body.name);
        if (body.description) formData.append('description', body.description);
        formData.append('category', body.category);
        formData.append('image', body.image);
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());

        return {
          url: '/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Food', id: 'LIST' }],
    }),

    // Update food
    updateFood: builder.mutation<SingleFoodResponse, UpdateFoodRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        if (body.name) formData.append('name', body.name);
        if (body.description !== undefined) formData.append('description', body.description);
        if (body.category) formData.append('category', body.category);
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
        { type: 'Food', id },
        { type: 'Food', id: 'LIST' },
      ],
    }),

    // Delete food
    deleteFood: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Food', id },
        { type: 'Food', id: 'LIST' },
      ],
    }),

    // Reorder foods
    reorderFoods: builder.mutation<{ success: boolean; message: string }, ReorderFoodsRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Food', id: 'LIST' }],
    }),

    // Toggle food status
    toggleFoodStatus: builder.mutation<SingleFoodResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Food', id },
        { type: 'Food', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useReorderFoodsMutation,
  useToggleFoodStatusMutation,
} = foodApi;
