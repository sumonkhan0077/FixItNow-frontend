import { Suspense } from "react";
import { getMyServices } from "@/service/technician/serviceActions";
import { ServicesClient } from "../_components/services-client";
import { Skeleton } from "@/components/ui/skeleton";

async function ServicesContent() {
  const res = await getMyServices();
  const services = res?.success ? res.data : [];

  return <ServicesClient initialServices={services} />;
}

function ServicesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="size-11 rounded-2xl" />
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-3.5 w-24 rounded" />
          </div>
        </div>
        <Skeleton className="h-9 w-36 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-52 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesContent />
      </Suspense>
    </div>
  );
}
