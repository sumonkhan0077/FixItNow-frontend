import { getTechnicianBookings } from "@/service/technician/bookingActions";
import { BookingsClient } from "../_components/bookings-client";

export default async function BookingsPage() {
  const res = await getTechnicianBookings();
  const bookings = res?.success ? res.data : [];

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
      <BookingsClient initialBookings={bookings} />
    </div>
  );
}
