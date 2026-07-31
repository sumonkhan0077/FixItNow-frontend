// service/admin/booking.ts
import { getCookie } from "@/utils/getCookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type BookingStatus = "REQUESTED" | "ACCEPTED" | "PAID" | "COMPLETED" | "CANCELLED";

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
    rating: number;
    comment: string;
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

export async function getAllBookings(): Promise<BookingsApiResponse | { error: string }> {
  try {
    const accessToken = await getCookie("accessToken");
    const res = await fetch(`${BASE_URL}/api/bookings/all-bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      return { error: `Failed to fetch bookings: ${res.status}` };
    }

    return await res.json();
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Something went wrong" };
  }
}