import { getAllBookings, BookingItem } from "@/service/admin/booking";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { CalendarDays, User, CheckCircle2, CreditCard, Hourglass, AlertCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { BookingDetailsModal } from "../_components/booking-details-modal";


// সংক্ষেপিত স্ট্যাটাস ব্যাজ
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

export default async function AdminBookingsPage() {
  const result = await getAllBookings();

  if ("error" in result) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-center text-destructive">
          <p className="font-semibold">Failed to load bookings</p>
          <p className="text-sm mt-1">{result.error}</p>
        </div>
      </div>
    );
  }

  const bookings: BookingItem[] = result.data || [];
  const totalBookings = result.meta?.total || bookings.length;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm">
              <CalendarDays className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Bookings Management
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total {totalBookings} booking requests registered
              </p>
            </div>
          </div>
        </div>
      </GsapWrapper>

      {/* Main Table */}
      {bookings.length === 0 ? (
        <GsapWrapper animation="fadeUp" delay={0.1}>
          <div className="rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center backdrop-blur-sm">
            <CalendarDays className="size-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-bold text-foreground">No Bookings Found</p>
            <p className="text-xs text-muted-foreground mt-1">
              There are currently no bookings made in the system.
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
                  {bookings.map((booking) => (
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
                                alt={booking.customer.name}
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
                        {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
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