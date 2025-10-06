import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Offer {
  _id: string;
  image: {
    url: string;
    publicId: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOfferRequest {
  isActive?: boolean;
  order?: number;
  image: File;
}

export interface UpdateOfferRequest {
  id: string;
  isActive?: boolean;
  order?: number;
  image?: File;
}

export interface ReorderOffersRequest {
  offers: Array<{
    id: string;
    order: number;
  }>;
}

export interface OfferResponse {
  success: boolean;
  data: Offer[];
  count?: number;
  message?: string;
}

export interface SingleOfferResponse {
  success: boolean;
  data: Offer;
  message?: string;
}

export const offerApi = createApi({
  reducerPath: 'offerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/offers`,
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
  tagTypes: ['Offer'],
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all offers (admin only)
    getOffers: builder.query<Offer[], void>({
      query: () => '',
      providesTags: ['Offer'],
    }),

    // Get active offers (public)
    getActiveOffers: builder.query<Offer[], void>({
      query: () => '/active',
      providesTags: ['Offer'],
    }),

    // Get single offer
    getOffer: builder.query<Offer, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Offer', id }],
    }),

    // Create offer
    createOffer: builder.mutation<Offer, CreateOfferRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('image', body.image);
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Offer'],
    }),

    // Update offer
    updateOffer: builder.mutation<Offer, UpdateOfferRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.order !== undefined) formData.append('order', body.order.toString());
        if (body.image) formData.append('image', body.image);

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Offer', id },
        'Offer',
      ],
    }),

    // Delete offer
    deleteOffer: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Offer'],
    }),

    // Toggle offer status
    toggleOfferStatus: builder.mutation<Offer, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Offer', id },
        'Offer',
      ],
    }),

    // Reorder offers
    reorderOffers: builder.mutation<Offer[], ReorderOffersRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Offer'],
    }),
  }),
});

export const {
  useGetOffersQuery,
  useGetActiveOffersQuery,
  useGetOfferQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
  useToggleOfferStatusMutation,
  useReorderOffersMutation,
} = offerApi;
