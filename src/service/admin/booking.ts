import { getCookie } from "@/utils/getCookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type BookingStatus = "REQUESTED" | "ACCEPTED" | "PAID" | "COMPLETED" | "CANCELLED";

export type BookingQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type BookingCustomer = {
  id: string;
  name: string;
  email: string;
  profileImage: string | null;
};

export type BookingService = {
  id: string;
  technicianProfileId: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  image: string | null;
  category: {
    id: string;
    name: string;
  };
  technicianProfile: {
    id: string;
    user: {
      name: string;
      email: string;
    };
  };
};

export type BookingPayment = {
  id: string;
  transactionId: string;
  provider: string;
  amount: string;
  status: string;
  paidAt: string;
} | null;

export type BookingItem = {
  id: string;
  customerId: string;
  serviceId: string;
  bookingDate: string;
  timeSlot: string;
  address: string;
  totalAmount: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  customer: BookingCustomer;
  service: BookingService;
  payment: BookingPayment;
  review: {
    rating: number | string;
    comment: string;
    createdAt: string;
  } | null;
};

export type BookingsApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: BookingItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export type GetAllBookingsError = {
  success?: boolean;
  error: string;
  status?: number;
  details?: unknown;
};

export const getAllBookings = async (
  params: BookingQueryParams = {}
): Promise<BookingsApiResponse | GetAllBookingsError> => {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.searchTerm) query.set("searchTerm", params.searchTerm);
    if (params.status && params.status !== "ALL") query.set("status", params.status);
    if (params.sortBy) query.set("sortBy", params.sortBy);
    if (params.sortOrder) query.set("sortOrder", params.sortOrder);

    const qs = query.toString();
    const url = `/api/bookings/all-bookings${qs ? `?${qs}` : ""}`;

    const accessToken = await getCookie("accessToken");
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Bookings API Error Response:", res.status, errorText);
      return {
        error: `API returned ${res.status}: ${errorText || res.statusText}`,
        status: res.status,
      };
    }

    const data: BookingsApiResponse = await res.json();
    // console.log("Bookings API Success:", data);
    return data;
  } catch (err) {
    console.error("Bookings API Exception:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to fetch bookings",
      details: err,
    };
  }
};