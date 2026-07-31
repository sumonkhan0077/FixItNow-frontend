"use server";

import { getCookie } from "@/utils/getCookies";

const BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

export type UserQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

// 1. API Response অনুযায়ী সঠিক User Type
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  address: string | null;
  role: "ADMIN" | "CUSTOMER" | "TECHNICIAN" | string;
  status: "ACTIVE" | "BLOCKED" | string;
  createdAt: string;
  updatedAt: string;
};

// 2. API Response Wrapper Type
export type UserApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export type GetAllUsersError = {
  error: string;
  status?: number;
  details?: unknown;
};

export const getAllUsers = async (
  params: UserQueryParams = {}
): Promise<UserApiResponse | GetAllUsersError> => {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.searchTerm) query.set("searchTerm", params.searchTerm);
    if (params.role) query.set("role", params.role);      // 👈 role ফিল্টার যুক্ত করা হলো
    if (params.status) query.set("status", params.status);  // 👈 status ফিল্টার যুক্ত করা হলো
    if (params.sortBy) query.set("sortBy", params.sortBy);
    if (params.sortOrder) query.set("sortOrder", params.sortOrder);

    const qs = query.toString();
    const url = `/api/users/all-users${qs ? `?${qs}` : ""}`;

    const accessToken = await getCookie("accessToken");

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", res.status, errorText);
      return {
        error: `API returned ${res.status}: ${errorText || res.statusText}`,
        status: res.status,
      };
    }

    const data: UserApiResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Users API Exception:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to fetch users",
      details: err,
    };
  }
};