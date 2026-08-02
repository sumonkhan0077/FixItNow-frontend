
import { cookies } from "next/headers";

const BASE_URL = process.env.BACKEND_API_URL || "https://fix-it-now-backend-ten.vercel.app";

async function getAuthHeader() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  return {
    "Content-Type": "application/json",
    ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
  };
}

export async function getPaymentsData() {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/api/payments`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    return [];
  }
}