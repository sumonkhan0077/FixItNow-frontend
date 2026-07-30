"use server";

import { BookingsApiResponse, BookingStatus } from "@/lib/types";
import serverFetch from "@/utils/server-fatch";

export const getTechnicianBookings = async (): Promise<BookingsApiResponse | null> => {
  try {
    const res = await serverFetch.get("/api/bookings/technician-bookings", {
      cache: "no-store",
    } as RequestInit);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export const updateBookingStatus = async (
  bookingId: string,
  status: BookingStatus
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await serverFetch.patch(`/api/bookings/update-status/${bookingId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return res.json();
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};
