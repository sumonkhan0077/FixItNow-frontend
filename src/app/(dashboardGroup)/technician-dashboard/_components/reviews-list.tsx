"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { TechnicianReview } from "@/lib/types";

const PAGE_SIZE = 8;

function StarsMini({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`size-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: TechnicianReview }) {
  const name     = review.customer?.name ?? "Customer";
  const initials = name.slice(0, 2).toUpperCase();
  const service  = review.booking?.service;
  const date     = new Date(review.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  return (
    <div className="flex gap-3 rounded-xl border border-border/60 bg-card/60 p-4 hover:border-primary/20 hover:bg-card transition-all duration-200">
      {/* Avatar */}
      <Avatar className="size-9 shrink-0 border border-border/60 mt-0.5">
        <AvatarImage src={review.customer?.profileImage ?? undefined} />
        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{initials}</AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">
        {/* Name + stars + date */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{name}</p>
            <StarsMini rating={review.rating} />
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{date}</span>
        </div>

        {/* Comment */}
        {review.comment && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            &quot;{review.comment}&quot;
          </p>
        )}

        {/* Service tag */}
        {service && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <Badge variant="outline" className="gap-1 text-[11px] px-2 py-0.5 border-primary/20 bg-primary/5 text-primary font-medium">
              <Wrench className="size-2.5" />
              {service.title}
            </Badge>
            <span className="text-xs text-muted-foreground font-medium">${service.price}</span>
          </div>
        )}
      </div>

      {/* Rating number */}
      <div className="shrink-0 flex flex-col items-center justify-start pt-0.5">
        <span className="text-sm font-bold text-amber-500">{review.rating}</span>
        <span className="text-[10px] text-muted-foreground">/5</span>
      </div>
    </div>
  );
}

export function ReviewsList({ reviews }: { reviews: TechnicianReview[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const paged = reviews.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          All Reviews ({reviews.length})
        </p>
        {totalPages > 1 && (
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {paged.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
            .reduce<(number | "...")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, i) =>
              p === "..." ? (
                <span key={`ellipsis-${i}`} className="text-xs text-muted-foreground px-1">…</span>
              ) : (
                <Button
                  key={p}
                  variant={page === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(p as number)}
                  className="h-8 w-8 p-0 text-xs"
                >
                  {p}
                </Button>
              )
            )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
