"use server";

import serverFetch from "@/utils/server-fatch";
import { revalidatePath } from "next/cache";

export type UpdateMePayload = {
  name?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
};

export const updateMe = async (
  payload: UpdateMePayload
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await serverFetch.patch("/api/users/update/me", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      
      revalidatePath("/technician-dashboard/profile");
    }

    return data;
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};