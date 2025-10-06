'use client';

import { useState, memo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Images, 
  MessageSquare, 
  Settings, 
  Menu, 
  X,
  LogOut,
  ImageIcon,
  Gift,
  Camera,
  Activity,
  Building,
  Calendar,
  Gamepad2,
  Trophy,
  Utensils,
  Store
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/slices/authSlice';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Carousel', href: '/admin/carousel', icon: Images },
  { name: 'Home Gallery', href: '/admin/home-gallery', icon: ImageIcon },
  { name: 'Gallery', href: '/admin/gallery', icon: Images },
  { name: 'Events', href: '/admin/events', icon: Calendar },
  { name: 'Games', href: '/admin/games', icon: Gamepad2 },
  { name: 'Adventure Activities', href: '/admin/adventure-activities', icon: Activity },
  { name: 'Selfie Points', href: '/admin/selfie-points', icon: Camera },
  { name: 'Offers', href: '/admin/offers', icon: Gift },
  { name: 'Banquet Venues', href: '/admin/banquet-venues', icon: Building },
  { name: 'Awards', href: '/admin/awards', icon: Trophy },
  { name: 'Foods', href: '/admin/foods', icon: Utensils },
  { name: 'Food Stalls', href: '/admin/food-stalls', icon: Store },
  { name: 'Contacts', href: '/admin/contact', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

// Memoized navigation item component for better performance
const NavigationItem = memo(({ item, isActive, onClose }: { 
  item: typeof navigation[0], 
  isActive: boolean, 
  onClose?: () => void 
}) => (
  <Link
    href={item.href}
    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
      isActive
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
    onClick={onClose}
    prefetch={true}
  >
    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
    {item.name}
  </Link>
));

NavigationItem.displayName = 'NavigationItem';

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Remove loading state to prevent hydration mismatch
  // Let Suspense handle loading states instead

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white h-screen">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 min-h-0 flex flex-col">
            <nav className="flex-1 min-h-0 overflow-y-auto space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavigationItem
                  key={item.name}
                  item={item}
                  isActive={isActive}
                  onClose={closeSidebar}
                />
              );
            })}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-100">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col h-screen">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 min-h-0">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="flex-1 min-h-0 overflow-y-auto space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavigationItem
                  key={item.name}
                  item={item}
                  isActive={isActive}
                />
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-100">
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
