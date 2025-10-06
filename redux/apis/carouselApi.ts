import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface CarouselItem {
  _id: string;
  title: string;
  description: string;
  desktopImage: {
    url: string;
    publicId: string;
  };
  mobileImage: {
    url: string;
    publicId: string;
  };
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarouselResponse {
  success: boolean;
  data: CarouselItem[];
  count?: number;
  message?: string;
}

export interface SingleCarouselResponse {
  success: boolean;
  data: CarouselItem;
  message?: string;
}

export interface CreateCarouselRequest {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  desktopImage: File;
  mobileImage: File;
}

export interface UpdateCarouselRequest {
  id: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  order?: number;
  isActive?: boolean;
  desktopImage?: File;
  mobileImage?: File;
}

export interface ReorderCarouselsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export const carouselApi = createApi({
  reducerPath: 'carouselApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fortview-backend.vercel.app/api/carousel',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        const cleanToken = token.replace(/^"(.*)"$/, '$1');
        headers.set('authorization', `Bearer ${cleanToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Carousel'],
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all carousel items
    getCarousels: builder.query<CarouselResponse, { active?: boolean } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.active !== undefined) {
          searchParams.append('active', params.active.toString());
        }
        return `carousel?${searchParams.toString()}`;
      },
      providesTags: ['Carousel'],
    }),

    // Get single carousel item
    getCarousel: builder.query<SingleCarouselResponse, string>({
      query: (id) => `carousel/${id}`,
      providesTags: (result, error, id) => [{ type: 'Carousel', id }],
    }),

    // Create carousel item
    createCarousel: builder.mutation<SingleCarouselResponse, CreateCarouselRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        if (body.buttonText) formData.append('buttonText', body.buttonText);
        if (body.buttonLink) formData.append('buttonLink', body.buttonLink);
        if (body.order !== undefined) formData.append('order', body.order.toString());
        formData.append('desktopImage', body.desktopImage);
        formData.append('mobileImage', body.mobileImage);

        return {
          url: 'carousel',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Carousel'],
    }),

    // Update carousel item
    updateCarousel: builder.mutation<SingleCarouselResponse, UpdateCarouselRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.title) formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.buttonText !== undefined) formData.append('buttonText', body.buttonText);
        if (body.buttonLink !== undefined) formData.append('buttonLink', body.buttonLink);
        if (body.order !== undefined) formData.append('order', body.order.toString());
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.desktopImage) formData.append('desktopImage', body.desktopImage);
        if (body.mobileImage) formData.append('mobileImage', body.mobileImage);

        return {
          url: `carousel/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Carousel', id },
        'Carousel',
      ],
    }),

    // Delete carousel item
    deleteCarousel: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `carousel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Carousel'],
    }),

    // Toggle carousel item status
    toggleCarouselStatus: builder.mutation<SingleCarouselResponse, string>({
      query: (id) => ({
        url: `carousel/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Carousel', id },
        'Carousel',
      ],
    }),

    // Reorder carousel items
    reorderCarousels: builder.mutation<CarouselResponse, ReorderCarouselsRequest>({
      query: (body) => ({
        url: 'carousel/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Carousel'],
    }),
  }),
});

export const {
  useGetCarouselsQuery,
  useGetCarouselQuery,
  useCreateCarouselMutation,
  useUpdateCarouselMutation,
  useDeleteCarouselMutation,
  useToggleCarouselStatusMutation,
  useReorderCarouselsMutation,
} = carouselApi;
