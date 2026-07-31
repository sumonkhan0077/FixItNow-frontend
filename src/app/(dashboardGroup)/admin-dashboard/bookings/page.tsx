import { getAllBookings, BookingItem } from "@/service/admin/booking";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { CalendarDays } from "lucide-react";
import { BookingTableView } from "../_components/booking-table-view";


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

      {/* Table & Search View */}
      <BookingTableView bookings={bookings} />
    </div>
  );
}