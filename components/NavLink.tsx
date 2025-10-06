"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
}

export function NavLink({ href, children, className, prefetch = true }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  useEffect(() => {
    if (prefetch) {
      // Prefetch the route when component mounts
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  }, [href, prefetch]);

  const handleMouseEnter = () => {
    if (prefetch) {
      // Additional prefetch on hover for better UX
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Link>
  );
}
