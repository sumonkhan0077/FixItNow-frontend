"use server";
import { getCookie } from "@/utils/getCookies";

const BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

export async function createBooking(bookingData: {
  serviceId: string;
  bookingDate: string;
  address: string;
}) {
  try {
    // accessToken-ke function er bhitore ana holo jate protibar fresh token paoajay
    const accessToken = await getCookie("accessToken");

    const res = await fetch(`${BASE_URL}/api/bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
      },
      body: JSON.stringify(bookingData),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    // console.error("Booking creation error:", error);
    return { error: "Failed to create booking" };
  }
}


export async function createCheckoutSession(bookingId: string) {
  try {
    const accessToken = await getCookie("accessToken");

    const res = await fetch(`${BASE_URL}/api/payments/create-checkout-session/${bookingId}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { error: "Failed to create checkout session" };
  }
}