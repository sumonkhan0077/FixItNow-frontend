"use server";

import serverFetch from "@/utils/server-fatch";

export type CreateReviewPayload = {
  bookingId: string;
  technicianProfileId: string;
  rating: number;
  comment?: string;
};

export const createReview = async (
  payload: CreateReviewPayload
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await serverFetch.post("/api/reviews/create", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};
