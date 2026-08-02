"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    createdAt: string | Date;
    comment?: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border/50 bg-background/50 p-4">
      <div className="mb-2 flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-3.5 ${
              i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
            }`}
          />
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
      {review.comment && (
        <div>
          <p className={`text-sm text-foreground leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}>
            {review.comment}
          </p>
          {review.comment.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xs font-semibold text-primary hover:underline focus:outline-none"
            >
              {isExpanded ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}