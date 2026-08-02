import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoadingSkeleton() {
  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto bg-slate-50 dark:bg-slate-950 transition-colors py-10">
      {/* Services Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="group bg-white dark:bg-slate-900 border border-slate-200/85 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between h-full"
          >
            {/* Top Image Container Skeleton */}
            <div className="relative w-full h-56">
              <Skeleton className="w-full h-full rounded-none" />
            </div>

            {/* Content Box Skeleton */}
            <div className="p-6 pt-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                {/* Price Skeleton */}
                <Skeleton className="h-5 w-20 rounded-md" />

                {/* Title Skeleton */}
                <Skeleton className="h-6 w-full rounded-md" />
                <Skeleton className="h-6 w-3/4 rounded-md" />

                {/* Description Skeleton */}
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>

              {/* Technician Info & Explore Link Skeleton */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}