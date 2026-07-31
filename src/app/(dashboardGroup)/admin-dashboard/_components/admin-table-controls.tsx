"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

interface AdminTableControlsProps {
  searchPlaceholder?: string;
  showRoleFilter?: boolean;
  showStatusFilter?: boolean;
  sortOptions?: { label: string; value: string }[];
  initialSearch?: string;
  initialRole?: string;
  initialStatus?: string;
  initialSortBy?: string;
  initialSortOrder?: string;
  total?: number;
  page?: number;
  limit?: number;
}

const ROLE_OPTIONS = [
  { label: "All Roles", value: "" },
  { label: "Customer", value: "CUSTOMER" },
  { label: "Technician", value: "TECHNICIAN" },
  { label: "Admin", value: "ADMIN" },
];

const STATUS_OPTIONS = [
  { label: "All Status", value: "" },
  { label: "Active", value: "ACTIVE" },
  { label: "Banned", value: "BANNED" },
];

const DEFAULT_SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt:desc" },
  { label: "Oldest First", value: "createdAt:asc" },
  { label: "Name A-Z", value: "name:asc" },
  { label: "Name Z-A", value: "name:desc" },
  { label: "Email A-Z", value: "email:asc" },
  { label: "Email Z-A", value: "email:desc" },
];

export function AdminTableControls({
  searchPlaceholder = "Search...",
  showRoleFilter = false,
  showStatusFilter = false,
  sortOptions = DEFAULT_SORT_OPTIONS,
  initialSearch = "",
  initialRole = "",
  initialStatus = "",
  initialSortBy,
  initialSortOrder,
  total = 0,
  page = 1,
  limit = 10,
}: AdminTableControlsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Controlled search state
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [prevInitialSearch, setPrevInitialSearch] = useState(initialSearch);


  if (initialSearch !== prevInitialSearch) {
    setPrevInitialSearch(initialSearch);
    setSearchTerm(initialSearch);
  }

  // Safe number conversions
  const safeTotal = Number(total) || 0;
  const safePage = Number(page) || 1;
  const safeLimit = Number(limit) || 10;

  const currentSort =
    sortOptions.find(
      (o) => o.value === `${initialSortBy || "createdAt"}:${initialSortOrder || "desc"}`
    ) ?? sortOptions[0];

  const totalPages = Math.max(1, Math.ceil(safeTotal / safeLimit));

  const updateURL = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    if (!("page" in updates)) params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateURL({ searchTerm: value || undefined });
    }, 500);
  };

  const handleRoleChange = (role: string) => {
    updateURL({ role: role || undefined });
  };

  const handleStatusChange = (status: string) => {
    updateURL({ status: status || undefined });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split(":");
    updateURL({ sortBy, sortOrder });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.replace(`${pathname}?${params.toString()}`);
  };

  const startRecord = safeTotal === 0 ? 0 : (safePage - 1) * safeLimit + 1;
  const endRecord = Math.min(safePage * safeLimit, safeTotal);

  return (
    <div className="space-y-4">
      {/* Search + Filters Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder={searchPlaceholder}
            className="pl-9 h-9 bg-card border-border text-sm"
          />
        </div>

        {/* Role Filter */}
        {showRoleFilter && (
          <select
            value={initialRole || ""}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Status Filter */}
        {showStatusFilter && (
          <select
            value={initialStatus || ""}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {/* Sort Dropdown */}
        <div className="relative shrink-0">
          <select
            value={currentSort.value}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-9 appearance-none rounded-lg border border-border bg-card pl-8 pr-8 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* Pagination Container - Always visible when total > 0 */}
      {safeTotal > 0 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Showing {startRecord} to {endRecord} of {safeTotal} results
          </p>

          {/* Show Navigation Buttons when totalPages > 1 */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage <= 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="size-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
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
                      variant={safePage === p ? "default" : "outline"}
                      onClick={() => handlePageChange(p as number)}
                      className="h-8 w-8 p-0 text-xs"
                    >
                      {p}
                    </Button>
                  )
                )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage >= totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}