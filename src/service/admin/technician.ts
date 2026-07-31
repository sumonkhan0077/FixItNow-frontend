import { getCookie } from "@/utils/getCookies";

const BASE_URL = "http://localhost:5000";


export type UserQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: string;
  technicianProfileId: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  category: ServiceCategory;
};

export type Availability = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type TechnicianProfile = {
  id: string;
  userId: string;
  bio: string;
  experience: number;
  serviceArea: string;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    profileImage: string | null;
    status: string;
  };
  services: Service[];
  availabilities: Availability[];
  _count: { 
    services: number; 
    reviews: number 
  };
};

export type TechnicianApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianProfile[];
  meta: { 
    page: number; 
    limit: number; 
    total: number 
  };
};

export type GetAllUsersError = {
  error: string;
  status?: number;
  details?: unknown;
};

export const getAllUsers = async (
  params: UserQueryParams = {},
): Promise<TechnicianApiResponse | GetAllUsersError> => {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.searchTerm) query.set("searchTerm", params.searchTerm);
    if (params.role) query.set("role", params.role);
    if (params.status) query.set("status", params.status);
    if (params.sortBy) query.set("sortBy", params.sortBy);
    if (params.sortOrder) query.set("sortOrder", params.sortOrder);

    const qs = query.toString();
    const url = `/api/technician-profile/all${qs ? `?${qs}` : ""}`;

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

    const data: TechnicianApiResponse = await res.json();
    // console.log("Technicians API Success:", data);
    return data;
  } catch (err) {
    console.error("Technicians API Exception:", err);
    return {
      error: err instanceof Error ? err.message : "Failed to fetch technicians",
      details: err,
    };
  }
};