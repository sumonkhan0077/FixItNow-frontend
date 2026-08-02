import { Skeleton } from "@/components/ui/skeleton";
import { SlidersHorizontal } from "lucide-react";

export default function ServicesLoadingSkeleton() {
  return (
    <div>
      {/* Top Section Skeleton (Optional placeholder if needed) */}
      <div className="w-full bg-muted/30 py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-3">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded-lg" />
        </div>
      </div>

      {/* --- Services Content Section --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Mobile & Tablet Filter Toggle Bar Skeleton */}
        <div className="flex lg:hidden items-center justify-between mb-6 bg-card border rounded-2xl p-4 shadow-sm">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-44 rounded-md" />
            <Skeleton className="h-3 w-32 rounded-md" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Left Side: Filter Bar Skeleton */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24 rounded-3xl border bg-card p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-2 border-b">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-4 text-muted-foreground" />
                <Skeleton className="h-5 w-28 rounded-md" />
              </div>
            </div>

            {/* Search Filter Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-12 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Category Filter Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Service Area Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Price Range Skeleton */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>

            {/* Sort By Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-3 w-14 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="pt-2 flex flex-col gap-2.5">
              <Skeleton className="h-11 w-full rounded-xl" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>

          {/* Right Side: Services Grid Skeleton (9 Items) */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div
                  key={item}
                  className="group bg-card border border-border/85 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between h-full"
                >
                  {/* Top Image Container Skeleton */}
                  <div className="relative w-full h-52">
                    <Skeleton className="w-full h-full rounded-none" />
                  </div>

                  {/* Content Box Skeleton */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      {/* Price Skeleton */}
                      <Skeleton className="h-5 w-20 rounded-md" />

                      {/* Title Skeleton */}
                      <Skeleton className="h-5 w-full rounded-md" />
                      <Skeleton className="h-5 w-3/4 rounded-md" />

                      {/* Description Skeleton */}
                      <Skeleton className="h-3.5 w-full rounded-md" />
                      <Skeleton className="h-3.5 w-5/6 rounded-md" />
                    </div>

                    {/* Technician Info & Explore Link Skeleton */}
                    <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton className="size-7 rounded-full" />
                        <Skeleton className="h-3.5 w-20 rounded-md" />
                      </div>
                      <Skeleton className="h-3.5 w-14 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}