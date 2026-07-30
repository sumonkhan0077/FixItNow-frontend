"use client";

import Image from "next/image";
import { CustomerBooking } from "@/lib/types";
import { STATUS_CFG } from "./booking-constants";
import { Row } from "./row";
import { SectionTitle } from "./section-title";
import { ReviewForm } from "./review-form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CalendarDays,
  MapPin,
  DollarSign,
  Wrench,
  Clock,
  CreditCard,
  Star,
  User,
  Tag,
  Info,
  Hash,
} from "lucide-react";

interface BookingDrawerProps {
  booking: CustomerBooking | null;
  open: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

export function BookingDrawer({
  booking,
  open,
  onClose,
  onReviewSubmitted,
}: BookingDrawerProps) {
  if (!booking) return null;

  const cfg = STATUS_CFG[booking.status] ?? STATUS_CFG["REQUESTED"];
  const tech = booking.service.technicianProfile;
  const payment = booking.payment;
  const review = booking.review;
  const canReview = booking.status === "COMPLETED" && !review;

  return (
    <Sheet open={open} onOpenChange={(o) => {
      if (!o) onClose();
    }}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg flex flex-col gap-0 p-0 overflow-hidden"
      >
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/60 shrink-0">
          <div className="flex items-center gap-3 pr-8">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="size-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-sm font-bold">Booking Details</SheetTitle>
              <p className="text-xs text-muted-foreground font-mono select-all">
                #{booking.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 min-h-0">
          <Badge
            variant="outline"
            className={`gap-1.5 text-xs font-semibold px-3 py-1.5 w-fit ${cfg.className}`}
          >
            {cfg.icon && <cfg.icon className="size-3.5" />}
            {cfg.label}
          </Badge>

          {/* Service */}
          <div className="space-y-2">
            <SectionTitle>Service</SectionTitle>
            <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
              {/* Service image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted mb-2">
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
              <Row icon={<Wrench className="size-3.5 text-muted-foreground" />} label="Title" value={booking.service.title} />
              <Row icon={<Tag className="size-3.5 text-muted-foreground" />} label="Category" value={booking.service.category.name} />
              <Row
                icon={<DollarSign className="size-3.5 text-muted-foreground" />}
                label="Price"
                value={`$${booking.service.price}`}
                valueClass="text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>
          <Separator className="opacity-40" />

          {/* Technician */}
          {tech && (
            <>
              <div className="space-y-2">
                <SectionTitle>Technician</SectionTitle>
                <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
                  <Row icon={<User className="size-3.5 text-muted-foreground" />} label="Name" value={tech.user.name} />
                  <Row icon={<Tag className="size-3.5 text-muted-foreground" />} label="Email" value={tech.user.email} />
                  {tech.serviceArea && (
                    <Row icon={<MapPin className="size-3.5 text-muted-foreground" />} label="Area" value={tech.serviceArea} />
                  )}
                </div>
              </div>
              <Separator className="opacity-40" />
            </>
          )}

          {/* Booking info */}
          <div className="space-y-2">
            <SectionTitle>Booking Info</SectionTitle>
            <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
              <Row
                icon={<CalendarDays className="size-3.5 text-muted-foreground" />}
                label="Date"
                value={new Date(booking.bookingDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              />
              {booking.timeSlot && (
                <Row icon={<Clock className="size-3.5 text-muted-foreground" />} label="Time" value={booking.timeSlot} />
              )}
              <Row icon={<MapPin className="size-3.5 text-muted-foreground" />} label="Address" value={booking.address} />
              <Row
                icon={<DollarSign className="size-3.5 text-muted-foreground" />}
                label="Total"
                value={`$${booking.totalAmount}`}
                valueClass="text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>
          <Separator className="opacity-40" />

          {/* Payment */}
          <div className="space-y-2">
            <SectionTitle>Payment</SectionTitle>
            {payment ? (
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
                <Row
                  icon={<CreditCard className="size-3.5 text-muted-foreground" />}
                  label="Status"
                  value={payment.status}
                  valueClass={payment.status === "COMPLETED" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600"}
                />
                <Row
                  icon={<DollarSign className="size-3.5 text-muted-foreground" />}
                  label="Amount"
                  value={`$${payment.amount}`}
                  valueClass="text-emerald-600 dark:text-emerald-400"
                />
                {payment.provider && (
                  <Row icon={<CreditCard className="size-3.5 text-muted-foreground" />} label="Provider" value={payment.provider} />
                )}
                {payment.transactionId && (
                  <Row icon={<Hash className="size-3.5 text-muted-foreground" />} label="Transaction ID" value={payment.transactionId} mono />
                )}
                {payment.paidAt && (
                  <Row
                    icon={<Clock className="size-3.5 text-muted-foreground" />}
                    label="Paid At"
                    value={new Date(payment.paidAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-border/60 p-3 text-muted-foreground">
                <Info className="size-3.5 shrink-0" />
                <p className="text-xs">No payment yet.</p>
              </div>
            )}
          </div>
          <Separator className="opacity-40" />

          {/* Review */}
          <div className="space-y-2">
            <SectionTitle>Your Review</SectionTitle>
            {review ? (
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-bold">{review.rating}/5</span>
                </div>
                {review.comment ? (
                  <p className="text-sm text-foreground italic border-l-2 border-primary/30 pl-3">
                    &quot;{review.comment}&quot;
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground italic">No written comment.</p>
                )}
              </div>
            ) : canReview ? (
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-3">
                <p className="text-xs text-muted-foreground">Rate your experience with this service.</p>
                <ReviewForm booking={booking} onSubmitted={onReviewSubmitted} />
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-border/60 p-3 text-muted-foreground">
                <Info className="size-3.5 shrink-0" />
                <p className="text-xs">
                  {booking.status === "COMPLETED" ? "No review yet." : "Available after completion."}
                </p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}