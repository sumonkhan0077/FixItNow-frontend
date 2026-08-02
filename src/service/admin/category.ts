"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = process.env.BACKEND_API_URL || "https://fix-it-now-backend-ten.vercel.app";

export interface CreateCategoryPayload {
  name: string;
  description: string;
  icon?: string | null;
}

async function getAuthHeader() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  return {
    "Content-Type": "application/json",
    ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
  };
}

// Get All Categories
export async function getAllCategories() {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/api/categories/all`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

// Create Category
export async function createCategory(payload: CreateCategoryPayload) {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/api/categories/create`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: payload.name,
        description: payload.description,
        icon: payload.icon || null,
      }),
    });

    const data = await res.json();
    if (!res.ok) return { error: data.message || "Failed to create category" };

    revalidatePath("/admin/categories");
    return { success: true, data };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: "Something went wrong!" };
  }
}

// Delete Category
export async function deleteCategory(categoryId: string) {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${BASE_URL}/api/categories/delete/${categoryId}`, {
      method: "DELETE",
      headers,
    });

    const data = await res.json();
    if (!res.ok) return { error: data.message || "Failed to delete category" };

    revalidatePath("/admin/categories");
    return { success: true, data };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { error: "Something went wrong!" };
  }
}