import { getCookie } from "@/utils/getCookies";

const BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000";


 const accessToken = await getCookie("accessToken");

export async function createBooking(
  bookingData: { serviceId: string; bookingDate: string; address: string }, 
  token: string
) {
  try {
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