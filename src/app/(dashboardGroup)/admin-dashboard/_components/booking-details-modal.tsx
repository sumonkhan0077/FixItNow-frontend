"use client";

import { useState } from "react";
import { 
  Eye, Star, MapPin, User, Wrench, Calendar, 
  CheckCircle2, XCircle, Clock, CreditCard, 
  Sparkles, X, AlertCircle, Hourglass, Receipt, Tag, MessageSquareQuote
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { BookingItem } from "@/service/admin/booking";

interface BookingDetailsModalProps {
  booking: BookingItem;
}

// স্ট্যাটাস অনুযায়ী ব্যাজের কালার ডাইনামিক করার ফাংশন
const getStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="size-3.5" /> Completed
        </span>
      );
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          <CreditCard className="size-3.5" /> Paid
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          <Hourglass className="size-3.5" /> Accepted
        </span>
      );
    case "REQUESTED":
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <AlertCircle className="size-3.5" /> Requested
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          <XCircle className="size-3.5" /> {status}
        </span>
      );
  }
};

export function BookingDetailsModal({ booking }: BookingDetailsModalProps) {
  const [open, setOpen] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="py-1.5 px-3 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white text-emerald-600 dark:text-emerald-400 font-semibold text-xs rounded-xl transition-all duration-200 flex items-center gap-1.5 border border-emerald-500/20 shadow-sm active:scale-[0.98]">
          <Eye className="size-3.5" />
          Details
        </button>
      </DialogTrigger>

      {/* Center Dialog Content */}
      <DialogContent className="!w-[90vw] !max-w-sm sm:!max-w-xl md:!max-w-2xl lg:!max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-background/95 backdrop-blur-xl sm:rounded-2xl border border-border/80 shadow-2xl transition-all [&>button]:hidden">
        
        {/* Header */}
        <DialogHeader className="p-5 border-b border-border/60 bg-muted/30 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-500/20">
                <Receipt className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-bold text-foreground tracking-tight">
                  Booking Details
                </DialogTitle>
                <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  ID: #{booking.id?.slice(-8)?.toUpperCase() || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Badge */}
              {getStatusBadge(booking.status)}

              {/* Close Button */}
              <DialogClose className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors focus:outline-none">
                <X className="size-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* SECTION 1: CUSTOMER & TECHNICIAN INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Customer Box */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                <User className="size-3.5 text-emerald-500" /> Customer Information
              </h3>
              <div className="p-3.5 rounded-xl border border-border/70 bg-card/60 flex items-center gap-3">
                <div className="relative size-12 rounded-full overflow-hidden bg-muted border border-border shrink-0">
                  {booking.customer?.profileImage && booking.customer.profileImage !== "fsdfs" ? (
                    <Image
                      src={booking.customer.profileImage}
                      alt={booking.customer.name || "Customer"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                      <User className="size-6" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground text-sm truncate">{booking.customer?.name || "N/A"}</h4>
                  <p className="text-xs text-muted-foreground truncate">{booking.customer?.email}</p>
                </div>
              </div>
            </div>

            {/* Technician Box */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                <Wrench className="size-3.5 text-emerald-500" /> Assigned Technician
              </h3>
              <div className="p-3.5 rounded-xl border border-border/70 bg-card/60 flex items-center gap-3">
                <div className="size-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <Wrench className="size-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-foreground text-sm truncate">
                    {booking.service?.technicianProfile?.user?.name || "N/A"}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {booking.service?.technicianProfile?.user?.email || "No Email"}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 2: SERVICE DETAILS */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-emerald-500" /> Service Information
            </h3>

            <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {booking.service?.image ? (
                    <div className="relative size-12 rounded-lg overflow-hidden border border-border shrink-0 bg-muted">
                      <Image
                        src={booking.service.image}
                        alt={booking.service.title || "Service"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="size-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-500">
                      <Wrench className="size-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{booking.service?.title}</h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded text-[10px] bg-muted font-medium text-muted-foreground">
                      <Tag className="size-3" /> {booking.service?.category?.name}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">৳{booking.service?.price} BDT</p>
                </div>
              </div>

              {booking.service?.description && (
                <p className="text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/40">
                  {booking.service.description}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 3: SCHEDULE & LOCATION */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <Calendar className="size-3.5 text-emerald-500" /> Schedule & Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-border/70 bg-card/60 flex items-center gap-2.5">
                <Calendar className="size-4 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium">Date</p>
                  <p className="font-semibold text-foreground">
                    {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }) : "N/A"}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-border/70 bg-card/60 flex items-center gap-2.5">
                <Clock className="size-4 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium">Time Slot</p>
                  <p className="font-semibold text-foreground">{booking.timeSlot || "N/A"}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-border/70 bg-card/60 flex items-center gap-2.5">
                <MapPin className="size-4 text-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground font-medium">Address</p>
                  <p className="font-semibold text-foreground capitalize truncate">{booking.address || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: PAYMENT INFORMATION */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
              <CreditCard className="size-3.5 text-emerald-500" /> Payment Details
            </h3>

            <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
              <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                <span className="text-xs text-muted-foreground font-medium">Total Amount</span>
                <span className="font-black text-base text-foreground">৳{booking.totalAmount} BDT</span>
              </div>

              {booking.payment ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Provider</p>
                    <p className="font-semibold text-foreground uppercase">{booking.payment.provider}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Transaction ID</p>
                    <p className="font-mono text-foreground font-semibold truncate" title={booking.payment.transactionId}>
                      {booking.payment.transactionId}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Paid At</p>
                    <p className="font-semibold text-foreground">
                      {booking.payment.paidAt ? new Date(booking.payment.paidAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold text-center">
                  Payment is pending or not yet processed.
                </div>
              )}
            </div>
          </div>

          {/* SECTION 5: CUSTOMER REVIEW (ENHANCED) */}
          {booking.review && (
            <div className="space-y-2.5">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                <MessageSquareQuote className="size-3.5 text-amber-500" /> Customer Review
              </h3>

              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 space-y-2.5">
                <div className="flex items-center justify-between">
                  {/* Star Rating Render */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`size-4 ${
                          star <= (booking.review?.rating || 0)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 font-bold text-xs text-foreground">
                      {booking.review.rating}.0
                    </span>
                  </div>

                  <span className="text-[10px] text-muted-foreground">
                    {new Date(booking.review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                </div>

                {/* Comment area with collapsible text for long reviews */}
                <div className="text-xs text-foreground/90 italic bg-background/60 dark:bg-card/60 p-3 rounded-lg border border-border/40">
                  <p className={!showFullReview && booking.review.comment.length > 120 ? "line-clamp-2" : ""}>
                    "{booking.review.comment}"
                  </p>
                  {booking.review.comment.length > 120 && (
                    <button
                      onClick={() => setShowFullReview(!showFullReview)}
                      className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline mt-1.5 not-italic block"
                    >
                      {showFullReview ? "Show Less" : "Read Full Review"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border/60 bg-muted/30 text-center text-[11px] text-muted-foreground">
          Created: {new Date(booking.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>

      </DialogContent>
    </Dialog>
  );
}