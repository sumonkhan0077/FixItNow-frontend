import { CustomerBookingStatus } from "@/lib/types";
import { Clock, CheckCircle2, XCircle, PlayCircle, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ── Status config ─────────────────────────────────────────────────────
export const STATUS_CFG: Record<string, { label: string; className: string; icon: LucideIcon }> = {
  REQUESTED:   { label: "Requested",   icon: Clock,        className: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  ACCEPTED:    { label: "Accepted",    icon: CheckCircle2, className: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  PAID:        { label: "Paid",        icon: CreditCard,   className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  IN_PROGRESS: { label: "In Progress", icon: PlayCircle,   className: "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  COMPLETED:   { label: "Completed",   icon: CheckCircle2, className: "border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  DECLINED:    { label: "Declined",    icon: XCircle,      className: "border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400" },
  CANCELLED:   { label: "Cancelled",   icon: XCircle,      className: "border-zinc-500/20 bg-zinc-500/10 text-zinc-500" },
};

export const FILTERS: { label: string; value: CustomerBookingStatus | "ALL" }[] = [
  { label: "All",         value: "ALL" },
  { label: "Requested",   value: "REQUESTED" },
  { label: "Accepted",    value: "ACCEPTED" },
  { label: "Paid",        value: "PAID" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Completed",   value: "COMPLETED" },
  { label: "Declined",    value: "DECLINED" },
];

// ── Sort options ──────────────────────────────────────────────────────
export const SORT_OPTIONS = [
  { label: "Newest First",    sortBy: "createdAt",   sortOrder: "desc" },
  { label: "Oldest First",    sortBy: "createdAt",   sortOrder: "asc"  },
  { label: "Date ↑ (Booking)",sortBy: "bookingDate", sortOrder: "asc"  },
  { label: "Date ↓ (Booking)",sortBy: "bookingDate", sortOrder: "desc" },
  { label: "Price: Low → High",sortBy: "totalAmount", sortOrder: "asc" },
  { label: "Price: High → Low",sortBy: "totalAmount", sortOrder: "desc"},
] as const;