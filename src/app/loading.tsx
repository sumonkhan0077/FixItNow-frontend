import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <header className="absolute top-0 left-0 z-50 w-full">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Skeleton className="h-10 w-36 rounded-md" />

          {/* Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex h-[88vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl space-y-6">
            {/* Badge */}
            <Skeleton className="h-8 w-72 rounded-full" />

            {/* Title */}
            <Skeleton className="h-16 w-[650px]" />
            <Skeleton className="h-16 w-[520px]" />

            {/* Description */}
            <Skeleton className="h-5 w-[700px]" />
            <Skeleton className="h-5 w-[650px]" />
            <Skeleton className="h-5 w-[500px]" />

            {/* CTA */}
            <Skeleton className="h-14 w-56 rounded-xl" />
          </div>
        </div>
      </section>
    </main>
  );
}