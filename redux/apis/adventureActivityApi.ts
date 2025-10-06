import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface AdventureActivity {
  _id: string;
  name: string;
  description: string;
  detailedDescription: string;
  category: 'indoor' | 'outdoor' | 'water' | 'kids';
  image: {
    url: string;
    publicId: string;
  };
  icon: string;
  ageGroup: 'kids' | 'teens-adults' | 'kids-adults' | 'all-ages';
  difficulty: 'easy' | 'moderate' | 'hard';
  timing: 'all-day' | 'morning-evening' | 'evening';
  duration: string;
  capacity: string;
  highlights: string[];
  rating?: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  // Additional fields for adventure activities
  equipment?: string[];
  safetyRequirements?: string[];
  weatherDependent?: boolean;
  minAge?: number;
  maxAge?: number;
  price?: {
    adult: number;
    child: number;
    group?: number;
  };
  location?: string;
  instructorRequired?: boolean;
  groupSize?: {
    min: number;
    max: number;
  };
}

export interface AdventureActivitiesResponse {
  success: boolean;
  data: AdventureActivity[];
  count: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

export interface SingleAdventureActivityResponse {
  success: boolean;
  data: AdventureActivity;
}

export interface CreateAdventureActivityRequest {
  name: string;
  description: string;
  detailedDescription: string;
  category: 'indoor' | 'outdoor' | 'water' | 'kids';
  ageGroup: 'kids' | 'teens-adults' | 'kids-adults' | 'all-ages';
  difficulty: 'easy' | 'moderate' | 'hard';
  timing: 'all-day' | 'morning-evening' | 'evening';
  duration: string;
  capacity: string;
  highlights: string[];
  rating?: number;
  icon: string;
  order: number;
  isActive: boolean;
  image: File;
  // Additional fields
  equipment?: string[];
  safetyRequirements?: string[];
  weatherDependent?: boolean;
  minAge?: number;
  maxAge?: number;
  price?: {
    adult: number;
    child: number;
    group?: number;
  };
  location?: string;
  instructorRequired?: boolean;
  groupSize?: {
    min: number;
    max: number;
  };
}

export interface UpdateAdventureActivityRequest {
  id: string;
  name?: string;
  description?: string;
  detailedDescription?: string;
  category?: 'indoor' | 'outdoor' | 'water' | 'kids';
  ageGroup?: 'kids' | 'teens-adults' | 'kids-adults' | 'all-ages';
  difficulty?: 'easy' | 'moderate' | 'hard';
  timing?: 'all-day' | 'morning-evening' | 'evening';
  duration?: string;
  capacity?: string;
  highlights?: string[];
  rating?: number;
  icon?: string;
  order?: number;
  isActive?: boolean;
  image?: File;
  // Additional fields
  equipment?: string[];
  safetyRequirements?: string[];
  weatherDependent?: boolean;
  minAge?: number;
  maxAge?: number;
  price?: {
    adult: number;
    child: number;
    group?: number;
  };
  location?: string;
  instructorRequired?: boolean;
  groupSize?: {
    min: number;
    max: number;
  };
}

export const adventureActivityApi = createApi({
  reducerPath: 'adventureActivityApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/adventure-activities`,
    prepareHeaders: (headers, { getState }: any) => {
      try {
        const token = (getState()?.auth?.token) as string | undefined;
        if (token) {
          const clean = token.replace(/^"|"$/g, '');
          headers.set('authorization', `Bearer ${clean}`);
        }
      } catch {}
      return headers;
    },
  }),
  tagTypes: ['AdventureActivity'],
  keepUnusedDataFor: 300, // Keep data for 5 minutes
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnFocus: false,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    // Get all adventure activities
    getAdventureActivities: builder.query<AdventureActivitiesResponse, { 
      active?: boolean; 
      category?: string; 
      difficulty?: string; 
      ageGroup?: string;
      timing?: string;
      page?: number; 
      limit?: number 
    }>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.active !== undefined) searchParams.append('active', params.active.toString());
        if (params.category) searchParams.append('category', params.category);
        if (params.difficulty) searchParams.append('difficulty', params.difficulty);
        if (params.ageGroup) searchParams.append('ageGroup', params.ageGroup);
        if (params.timing) searchParams.append('timing', params.timing);
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());
        
        return `?${searchParams.toString()}`;
      },
      providesTags: ['AdventureActivity'],
    }),

    // Get single adventure activity
    getAdventureActivity: builder.query<SingleAdventureActivityResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'AdventureActivity', id }],
    }),

    // Create adventure activity
    createAdventureActivity: builder.mutation<SingleAdventureActivityResponse, CreateAdventureActivityRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('name', body.name);
        formData.append('description', body.description);
        formData.append('detailedDescription', body.detailedDescription);
        formData.append('category', body.category);
        formData.append('ageGroup', body.ageGroup);
        formData.append('difficulty', body.difficulty);
        formData.append('timing', body.timing);
        formData.append('duration', body.duration);
        formData.append('capacity', body.capacity);
        formData.append('icon', body.icon);
        formData.append('order', (body.order || 0).toString());
        formData.append('isActive', (body.isActive !== false).toString());
        formData.append('image', body.image);

        // Append highlights array
        body.highlights.forEach((highlight, index) => {
          formData.append(`highlights[${index}]`, highlight);
        });

        // Append optional fields
        if (body.rating !== undefined) {
          formData.append('rating', body.rating.toString());
        }
        if (body.equipment) {
          body.equipment.forEach((item, index) => {
            formData.append(`equipment[${index}]`, item);
          });
        }
        if (body.safetyRequirements) {
          body.safetyRequirements.forEach((req, index) => {
            formData.append(`safetyRequirements[${index}]`, req);
          });
        }
        if (body.weatherDependent !== undefined) {
          formData.append('weatherDependent', body.weatherDependent.toString());
        }
        if (body.minAge !== undefined) {
          formData.append('minAge', body.minAge.toString());
        }
        if (body.maxAge !== undefined) {
          formData.append('maxAge', body.maxAge.toString());
        }
        if (body.price) {
          formData.append('price[adult]', body.price.adult.toString());
          formData.append('price[child]', body.price.child.toString());
          if (body.price.group) {
            formData.append('price[group]', body.price.group.toString());
          }
        }
        if (body.location) {
          formData.append('location', body.location);
        }
        if (body.instructorRequired !== undefined) {
          formData.append('instructorRequired', body.instructorRequired.toString());
        }
        if (body.groupSize) {
          formData.append('groupSize[min]', body.groupSize.min.toString());
          formData.append('groupSize[max]', body.groupSize.max.toString());
        }

        return {
          url: '',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['AdventureActivity'],
    }),

    // Update adventure activity
    updateAdventureActivity: builder.mutation<SingleAdventureActivityResponse, UpdateAdventureActivityRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        
        if (body.name) formData.append('name', body.name);
        if (body.description) formData.append('description', body.description);
        if (body.detailedDescription) formData.append('detailedDescription', body.detailedDescription);
        if (body.category) formData.append('category', body.category);
        if (body.ageGroup) formData.append('ageGroup', body.ageGroup);
        if (body.difficulty) formData.append('difficulty', body.difficulty);
        if (body.timing) formData.append('timing', body.timing);
        if (body.duration) formData.append('duration', body.duration);
        if (body.capacity) formData.append('capacity', body.capacity);
        if (body.icon) formData.append('icon', body.icon);
        if (body.order !== undefined) formData.append('order', body.order.toString());
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.image) formData.append('image', body.image);

        // Handle highlights array
        if (body.highlights) {
          body.highlights.forEach((highlight, index) => {
            formData.append(`highlights[${index}]`, highlight);
          });
        }

        // Handle optional fields
        if (body.rating !== undefined) formData.append('rating', body.rating.toString());
        if (body.equipment) {
          body.equipment.forEach((item, index) => {
            formData.append(`equipment[${index}]`, item);
          });
        }
        if (body.safetyRequirements) {
          body.safetyRequirements.forEach((req, index) => {
            formData.append(`safetyRequirements[${index}]`, req);
          });
        }
        if (body.weatherDependent !== undefined) {
          formData.append('weatherDependent', body.weatherDependent.toString());
        }
        if (body.minAge !== undefined) {
          formData.append('minAge', body.minAge.toString());
        }
        if (body.maxAge !== undefined) {
          formData.append('maxAge', body.maxAge.toString());
        }
        if (body.price) {
          formData.append('price[adult]', body.price.adult.toString());
          formData.append('price[child]', body.price.child.toString());
          if (body.price.group) {
            formData.append('price[group]', body.price.group.toString());
          }
        }
        if (body.location) {
          formData.append('location', body.location);
        }
        if (body.instructorRequired !== undefined) {
          formData.append('instructorRequired', body.instructorRequired.toString());
        }
        if (body.groupSize) {
          formData.append('groupSize[min]', body.groupSize.min.toString());
          formData.append('groupSize[max]', body.groupSize.max.toString());
        }

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'AdventureActivity', id },
        'AdventureActivity',
      ],
    }),

    // Delete adventure activity
    deleteAdventureActivity: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdventureActivity'],
    }),

    // Toggle adventure activity status
    toggleAdventureActivityStatus: builder.mutation<SingleAdventureActivityResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'AdventureActivity', id },
        'AdventureActivity',
      ],
    }),

    // Reorder adventure activities
    reorderAdventureActivities: builder.mutation<AdventureActivitiesResponse, { items: { id: string; order: number }[] }>({
      query: (body) => ({
        url: '/reorder',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['AdventureActivity'],
    }),
  }),
});

export const {
  useGetAdventureActivitiesQuery,
  useGetAdventureActivityQuery,
  useCreateAdventureActivityMutation,
  useUpdateAdventureActivityMutation,
  useDeleteAdventureActivityMutation,
  useToggleAdventureActivityStatusMutation,
  useReorderAdventureActivitiesMutation,
} = adventureActivityApi;
