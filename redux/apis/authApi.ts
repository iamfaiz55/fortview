import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export interface IUser {
    _id?: string
    name: string;

    email: string;
    password?: string;
   
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl:  'https://fortview-backend.vercel.app/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Only attach token for protected endpoints
      if (endpoint !== 'login' && endpoint !== 'register') {
        const token = (getState() as RootState).auth.token;
        if (token) {
          // Remove any quotes that might be around the token
          const cleanToken = token.replace(/^"(.*)"$/, '$1');
          headers.set('authorization', `Bearer ${cleanToken}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: { _id:string, name: string; email: string } },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        // ensure fetch includes cookies for cross-site auth
        credentials: 'include',
      }),
    }),
    register: builder.mutation<
      { token: string; user: { name: string; email: string } },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
        credentials: 'include',
      }),
    }),
    verifyToken: builder.query<{ user: any }, void>({
      query: () => ({ url: '/auth/verify', credentials: 'include' }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery,
} = authApi;
