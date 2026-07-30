"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CustomerBooking, CustomerBookingStatus } from "@/lib/types";
import { createReview } from "@/service/customer/reviewActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  CalendarDays, MapPin, DollarSign, Wrench, Clock,
  CheckCircle2, XCircle, PlayCircle, CreditCard,
  Star, User, Tag, Eye, AlertCircle, Info,
  Hash, Send, Search, ChevronLeft, ChevronRight, ArrowUpDown,
} from "lucide-react";

// ── Status config ─────────────────────────────────────────────────────
const STATUS_CFG: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  REQUESTED:   { label: "Requested",   icon: Clock,        className: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  ACCEPTED:    { label: "Accepted",    icon: CheckCircle2, className: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  PAID:        { label: "Paid",        icon: CreditCard,   className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  IN_PROGRESS: { label: "In Progress", icon: PlayCircle,   className: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  COMPLETED:   { label: "Completed",   icon: CheckCircle2, className: "border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  DECLINED:    { label: "Declined",    icon: XCircle,      className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400" },
  CANCELLED:   { label: "Cancelled",   icon: XCircle,      className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-500" },
};

const FILTERS: { label: string; value: CustomerBookingStatus | "ALL" }[] = [
  { label: "All",         value: "ALL" },
  { label: "Requested",   value: "REQUESTED" },
  { label: "Accepted",    value: "ACCEPTED" },
  { label: "Paid",        value: "PAID" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed",   value: "COMPLETED" },
  { label: "Declined",    value: "DECLINED" },
];

// ── Sort options ──────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { label: "Newest First",    sortBy: "createdAt",   sortOrder: "desc" },
  { label: "Oldest First",    sortBy: "createdAt",   sortOrder: "asc"  },
  { label: "Date ↑ (Booking)",sortBy: "bookingDate", sortOrder: "asc"  },
  { label: "Date ↓ (Booking)",sortBy: "bookingDate", sortOrder: "desc" },
  { label: "Price: Low → High",sortBy: "totalAmount", sortOrder: "asc" },
  { label: "Price: High → Low",sortBy: "totalAmount", sortOrder: "desc"},
] as const;
function Row({ icon: Icon, label, value, valueClass, mono }: {
  icon: React.ElementType; label: string; value: React.ReactNode;
  valueClass?: string; mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="size-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className={`text-sm font-semibold text-foreground break-all ${mono ? "font-mono text-xs" : ""} ${valueClass ?? ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{children}</p>;
}

// ── Star picker ───────────────────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button key={i} type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star className={`size-6 transition-colors ${i < (hovered || value) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
        </button>
      ))}
      {value > 0 && <span className="ml-2 text-sm font-bold text-amber-500">{value}/5</span>}
    </div>
  );
}

// ── Review form ───────────────────────────────────────────────────────
function ReviewForm({ booking, onSubmitted }: { booking: CustomerBooking; onSubmitted: () => void }) {
  const [rating, setRating]   = useState(0);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);
  const techProfileId = booking.service.technicianProfile?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0)      { toast.error("Please select a rating."); return; }
    if (!techProfileId)    { toast.error("Technician info missing."); return; }
    setPending(true);
    try {
      const result = await createReview({
        bookingId: booking.id, technicianProfileId: techProfileId,
        rating, comment: comment.trim() || undefined,
      });
      if (result.success) { toast.success("Review submitted!"); onSubmitted(); }
      else toast.error(result.message || "Failed to submit.");
    } catch { toast.error("An unexpected error occurred."); }
    finally { setPending(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <StarPicker value={rating} onChange={setRating} />
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)..."
        className="min-h-[80px] resize-none bg-background/50 text-sm" />
      <Button type="submit" disabled={pending} size="sm" className="w-full gap-2 font-semibold">
        {pending
          ? <><span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />Submitting...</>
          : <><Send className="size-3.5" />Submit Review</>}
      </Button>
    </form>
  );
}

