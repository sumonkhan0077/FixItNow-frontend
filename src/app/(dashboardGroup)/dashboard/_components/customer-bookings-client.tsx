"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CustomerBooking } from "@/lib/types";
import { FILTERS, SORT_OPTIONS } from "./booking-constants";
import { BookingCard } from "./booking-card";
import { BookingDrawer } from "./booking-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  AlertCircle,
} from "lucide-react";

interface Props {
  initialBookings: CustomerBooking[];
  meta: { page: number; limit: number; total: number };
  initialSearch: string;
  initialStatus: string;
  initialSortBy?: string;
  initialSortOrder?: string;
}

export function CustomerBookingsClient({
  initialBookings,
  meta,
  initialSearch,
  initialStatus,
  initialSortBy,
  initialSortOrder,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selected, setSelected] = useState<CustomerBooking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // current sort label for display
  const currentSort =
    SORT_OPTIONS.find(
      (o) =>
        o.sortBy === (initialSortBy ?? "createdAt") &&
        o.sortOrder === (initialSortOrder ?? "desc")
    ) ?? SORT_OPTIONS[0];

  const updateURL = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      // reset page when filter/search changes
      if (!("page" in updates)) params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Debounced search
  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateURL({ searchTerm: value || undefined });
    }, 500);
  };

  const handleStatus = (status: string) => {
    updateURL({ status: status === "ALL" ? undefined : status });
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    updateURL({ sortBy, sortOrder });
  };

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleReviewSubmitted = () => {
    setDrawerOpen(false);
    router.refresh();
  };

  const totalPages = Math.ceil(meta.total / meta.limit);
  const currentPage = meta.page;

  return (
    <>
      {/* Search + sort row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by service name..."
            className="pl-9 h-9 bg-card/60 border-border/60 text-sm"
          />
        </div>

        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <select
            value={`${currentSort.sortBy}:${currentSort.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split(":");
              handleSort(sortBy, sortOrder);
            }}
            className="h-9 appearance-none rounded-lg border border-border/60 bg-card/60 pl-8 pr-8 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={`${o.sortBy}:${o.sortOrder}`} value={`${o.sortBy}:${o.sortOrder}`}>
                {o.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => handleStatus(f.value)}
            className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-all ${
              (initialStatus || "ALL") === f.value
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/60 bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      {initialBookings.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <AlertCircle className="size-8 text-muted-foreground/30" />
          <p className="font-semibold text-foreground">No bookings found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onView={(b) => {
                setSelected(b);
                setDrawerOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="size-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce<(number | ".")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push(".");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "." ? (
                <span key={`e${i}`} className="text-xs text-muted-foreground px-1">
                  …
                </span>
              ) : (
                <Button
                  key={p}
                  size="sm"
                  variant={currentPage === p ? "default" : "outline"}
                  onClick={() => handlePage(p as number)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {p}
                </Button>
              )
            )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      <BookingDrawer
        booking={selected}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  );
}