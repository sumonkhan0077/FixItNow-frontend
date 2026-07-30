"use client";

import Image from "next/image";
import { CustomerBooking } from "@/lib/types";
import { STATUS_CFG } from "./booking-constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  DollarSign,
  Wrench,
  Star,
  User,
  Eye,
} from "lucide-react";

interface BookingCardProps {
  booking: CustomerBooking;
  onView: (b: CustomerBooking) => void;
}

export function BookingCard({ booking, onView }: BookingCardProps) {
  const cfg = STATUS_CFG[booking.status] ?? STATUS_CFG["REQUESTED"];
  const tech = booking.service.technicianProfile?.user;
  const date = new Date(booking.bookingDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const needsReview = booking.status === "COMPLETED" && !booking.review;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-4 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
      {/* Service image */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
        {booking.service.image ? (
          <Image
            src={booking.service.image}
            alt={booking.service.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Wrench className="size-8 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Service + badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {booking.service.title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {booking.service.category.name}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`text-[10px] font-semibold shrink-0 px-2 py-0.5 ${cfg.className}`}
        >
          {cfg.icon && <cfg.icon className="size-2.5 mr-1" />}
          <span className="ml-1">{cfg.label}</span>
        </Badge>
      </div>

      {/* Key info row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <CalendarDays className="size-3" />
          {date}
        </span>
        <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
          <DollarSign className="size-3" />
          {booking.totalAmount}
        </span>
        {tech && (
          <span className="flex items-center gap-1 truncate max-w-[120px]">
            <User className="size-3 shrink-0" />
            {tech.name}
          </span>
        )}
      </div>

      {/* Review stars if exists */}
      {booking.review && (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`size-2.5 ${
                i < booking.review!.rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/20"
              }`}
            />
          ))}
          <span className="ml-1 text-[10px] font-semibold text-amber-500">
            {booking.review.rating}/5
          </span>
        </div>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={() => onView(booking)}
        className={`h-7 gap-1 text-[11px] font-semibold w-full mt-auto ${
          needsReview ? "border-amber-400/40 text-amber-600 hover:bg-amber-400/10" : ""
        }`}
      >
        <Eye className="size-3" />
        {needsReview ? "View & Leave Review" : "View Details"}
      </Button>
    </div>
  );
}