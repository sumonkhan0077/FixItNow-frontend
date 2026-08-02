"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ServicesPagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/services?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 pt-12">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="gap-1 rounded-xl h-10 px-4"
      >
        <ChevronLeft className="size-4" /> Previous
      </Button>

      <div className="flex items-center gap-1.5 px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Page <strong className="text-foreground">{currentPage}</strong> of <strong className="text-foreground">{totalPages}</strong>
        </span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="gap-1 rounded-xl h-10 px-4"
      >
        Next <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}