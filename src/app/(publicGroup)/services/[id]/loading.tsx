import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetailsLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-32 px-4 md:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Back Button Skeleton */}
        <div>
          <Skeleton className="h-10 w-36 rounded-xl" />
        </div>

        <div className="space-y-16">
          {/* Top Section: Gallery & Action Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Image Gallery Skeleton */}
            <div className="lg:col-span-7 space-y-4">
              <Skeleton className="w-full h-[400px] md:h-[480px] rounded-[2rem]" />
              <div className="flex gap-3">
                <Skeleton className="w-20 h-20 rounded-2xl" />
                <Skeleton className="w-20 h-20 rounded-2xl" />
                <Skeleton className="w-20 h-20 rounded-2xl" />
              </div>
            </div>

            {/* Right Action Card Skeleton */}
            <div className="lg:col-span-5">
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-28 rounded-md" />
                  <Skeleton className="h-8 w-3/4 rounded-md" />
                </div>
                <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-slate-800">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-10 border-t border-stone-200 dark:border-slate-800">
            
            {/* Left Details: Description & Technician Profile */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Description Skeleton */}
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <Skeleton className="h-6 w-48 rounded-md" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                  <Skeleton className="h-4 w-5/6 rounded-md" />
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>
              </div>

              {/* Technician Profile Card Skeleton */}
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-6">
                <Skeleton className="h-6 w-52 rounded-md pb-4 border-b border-stone-100 dark:border-slate-800" />

                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shrink-0" />

                  <div className="space-y-3 flex-1 w-full">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-40 rounded-md" />
                        <Skeleton className="h-5 w-12 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-full rounded-md" />
                      <Skeleton className="h-4 w-4/5 rounded-md" />
                    </div>

                    <div className="flex flex-wrap gap-3 pt-1">
                      <Skeleton className="h-8 w-44 rounded-xl" />
                      <Skeleton className="h-8 w-36 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Availabilities & Reviews Skeleton */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <Skeleton className="h-6 w-40 rounded-md" />
                <div className="space-y-3 pt-2">
                  <Skeleton className="h-12 w-full rounded-xl" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <Skeleton className="h-6 w-32 rounded-md" />
                <div className="space-y-3 pt-2">
                  <Skeleton className="h-20 w-full rounded-2xl" />
                  <Skeleton className="h-20 w-full rounded-2xl" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}