"use server";

import serverFetch from "@/utils/server-fatch";

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
    return res.json();
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};
