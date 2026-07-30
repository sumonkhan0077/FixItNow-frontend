import { getMyBookings } from "@/service/customer/bookingActions";
import { CustomerBookingsClient } from "@/app/(dashboardGroup)/dashboard/_components/customer-bookings-client";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { CalendarDays } from "lucide-react";

interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function CustomerBookingsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const res = await getMyBookings({
    page:       sp.page       ? Number(sp.page) : 1,
    limit:      10,
    searchTerm: sp.searchTerm || undefined,
    status:     sp.status     || undefined,
    sortBy:     sp.sortBy     || undefined,
    sortOrder:  (sp.sortOrder as "asc" | "desc") || undefined,
  });

  const bookings = res?.success ? res.data.data   : [];
  const meta     = res?.success ? res.data.meta   : { page: 1, limit: 10, total: 0 };

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6 lg:p-8 space-y-6">
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <CalendarDays className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">My Bookings</h1>
            <p className="text-sm text-muted-foreground">{meta.total} booking{meta.total !== 1 ? "s" : ""} total</p>
          </div>
        </div>
      </GsapWrapper>

      <CustomerBookingsClient
        initialBookings={bookings}
        meta={meta}
        initialSearch={sp.searchTerm ?? ""}
        initialStatus={sp.status ?? "ALL"}
        initialSortBy={sp.sortBy}
        initialSortOrder={sp.sortOrder}
      />
    </div>
  );
}
