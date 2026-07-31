"use server";

import { AvailabilityApiResponse, AvailabilityPayload } from "@/lib/types";
import serverFetch from "@/utils/server-fatch";

export const createAvailability = async (
  payload: AvailabilityPayload
): Promise<AvailabilityApiResponse> => {
  try {
    const res = await serverFetch.post("/api/availability/create", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    // console.log("[createAvailability] status:", res.status, "body:", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("[createAvailability] error:", err);
    return { success: false, statusCode: 500, message: "Something went wrong." };
  }
};

export const updateAvailability = async (
  timeId: string,
  payload: AvailabilityPayload
): Promise<AvailabilityApiResponse> => {
  try {
    const res = await serverFetch.patch(`/api/availability/update-slot/${timeId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    // console.log("[updateAvailability] status:", res.status, "body:", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("[updateAvailability] error:", err);
    return { success: false, statusCode: 500, message: "Something went wrong." };
  }
};

export const deleteAvailability = async (
  timeId: string
): Promise<AvailabilityApiResponse> => {
  try {
    const res = await serverFetch.delete(`/api/availability/${timeId}`);
    const data = await res.json();
    // console.log("[deleteAvailability] status:", res.status, "body:", JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("[deleteAvailability] error:", err);
    return { success: false, statusCode: 500, message: "Something went wrong." };
  }
};
