"use server";

import { TechnicianProfileApiResponse, UpdateProfilePayload } from "@/lib/types";
import serverFetch from "@/utils/server-fatch";

export const getMyTechnicianProfile = async (): Promise<TechnicianProfileApiResponse | null> => {
  try {
    const res = await serverFetch.get("/api/technician-profile/my-profile", {
      cache: "no-store",
    } as RequestInit);

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export const updateTechnicianProfile = async (
  payload: UpdateProfilePayload
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await serverFetch.patch("/api/technician-profile/update-profile", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};
