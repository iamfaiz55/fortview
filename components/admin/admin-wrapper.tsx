'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { initializeAuth } from '@/redux/slices/authSlice';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface AdminWrapperProps {
  children: React.ReactNode;
}

export function AdminWrapper({ children }: AdminWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  // Check if current route is login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Initialize auth state from localStorage on mount
    dispatch(initializeAuth());
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    // Only redirect to login if not on login page and not authenticated
    if (mounted && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [mounted, isAuthenticated, router, isLoginPage]);

  // For login page, always render children (don't check authentication)
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show loading spinner during hydration and while checking authentication for protected routes
  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <>{children}</>;
}
