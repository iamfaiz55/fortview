import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../apis/authApi';

const getUserFromLocalStorage = (): { name: string, email: string, password: string, _id: string } | null => {
  if (typeof window === 'undefined') return null; // 🔐 Prevent SSR crash

  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const getTokenFromLocalStorage = (): string | null => {
  if (typeof window === 'undefined') return null; // 🔐 Prevent SSR crash

  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    _id: string;
    email: string;
    name: string;
  } | null;
}

const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
  isAuthenticated: !!getTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
          state.token = token;
          state.user = JSON.parse(user);
          state.isAuthenticated = true;
        }
      }
    },
  },

  extraReducers: (builder) =>
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
        state.isAuthenticated = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(payload.user));
          localStorage.setItem("token", payload.token);
        }
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      })
        
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;