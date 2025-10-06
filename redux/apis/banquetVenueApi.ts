import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BanquetVenue {
  _id: string;
  title: string;
  capacity: string;
  area: string;
  ac: string;
  description: string;
  images: Array<{
    url: string;
    publicId: string;
  }>;
  isActive: boolean;
  order: number;
  features?: string[];
  pricing?: {
    basePrice: number;
    currency: string;
    includes: string[];
  };
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBanquetVenueRequest {
  title: string;
  capacity: string;
  area: string;
  ac: string;
  description: string;
  features?: string[];
  pricing?: {
    basePrice: number;
    currency: string;
    includes: string[];
  };
  location?: string;
  isActive?: boolean;
  order?: number;
  images?: File[];
}

export interface UpdateBanquetVenueRequest {
  id: string;
  title?: string;
  capacity?: string;
  area?: string;
  ac?: string;
  description?: string;
  features?: string[];
  pricing?: {
    basePrice: number;
    currency: string;
    includes: string[];
  };
  location?: string;
  isActive?: boolean;
  order?: number;
  images?: File[];
  existingImages?: Array<{
    url: string;
    publicId: string;
  }>;
  imagesToRemove?: string[];
}

export interface ReorderBanquetVenuesRequest {
  venues: Array<{
    id: string;
    order: number;
  }>;
}

export const banquetVenueApi = createApi({
  reducerPath: 'banquetVenueApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')}/banquet-venues`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['BanquetVenue'],
  keepUnusedDataFor: 300, // 5 minutes
  refetchOnMountOrArgChange: 30, // 30 seconds
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all banquet venues
    getBanquetVenues: builder.query<BanquetVenue[], void>({
      query: () => '',
      providesTags: ['BanquetVenue'],
    }),

    // Get active banquet venues
    getActiveBanquetVenues: builder.query<BanquetVenue[], void>({
      query: () => '/active',
      providesTags: ['BanquetVenue'],
    }),

    // Get banquet venue by ID
    getBanquetVenue: builder.query<BanquetVenue, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'BanquetVenue', id }],
    }),

    // Create banquet venue
    createBanquetVenue: builder.mutation<BanquetVenue, CreateBanquetVenueRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('capacity', body.capacity);
        formData.append('area', body.area);
        formData.append('ac', body.ac);
        formData.append('description', body.description);
        
        if (body.features) {
          formData.append('features', JSON.stringify(body.features));
        }
        if (body.pricing) {
          formData.append('pricing', JSON.stringify(body.pricing));
        }
        if (body.location) {
          formData.append('location', body.location);
        }
        if (body.isActive !== undefined) {
          formData.append('isActive', body.isActive.toString());
        }
        if (body.order !== undefined) {
          formData.append('order', body.order.toString());
        }
        if (body.images) {
          body.images.forEach((image) => {
            formData.append('images', image);
          });
        }

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['BanquetVenue'],
    }),

    // Update banquet venue
    updateBanquetVenue: builder.mutation<BanquetVenue, UpdateBanquetVenueRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.title) formData.append('title', body.title);
        if (body.capacity) formData.append('capacity', body.capacity);
        if (body.area) formData.append('area', body.area);
        if (body.ac) formData.append('ac', body.ac);
        if (body.description) formData.append('description', body.description);
        if (body.features) formData.append('features', JSON.stringify(body.features));
        if (body.pricing) formData.append('pricing', JSON.stringify(body.pricing));
        if (body.location) formData.append('location', body.location);
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());
        if (body.existingImages) {
          formData.append('existingImages', JSON.stringify(body.existingImages));
        }
        if (body.images) {
          body.images.forEach((image) => {
            formData.append('images', image);
          });
        }

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'BanquetVenue', id },
        'BanquetVenue',
      ],
    }),

    // Delete banquet venue
    deleteBanquetVenue: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BanquetVenue'],
    }),

    // Toggle banquet venue status
    toggleBanquetVenueStatus: builder.mutation<BanquetVenue, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'BanquetVenue', id },
        'BanquetVenue',
      ],
    }),

    // Reorder banquet venues
    reorderBanquetVenues: builder.mutation<BanquetVenue[], ReorderBanquetVenuesRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['BanquetVenue'],
    }),
  }),
});

export const {
  useGetBanquetVenuesQuery,
  useGetActiveBanquetVenuesQuery,
  useGetBanquetVenueQuery,
  useCreateBanquetVenueMutation,
  useUpdateBanquetVenueMutation,
  useDeleteBanquetVenueMutation,
  useToggleBanquetVenueStatusMutation,
  useReorderBanquetVenuesMutation,
} = banquetVenueApi;
