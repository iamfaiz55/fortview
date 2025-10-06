'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { initializeAuth } from '@/redux/slices/authSlice';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize authentication state from localStorage on app startup
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
}
