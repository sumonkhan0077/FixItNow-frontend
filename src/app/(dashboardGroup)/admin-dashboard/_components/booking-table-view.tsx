"use client";

import { useState, useMemo } from "react";
import { 
  Search, X, User, CalendarDays, CheckCircle2, 
  CreditCard, Hourglass, AlertCircle, XCircle 
} from "lucide-react";
import Image from "next/image";
import { BookingDetailsModal } from "../_components/booking-details-modal";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";

// Status Badge Helper
const getStatusBadge = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="size-3" /> Completed
        </span>
      );
    case "PAID":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
          <CreditCard className="size-3" /> Paid
        </span>
      );
    case "ACCEPTED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
          <Hourglass className="size-3" /> Accepted
        </span>
      );
    case "REQUESTED":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <AlertCircle className="size-3" /> Requested
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          <XCircle className="size-3" /> {status}
        </span>
      );
  }
};

export function BookingTableView({ bookings }: { bookings: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Client side Search & Filter Logic
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const customerName = booking.customer?.name?.toLowerCase() || "";
      const customerEmail = booking.customer?.email?.toLowerCase() || "";
      const serviceTitle = booking.service?.title?.toLowerCase() || "";
      const query = searchTerm.toLowerCase();

      const matchesSearch =
        customerName.includes(query) ||
        customerEmail.includes(query) ||
        serviceTitle.includes(query);

      const matchesStatus =
        selectedStatus === "ALL" || booking.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchTerm, selectedStatus]);

  return (
    <div className="space-y-4">
      {/* Search Bar & Filter Controls */}
      <GsapWrapper animation="fadeUp" delay={0.02}>
        <div className="p-4 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          
          {/* Search Input Box */}
          <div className="relative w-full sm:w-80">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by customer or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-background border border-border/80 focus:outline-none focus:border-emerald-500 transition-colors text-foreground"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl bg-background border border-border/80 focus:outline-none focus:border-emerald-500 text-foreground cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="REQUESTED">Requested</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="PAID">Paid</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </GsapWrapper>

      {/* Main Table */}
      {filteredBookings.length === 0 ? (
        <GsapWrapper animation="fadeUp" delay={0.05}>
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center backdrop-blur-sm">
            <CalendarDays className="size-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-bold text-foreground">No Bookings Found</p>
            <p className="text-xs text-muted-foreground mt-1">
              No results match your search term or filter parameters.
            </p>
          </div>
        </GsapWrapper>
      ) : (
        <GsapWrapper animation="fadeUp" delay={0.05}>
          <div className="rounded-2xl border border-border/60 bg-gradient-to-b from-card via-card/90 to-card/60 shadow-xl overflow-hidden backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted/60 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 border-b border-border/70 sticky top-0 backdrop-blur-md">
                  <tr>
                    <th className="py-4 px-5 font-bold">Customer</th>
                    <th className="py-4 px-5 font-bold">Service</th>
                    <th className="py-4 px-5 font-bold">Booking Date</th>
                    <th className="py-4 px-5 font-bold">Amount</th>
                    <th className="py-4 px-5 font-bold">Status</th>
                    <th className="py-4 px-5 font-bold text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border/40 text-xs">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-emerald-500/[0.02] transition-colors duration-150 group"
                    >
                      {/* Customer Info */}
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="relative size-8 rounded-full overflow-hidden bg-muted border border-border/80 shrink-0">
                            {booking.customer?.profileImage && booking.customer.profileImage !== "fsdfs" ? (
                              <Image
                                src={booking.customer.profileImage}
                                alt={booking.customer.name || "Customer"}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-emerald-500/10 text-emerald-600">
                                <User className="size-3.5" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground text-xs">
                              {booking.customer?.name || "N/A"}
                            </p>
                            <p className="text-[10px] text-muted-foreground/80">
                              {booking.customer?.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Service Info */}
                      <td className="py-3 px-5">
                        <div className="max-w-[180px]">
                          <p className="font-semibold text-foreground truncate text-xs">
                            {booking.service?.title}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            {booking.service?.category?.name}
                          </span>
                        </div>
                      </td>

                      {/* Schedule Date */}
                      <td className="py-3 px-5 font-medium text-muted-foreground">
                        {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }) : "N/A"}
                      </td>

                      {/* Amount */}
                      <td className="py-3 px-5 whitespace-nowrap">
                        <span className="font-bold text-foreground">
                          ৳{booking.totalAmount}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-5 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>

                      {/* Details Modal Action Button */}
                      <td className="py-3 px-5 text-right whitespace-nowrap">
                        <BookingDetailsModal booking={booking} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GsapWrapper>
      )}
    </div>
  );
}