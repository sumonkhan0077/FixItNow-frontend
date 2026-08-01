"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquare, ChevronDown } from "lucide-react";
import { GsapWrapper } from "@/app/(dashboardGroup)/technician-dashboard/_components/gsap-wrapper";

interface Review {
  id: string;
  rating: number;
  comment: string;
  customer: {
    name: string;
    profileImage?: string | null;
  };
}

interface ServiceReviewsProps {
  reviews: Review[];
}

export default function ServiceReviews({ reviews }: ServiceReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});

  const toggleComment = (id: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShowMoreReviews = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const isValidImageUrl = (url?: string | null) => {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    return (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/")
    );
  };

  return (
    <GsapWrapper animation="fadeUp" delay={0.4}>
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-stone-200/80 dark:border-slate-800 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
            <MessageSquare className="w-5 h-5 text-[#C05621]" />
            <h3>Customer Reviews ({reviews.length})</h3>
          </div>
        </div>

        {reviews && reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.slice(0, visibleCount).map((rev) => {
              const isExpanded = expandedComments[rev.id];
              const isLongComment = rev.comment.length > 120;
              const hasValidImage = isValidImageUrl(rev.customer.profileImage);

              return (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-slate-800/60 border border-stone-100 dark:border-slate-800 space-y-3"
                >
                  {/* Top: Customer Info & Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F4EFE6] dark:bg-slate-700 flex items-center justify-center shrink-0 border border-stone-200 dark:border-slate-700">
                        {hasValidImage ? (
                          <Image
                            src={rev.customer.profileImage!.trim()}
                            alt={rev.customer.name || "Customer"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold text-[#C05621] dark:text-amber-500 capitalize">
                            {rev.customer.name ? rev.customer.name.charAt(0) : "C"}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 capitalize">
                          {rev.customer.name}
                        </h4>
                        <span className="text-[10px] text-stone-400">Verified Customer</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200/50 dark:border-amber-900/50">
                      <span>⭐</span>
                      <span>{rev.rating}</span>
                    </div>
                  </div>

                  {/* Comment Text */}
                  <div className="space-y-1">
                    <p
                      className={`text-xs text-stone-600 dark:text-slate-300 leading-relaxed ${
                        !isExpanded && isLongComment ? "line-clamp-3" : ""
                      }`}
                    >
                      {rev.comment}
                    </p>

                    {isLongComment && (
                      <button
                        onClick={() => toggleComment(rev.id)}
                        className="text-xs font-semibold text-[#C05621] dark:text-amber-500 hover:underline focus:outline-none pt-1 inline-block cursor-pointer"
                      >
                        {isExpanded ? "See Less" : "See More..."}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {visibleCount < reviews.length && (
              <button
                onClick={handleShowMoreReviews}
                className="w-full py-3 mt-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-stone-100 dark:bg-slate-800 hover:bg-stone-200 dark:hover:bg-slate-700 rounded-2xl transition border border-stone-200 dark:border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Show More Reviews ({reviews.length - visibleCount} more)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-stone-400">No reviews available yet for this technician.</p>
        )}
      </div>
    </GsapWrapper>
  );
}