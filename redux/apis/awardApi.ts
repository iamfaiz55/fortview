import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface Award {
  _id: string;
  title: string;
  description: string;
  year: number;
  organization?: string;
  category?: string;
  image?: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface AwardResponse {
  success: boolean;
  data: Award[];
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

export interface SingleAwardResponse {
  success: boolean;
  data: Award;
  message?: string;
}

export interface CreateAwardRequest {
  title: string;
  description: string;
  year: number;
  organization?: string;
  category?: string;
  image: File;
  isActive?: boolean;
  order?: number;
}

export interface UpdateAwardRequest {
  id: string;
  title?: string;
  description?: string;
  year?: number;
  organization?: string;
  category?: string;
  image?: File;
  isActive?: boolean;
  order?: number;
}

export interface ReorderAwardsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export interface AwardQueryParams {
  active?: boolean;
  year?: number;
  category?: string;
  page?: number;
  limit?: number;
}

export const awardApi = createApi({
  reducerPath: 'awardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/awards`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Award'],
  endpoints: (builder) => ({
    // Get all awards
    getAwards: builder.query<AwardResponse, AwardQueryParams | void>({
      query: (params) => {
        if (!params) return '';
        
        const searchParams = new URLSearchParams();
        if ('active' in params && params.active !== undefined) searchParams.append('active', params.active.toString());
        if ('year' in params && params.year) searchParams.append('year', params.year.toString());
        if ('category' in params && params.category) searchParams.append('category', params.category);
        if ('page' in params && params.page) searchParams.append('page', params.page.toString());
        if ('limit' in params && params.limit) searchParams.append('limit', params.limit.toString());
        
        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Award' as const, id: _id })),
              { type: 'Award', id: 'LIST' },
            ]
          : [{ type: 'Award', id: 'LIST' }],
    }),

    // Get single award
    getAward: builder.query<SingleAwardResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Award', id }],
    }),

    // Create award
    createAward: builder.mutation<SingleAwardResponse, CreateAwardRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        formData.append('year', body.year.toString());
        if (body.organization) formData.append('organization', body.organization);
        if (body.category) formData.append('category', body.category);
        formData.append('image', body.image);
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());

        return {
          url: '/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Award', id: 'LIST' }],
    }),

    // Update award
    updateAward: builder.mutation<SingleAwardResponse, UpdateAwardRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        if (body.title) formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.year !== undefined) formData.append('year', body.year.toString());
        if (body.organization !== undefined) formData.append('organization', body.organization);
        if (body.category !== undefined) formData.append('category', body.category);
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
        { type: 'Award', id },
        { type: 'Award', id: 'LIST' },
      ],
    }),

    // Delete award
    deleteAward: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Award', id },
        { type: 'Award', id: 'LIST' },
      ],
    }),

    // Reorder awards
    reorderAwards: builder.mutation<{ success: boolean; message: string }, ReorderAwardsRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Award', id: 'LIST' }],
    }),

    // Toggle award status
    toggleAwardStatus: builder.mutation<SingleAwardResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Award', id },
        { type: 'Award', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetAwardsQuery,
  useGetAwardQuery,
  useCreateAwardMutation,
  useUpdateAwardMutation,
  useDeleteAwardMutation,
  useReorderAwardsMutation,
  useToggleAwardStatusMutation,
} = awardApi;
