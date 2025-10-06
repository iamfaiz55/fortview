"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoutePrefetcher } from "@/components/RoutePrefetcher";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function ResortLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <RoutePrefetcher />
      <Header />
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        }>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
