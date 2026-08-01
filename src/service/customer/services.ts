import { GetAllServicesError, ServiceQueryParams, ServicesApiResponse } from "@/lib/types";


const BASE_URL = process.env.BACKEND_API_URL || "http://localhost:5000";


export const getAllServices = async (
  params: ServiceQueryParams = {}
): Promise<ServicesApiResponse | GetAllServicesError> => {
  try {
    const query = new URLSearchParams();
    
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.searchTerm) query.set("searchTerm", params.searchTerm);
    if (params.minPrice) query.set("minPrice", String(params.minPrice));
    if (params.maxPrice) query.set("maxPrice", String(params.maxPrice));
    if (params.sortBy) query.set("sortBy", params.sortBy);
    if (params.sortOrder) query.set("sortOrder", params.sortOrder);
    if (params.serviceArea) query.set("serviceArea", params.serviceArea);

    const qs = query.toString();
    const url = `/api/services/all${qs ? `?${qs}` : ""}`;

   
    // const accessToken = await getCookie("accessToken");

    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ...(accessToken && { Cookie: `accessToken=${accessToken}` }),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Services API Error Response:", res.status, errorText);
      return {
        error: `API returned ${res.status}: ${errorText || res.statusText}`,
        status: res.status,
      };
    }

    const data: ServicesApiResponse = await res.json();
    return data;
  } catch (err) {
    console.error("Services API Exception:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to fetch services",
      details: err,
    };
  }
};