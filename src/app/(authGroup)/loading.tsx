import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto h-4 w-72" />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />

          {/* Button */}
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}