// ── Detail drawer ─────────────────────────────────────────────────────
function BookingDrawer({ booking, open, onClose, onReviewSubmitted }: {
  booking: CustomerBooking | null; open: boolean;
  onClose: () => void; onReviewSubmitted: () => void;
}) {
  if (!booking) return null;
  const cfg        = STATUS_CFG[booking.status] ?? STATUS_CFG["REQUESTED"];
  const StatusIcon = cfg.icon;
  const tech       = booking.service.technicianProfile;
  const payment    = booking.payment;
  const review     = booking.review;
  const canReview  = booking.status === "COMPLETED" && !review;

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col gap-0 p-0 overflow-hidden">
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/60 shrink-0">
          <div className="flex items-center gap-3 pr-8">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="size-4 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-sm font-bold">Booking Details</SheetTitle>
              <p className="text-xs text-muted-foreground font-mono select-all">#{booking.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 min-h-0">
          <Badge variant="outline" className={`gap-1.5 text-xs font-semibold px-3 py-1.5 w-fit ${cfg.className}`}>
            <StatusIcon className="size-3.5" />{cfg.label}
          </Badge>

          {/* Service */}
          <div className="space-y-2">
            <SectionTitle>Service</SectionTitle>
            <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
              <Row icon={Wrench}     label="Title"    value={booking.service.title} />
              <Row icon={Tag}        label="Category" value={booking.service.category.name} />
              <Row icon={DollarSign} label="Price"    value={`$${booking.service.price}`} valueClass="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <Separator className="opacity-40" />

          {/* Technician */}
          {tech && (
            <>
              <div className="space-y-2">
                <SectionTitle>Technician</SectionTitle>
                <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
                  <Row icon={User}  label="Name"  value={tech.user.name} />
                  <Row icon={Tag}   label="Email" value={tech.user.email} />
                  {tech.serviceArea && <Row icon={MapPin} label="Area" value={tech.serviceArea} />}
                </div>
              </div>
              <Separator className="opacity-40" />
            </>
          )}

          {/* Booking info */}
          <div className="space-y-2">
            <SectionTitle>Booking Info</SectionTitle>
            <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
              <Row icon={CalendarDays} label="Date"    value={new Date(booking.bookingDate).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })} />
              {booking.timeSlot && <Row icon={Clock}   label="Time"    value={booking.timeSlot} />}
              <Row icon={MapPin}       label="Address" value={booking.address} />
              <Row icon={DollarSign}   label="Total"   value={`$${booking.totalAmount}`} valueClass="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <Separator className="opacity-40" />

          {/* Payment */}
          <div className="space-y-2">
            <SectionTitle>Payment</SectionTitle>
            {payment ? (
              <div className="rounded-xl border border-border/60 bg-card/60 p-3 space-y-2.5">
                <Row icon={CreditCard} label="Status"   value={payment.status}
                     valueClass={payment.status === "COMPLETED" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600"} />
                <Row icon={DollarSign} label="Amount"   value={`$${payment.amount}`} valueClass="text-emerald-600 dark:text-emerald-400" />
                {payment.provider && <Row icon={CreditCard} label="Provider" value={payment.provider} />}
                {payment.transactionId && <Row icon={Hash} label="Transaction ID" value={payment.transactionId} mono />}
                {payment.paidAt && <Row icon={Clock} label="Paid At" value={new Date(payment.paidAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })} />}
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-border/60 p-3 text-muted-foreground">
                <Info className="size-3.5 shrink-0" /><p className="text-xs">No payment yet.</p>
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
                    <Star key={i} className={`size-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
                  ))}
                  <span className="ml-2 text-sm font-bold">{review.rating}/5</span>
                </div>
                {review.comment
                  ? <p className="text-sm text-foreground italic border-l-2 border-primary/30 pl-3">&quot;{review.comment}&quot;</p>
                  : <p className="text-xs text-muted-foreground italic">No written comment.</p>
                }
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

// ── Compact booking card ──────────────────────────────────────────────
function BookingCard({ booking, onView }: { booking: CustomerBooking; onView: (b: CustomerBooking) => void }) {
  const cfg        = STATUS_CFG[booking.status] ?? STATUS_CFG["REQUESTED"];
  const StatusIcon = cfg.icon;
  const tech       = booking.service.technicianProfile?.user;
  const date       = new Date(booking.bookingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const needsReview = booking.status === "COMPLETED" && !booking.review;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-card/60 p-4 hover:border-primary/20 hover:shadow-sm transition-all duration-200">
      {/* Service + badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{booking.service.title}</p>
          <p className="text-xs text-muted-foreground truncate">{booking.service.category.name}</p>
        </div>
        <Badge variant="outline" className={`text-[10px] font-semibold shrink-0 px-2 py-0.5 ${cfg.className}`}>
          <StatusIcon className="size-2.5 mr-1" />{cfg.label}
        </Badge>
      </div>

      {/* Key info row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><CalendarDays className="size-3" />{date}</span>
        <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
          <DollarSign className="size-3" />{booking.totalAmount}
        </span>
        {tech && <span className="flex items-center gap-1 truncate max-w-[120px]"><User className="size-3 shrink-0" />{tech.name}</span>}
      </div>

      {/* Review stars if exists */}
      {booking.review && (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-2.5 ${i < booking.review!.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"}`} />
          ))}
          <span className="ml-1 text-[10px] font-semibold text-amber-500">{booking.review.rating}/5</span>
        </div>
      )}

      <Button size="sm" variant="outline" onClick={() => onView(booking)}
        className={`h-7 gap-1 text-[11px] font-semibold w-full mt-auto ${needsReview ? "border-amber-400/40 text-amber-600 hover:bg-amber-400/10" : ""}`}>
        <Eye className="size-3" />
        {needsReview ? "View & Leave Review" : "View Details"}
      </Button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────
