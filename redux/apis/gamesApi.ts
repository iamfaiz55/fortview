import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface Game {
  _id: string;
  title: string;
  description: string;
  image: {
    url: string;
    publicId: string;
  };
  categories: string[];
  isActive: boolean;
  isUpcoming: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GamesResponse {
  success: boolean;
  data: Game[];
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

export interface GameResponse {
  success: boolean;
  data: Game;
}

export interface CreateGameRequest {
  title: string;
  description: string;
  categories: string[];
  isActive?: boolean;
  isUpcoming?: boolean;
  image: File;
}

export interface UpdateGameRequest {
  id: string;
  title?: string;
  description?: string;
  categories?: string[];
  isActive?: boolean;
  isUpcoming?: boolean;
  image?: File;
}

export interface GamesQueryParams {
  active?: boolean;
  category?: string;
  upcoming?: boolean;
  page?: number;
  limit?: number;
}

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/games`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Game'],
  endpoints: (builder) => ({
    // Get all games
    getGames: builder.query<GamesResponse, GamesQueryParams | void>({
      query: (params) => {
        if (!params) return '';
        
        const searchParams = new URLSearchParams();
        if ('active' in params && params.active !== undefined) searchParams.append('active', params.active.toString());
        if ('category' in params && params.category) searchParams.append('category', params.category);
        if ('upcoming' in params && params.upcoming !== undefined) searchParams.append('upcoming', params.upcoming.toString());
        if ('page' in params && params.page) searchParams.append('page', params.page.toString());
        if ('limit' in params && params.limit) searchParams.append('limit', params.limit.toString());
        
        const queryString = searchParams.toString();
        return queryString ? `?${queryString}` : '';
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Game' as const, id: _id })),
              { type: 'Game', id: 'LIST' },
            ]
          : [{ type: 'Game', id: 'LIST' }],
    }),

    // Get single game
    getGame: builder.query<GameResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Game', id }],
    }),

    // Create game
    createGame: builder.mutation<GameResponse, CreateGameRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('title', body.title);
        formData.append('description', body.description);
        formData.append('categories', JSON.stringify(body.categories));
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.isUpcoming !== undefined) formData.append('isUpcoming', body.isUpcoming.toString());
        formData.append('image', body.image);

        return {
          url: '/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Game', id: 'LIST' }],
    }),

    // Update game
    updateGame: builder.mutation<GameResponse, UpdateGameRequest>({
      query: ({ id, ...body }) => {
        const formData = new FormData();
        if (body.title) formData.append('title', body.title);
        if (body.description) formData.append('description', body.description);
        if (body.categories) formData.append('categories', JSON.stringify(body.categories));
        if (body.isActive !== undefined) formData.append('isActive', body.isActive.toString());
        if (body.isUpcoming !== undefined) formData.append('isUpcoming', body.isUpcoming.toString());
        if (body.image) formData.append('image', body.image);

        return {
          url: `/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Game', id },
        { type: 'Game', id: 'LIST' },
      ],
    }),

    // Delete game
    deleteGame: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Game', id },
        { type: 'Game', id: 'LIST' },
      ],
    }),

    // Toggle game status
    toggleGameStatus: builder.mutation<GameResponse, string>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Game', id },
        { type: 'Game', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetGamesQuery,
  useGetGameQuery,
  useCreateGameMutation,
  useUpdateGameMutation,
  useDeleteGameMutation,
  useToggleGameStatusMutation,
} = gamesApi;
