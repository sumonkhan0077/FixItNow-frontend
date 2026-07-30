"use server";

import { BookingsApiResponse, BookingStatus } from "@/lib/types";
import serverFetch from "@/utils/server-fatch";

export type BookingQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const getTechnicianBookings = async (
  params: BookingQueryParams = {}
): Promise<BookingsApiResponse | null> => {
  try {
    const query = new URLSearchParams();
    if (params.page)       query.set("page",       String(params.page));
    if (params.limit)      query.set("limit",      String(params.limit));
    if (params.searchTerm) query.set("searchTerm", params.searchTerm);
    if (params.status)     query.set("status",     params.status);
    if (params.sortBy)     query.set("sortBy",     params.sortBy);
    if (params.sortOrder)  query.set("sortOrder",  params.sortOrder);

    const qs  = query.toString();
    const url = `/api/bookings/technician-bookings${qs ? `?${qs}` : ""}`;

    const res = await serverFetch.get(url, { cache: "no-store" } as RequestInit);
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