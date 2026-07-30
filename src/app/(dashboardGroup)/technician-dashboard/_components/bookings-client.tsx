"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { toast } from "sonner";
import { BookingStatus } from "@/lib/types";
import {
  getTechnicianBookings,
  updateBookingStatus,
} from "@/service/technician/bookingActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  MapPin,
  DollarSign,
  Wrench,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  Eye,
  Mail,
  Tag,
  FileText,
  CreditCard,
  Lock,
} from "lucide-react";
import Image from "next/image";

// ── Status transition map ────────────────────────────────────────────
const NEXT_STATUS: Partial<Record<BookingStatus, BookingStatus>> = {
  REQUESTED: "ACCEPTED",
  ACCEPTED: "PAID",
  PAID:"IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
};

const CAN_DECLINE: BookingStatus[] = ["REQUESTED"];
const TERMINAL: BookingStatus[] = ["COMPLETED", "DECLINED", "CANCELLED"];

// ── Status badge config ──────────────────────────────────────────────
const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string; icon: React.ElementType }
> = {
  REQUESTED: {
    label: "Requested",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    icon: Clock,
  },
  ACCEPTED: {
    label: "Accepted",
    className: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    icon: CheckCircle2,
  },
  PAID: {
    label: "Paid",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
    icon: PlayCircle,
  },
  COMPLETED: {
    label: "Completed",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  DECLINED: {
    label: "Declined",
    className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
    icon: XCircle,
  },
  CANCELLED: {
    label: "Cancelled",
    className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-500",
    icon: XCircle,
  },
};

const PAYMENT_CONFIG: Record<string, { label: string; className: string }> = {
  PAID: {
    label: "Paid",
    className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  UNPAID: {
    label: "Unpaid",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  PENDING: {
    label: "Pending",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  FAILED: {
    label: "Failed",
    className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400",
  },
};

// ── Booking card ─────────────────────────────────────────────────────
function BookingCard({
  booking,
  onStatusUpdate,
  updatingId,
  onViewDetails,
}: {
  booking: any;
  onStatusUpdate: (id: string, status: BookingStatus) => Promise<void>;
  updatingId: string | null;
  onViewDetails: (booking: any) => void;
}) {
  const isUpdating = updatingId === booking.id;
  const isTerminal = TERMINAL.includes(booking.status as BookingStatus);
  const nextStatus = NEXT_STATUS[booking.status as BookingStatus];
  
  // Checking Payment Status Safely
  const rawPaymentStatus = booking.payment?.status || (booking.payment ? "PENDING" : "UNPAID");
  const isPaid = rawPaymentStatus === "PAID";

  // Decline option is available only for REQUESTED status and UNPAID bookings
  const canDecline = CAN_DECLINE.includes(booking.status as BookingStatus) && !isPaid;

  const statusCfg = STATUS_CONFIG[booking.status as BookingStatus] || STATUS_CONFIG.REQUESTED;
  const paymentCfg = PAYMENT_CONFIG[rawPaymentStatus] || PAYMENT_CONFIG.UNPAID;
  const StatusIcon = statusCfg.icon;

  const formattedDate = new Date(booking.bookingDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="booking-card flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md">
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-11 shrink-0 border border-border/80 shadow-xs">
              <AvatarImage src={booking.customer?.profileImage ?? undefined} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {booking.customer?.name?.slice(0, 2).toUpperCase() || "CU"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">
                {booking.customer?.name || "N/A"}
              </h3>
              <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                <Mail className="size-3 shrink-0" />
                {booking.customer?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Badge
              variant="outline"
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.className}`}
            >
              <StatusIcon className="size-3 mr-1" />
              {statusCfg.label}
            </Badge>
           
          </div>
        </div>

        {/* Service Details */}
       <div className="border-t border-border/50 pt-3 space-y-2">
  <div className="flex items-center gap-3">
    {/* Service Image Container */}
    <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted shadow-sm group">
      {booking.service?.image ? (
        <Image
          src={booking.service.image}
          alt={booking.service?.title || "Service image"}
          fill
          sizes="48px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex size-full items-center justify-center bg-primary/10 text-primary">
          <Wrench className="size-5" />
        </div>
      )}
    </div>

    {/* Title & Category */}
    <div className="min-w-0 flex-1">
      <p className="text-sm font-bold text-foreground leading-snug truncate">
        {booking.service?.title}
      </p>
      <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mt-0.5">
        <Tag className="size-3 text-primary/70 shrink-0" />
        <span className="truncate">{booking.service?.category?.name}</span>
      </span>
    </div>
  </div>

  {/* Description */}
  {booking.service?.description && (
    <p className="text-xs text-muted-foreground line-clamp-1 italic bg-muted/40 px-2.5 py-1.5 rounded-lg border border-border/30">
      "{booking.service.description}"
    </p>
  )}
</div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2.5 rounded-xl bg-muted/30 p-3 text-xs border border-border/40">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <CalendarDays className="size-4 text-primary shrink-0" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 text-foreground font-medium">
            <Clock className="size-4 text-primary shrink-0" />
            <span>{booking.timeSlot}</span>
          </div>

          <div className="flex items-center gap-2 text-foreground font-medium">
            
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              ৳ {booking.totalAmount}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4 text-primary shrink-0" />
            <span className="capitalize truncate">{booking.address}</span>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onViewDetails(booking)}
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Eye className="size-3.5" />
          Details
        </Button>

        {!isTerminal && (
          <div className="flex items-center gap-2">
            {canDecline && (
              <Button
                size="sm"
                variant="outline"
                disabled={isUpdating}
                onClick={() => onStatusUpdate(booking.id, "DECLINED")}
                className="h-8 gap-1 text-xs font-semibold text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                <XCircle className="size-3.5" />
                Decline
              </Button>
            )}

            {nextStatus && (
              <Button
                size="sm"
                disabled={isUpdating}
                onClick={() => onStatusUpdate(booking.id, nextStatus)}
                className="h-8 gap-1.5 text-xs font-semibold"
              >
                {isUpdating ? (
                  <>
                    <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-3.5" />
                    Mark as {STATUS_CONFIG[nextStatus].label}
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────
const FILTERS: { label: string; value: BookingStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Requested", value: "REQUESTED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Declined", value: "DECLINED" },
];

export function BookingsClient({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState<any[]>(initialBookings);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<BookingStatus | "ALL">("ALL");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    gsap.fromTo(
      grid.querySelectorAll(".booking-card"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
    );
  }, [bookings, filter]);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTechnicianBookings();
      if (res?.success) setBookings(res.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusUpdate = async (bookingId: string, status: BookingStatus) => {
    setUpdatingId(bookingId);
    try {
      const result = await updateBookingStatus(bookingId, status);
      if (result.success) {
        toast.success(`Booking status changed to ${STATUS_CONFIG[status].label}!`);
        await refetch();
      } else {
        toast.error(result.message || "Failed to update status.");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
            <CalendarDays className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Bookings</h1>
            <p className="text-xs text-muted-foreground">
              Total {bookings.length} bookings · {filtered.length} currently shown
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          disabled={loading}
          className="gap-2 self-start sm:self-auto rounded-xl"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f.value === "ALL"
              ? bookings.length
              : bookings.filter((b) => b.status === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  filter === f.value ? "bg-white/20" : "bg-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 py-16 text-center bg-card/40">
          <AlertCircle className="size-10 text-muted-foreground/40" />
          <p className="font-bold text-foreground">No bookings found</p>
          <p className="text-xs text-muted-foreground">
            No booking requests match the current filter criteria.
          </p>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onStatusUpdate={handleStatusUpdate}
              updatingId={updatingId}
              onViewDetails={(b) => setSelectedBooking(b)}
            />
          ))}
        </div>
      )}

      {/* Detailed Modal Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              Booking Details
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-muted/40 rounded-xl space-y-2">
                <span className="font-bold text-muted-foreground uppercase text-[10px]">
                  Customer Details
                </span>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={selectedBooking.customer?.profileImage} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {selectedBooking.customer?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm text-foreground">
                      {selectedBooking.customer?.name}
                    </p>
                    <p className="text-muted-foreground">{selectedBooking.customer?.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Title:</span>
                  <span className="font-semibold">{selectedBooking.service?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-semibold">{selectedBooking.service?.category?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Date:</span>
                  <span className="font-semibold">
                    {new Date(selectedBooking.bookingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Slot:</span>
                  <span className="font-semibold">{selectedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Address:</span>
                  <span className="font-semibold capitalize">{selectedBooking.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="font-semibold">
                    {selectedBooking.payment?.status || "UNPAID"}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t pt-2">
                  <span className="font-bold">Total Amount:</span>
                  <span className="font-bold text-emerald-600">
                    ৳ {selectedBooking.totalAmount}
                  </span>
                </div>
              </div>

              <div className="bg-card border p-3 rounded-xl space-y-1 text-[11px] text-muted-foreground">
                <p>
                  Booking ID: <span className="font-mono text-foreground">{selectedBooking.id}</span>
                </p>
                <p>Created At: {new Date(selectedBooking.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}