interface Props {
  initialBookings: CustomerBooking[];
  meta: { page: number; limit: number; total: number };
  initialSearch: string;
  initialStatus: string;
  initialSortBy?: string;
  initialSortOrder?: string;
}

export function CustomerBookingsClient({ initialBookings, meta, initialSearch, initialStatus, initialSortBy, initialSortOrder }: Props) {
  const pathname      = usePathname();
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const debounceRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selected, setSelected]       = useState<CustomerBooking | null>(null);
  const [drawerOpen, setDrawerOpen]   = useState(false);

  // current sort label for display
  const currentSort = SORT_OPTIONS.find(
    (o) => o.sortBy === (initialSortBy ?? "createdAt") && o.sortOrder === (initialSortOrder ?? "desc")
  ) ?? SORT_OPTIONS[0];

  const updateURL = useCallback((updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v); else params.delete(k);
    });
    // reset page when filter/search changes
    if (!("page" in updates)) params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

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
            <BookingCard key={b.id} booking={b} onView={(b) => { setSelected(b); setDrawerOpen(true); }} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4">
          <Button variant="outline" size="sm" onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1} className="h-8 w-8 p-0">
            <ChevronLeft className="size-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
            .reduce<(number | "...")[]>((acc, p, idx, arr) => {
              if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("...");
              acc.push(p); return acc;
            }, [])
            .map((p, i) => p === "..."
              ? <span key={`e${i}`} className="text-xs text-muted-foreground px-1">…</span>
              : <Button key={p} size="sm" variant={currentPage === p ? "default" : "outline"}
                  onClick={() => handlePage(p as number)} className="h-8 w-8 p-0 text-xs">{p}</Button>
            )}
          <Button variant="outline" size="sm" onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages} className="h-8 w-8 p-0">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}

      <BookingDrawer
        booking={selected} open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </>
  );
}
