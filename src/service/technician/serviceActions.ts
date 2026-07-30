"use server";

import { ServicesApiResponse, ServicePayload, CategoriesApiResponse } from "@/lib/types";
import serverFetch from "@/utils/server-fatch";

export const getCategories = async (): Promise<CategoriesApiResponse | null> => {
  try {
    const res = await serverFetch.get("/api/categories/all", {
      cache: "no-store",
    } as RequestInit);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export const getMyServices = async (): Promise<ServicesApiResponse | null> => {
  try {
    const res = await serverFetch.get("/api/services/my-service", {
      cache: "no-store",
    } as RequestInit);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export const createService = async (
  payload: ServicePayload
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await serverFetch.post("/api/services/create", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};

export const updateService = async (
  serviceId: string,
  payload: Partial<ServicePayload>
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await serverFetch.patch(`/api/services/${serviceId}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};

export const deleteService = async (
  serviceId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await serverFetch.delete(`/api/services/delete/${serviceId}`);
    return res.json();
  } catch {
    return { success: false, message: "Something went wrong." };
  }
};
