import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: {
    url: string;
    publicId: string;
  };
  price?: number;
  capacity?: number;
  category: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: File;
  price?: number;
  capacity?: number;
  category: string;
  isActive?: boolean;
}

export interface UpdateEventRequest {
  id: string;
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: File;
  price?: number;
  capacity?: number;
  category?: string;
  isActive?: boolean;
}

export interface ReorderEventsRequest {
  items: Array<{
    id: string;
    order: number;
  }>;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ` 'https://fortview-backend.vercel.app/api/events`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        const cleanToken = token.replace(/^"(.*)"$/, '$1');
        headers.set('authorization', `Bearer ${cleanToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Event'],
  keepUnusedDataFor: 300,
  refetchOnMountOrArgChange: 30,
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all events
    getAllEvents: builder.query<Event[], void>({
      query: () => '',
      providesTags: ['Event'],
    }),
    // Get active events
    getActiveEvents: builder.query<Event[], void>({
      query: () => '/active',
      providesTags: ['Event'],
    }),
    // Get event by ID
    getEvent: builder.query<Event, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),
    // Create event
    createEvent: builder.mutation<Event, CreateEventRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        formData.append('date', body.date);
        formData.append('time', body.time);
        formData.append('location', body.location);
        formData.append('image', body.image);
        formData.append('category', body.category);
        if (body.price !== undefined) formData.append('price', body.price.toString());
        if (body.capacity !== undefined) formData.append('capacity', body.capacity.toString());
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Event'],
    }),
    // Update event
    updateEvent: builder.mutation<Event, UpdateEventRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.title) formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.date) formData.append('date', body.date);
        if (body.time) formData.append('time', body.time);
        if (body.location) formData.append('location', body.location);
        if (body.image) formData.append('image', body.image);
        if (body.category) formData.append('category', body.category);
        if (body.price !== undefined) formData.append('price', body.price.toString());
        if (body.capacity !== undefined) formData.append('capacity', body.capacity.toString());
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Event', id },
        'Event',
      ],
    }),
    // Delete event
    deleteEvent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),
    // Toggle event status
    toggleEventStatus: builder.mutation<Event, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Event', id }, 'Event'],
    }),
    // Reorder events
    reorderEvents: builder.mutation<Event[], ReorderEventsRequest>({
      query: (body) => ({
        url: '/reorder',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetActiveEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useToggleEventStatusMutation,
  useReorderEventsMutation,
} = eventApi;
