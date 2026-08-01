// ── Auth / shared user ──────────────────────────────────────────────
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string | null;
  address?: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status?: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
};

// ── Technician profile (matches GET /api/technician-profile/my-profile) ──
export type TechnicianService = {
  id: string;
  technicianProfileId?: string;
  categoryId?: string;
  title: string;
  description: string;
  price: string;
  image?:string;
  createdAt?: string;
  updatedAt?: string;
  category: { id?: string; name: string; description?: string };
};

export type DayOfWeek =
  | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY"
  | "FRIDAY" | "SATURDAY" | "SUNDAY";

export type TechnicianAvailability = {
  id: string;
  technicianProfileId?: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AvailabilityPayload = {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type AvailabilityApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: TechnicianAvailability;
};

export type TechnicianReview = {
  id: string;
  bookingId?: string;
  customerId?: string;
  technicianProfileId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
  customer?: {
    id: string;
    name: string;
    email: string;
    profileImage?: string | null;
  };
  booking?: {
    id: string;
    status?: string;
    serviceId?: string;
    bookingDate?: string;
    service?: {
      id: string;
      title: string;
      price: string;
      image?: string;
    };
  };
};

export type TechnicianProfileData = {
  id: string;
  userId: string;
  bio?: string;
  experience?: number;
  serviceArea?: string;
  averageRating?: number;
  createdAt: string;
  updatedAt: string;
  user: UserProfile;
  services: TechnicianService[];
  availabilities: TechnicianAvailability[];
  reviews: TechnicianReview[];
};

export type TechnicianProfileApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianProfileData;
};

export type UpdateProfilePayload = {
  bio?: string;
  experience?: number;
  serviceArea?: string;
};

export type CreateProfilePayload = {
  bio: string;
  experience: number;
  serviceArea: string;
};

// ── Categories (matches GET /api/categories/all) ─────────────────────
export type Category = {
  id: string;
  name: string;
};

export type CategoriesApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
};

// ── My Services (matches GET /api/services/my-service) ──────────────
export type ServiceCategory = {
  id: string;
  name: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  image?:string;
  categoryId: string;
  technicianProfileId: string;
  createdAt: string;
  updatedAt: string;
  category: ServiceCategory;
};

export type ServicesApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Service[];
};

export type ServicePayload = {
  title: string;
  description: string;
  price: string;
  image?:string;
  categoryId: string;
};

// ── Navbar / shared response types ──────────────────────────────────
export type GetProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: { profile: UserProfile };
};

export type NavbarProps = {
  user?: UserProfile;
};

// ── Bookings (matches GET /api/bookings/technician-bookings) ─────────
export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DECLINED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export type BookingReview = {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
};

export type Booking = {
  id: string;
  customerId: string;
  serviceId: string;
  bookingDate: string;
  timeSlot?: string;
  address: string;
  totalAmount: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    profileImage?: string | null;
  };
  service: {
    id: string;
    technicianProfileId?: string;
    categoryId?: string;
    title: string;
    description?: string;
    price: string;
    image?:string;
    createdAt?: string;
    updatedAt?: string;
    category: {
      id?: string;
      name: string;
      description?: string;
      icon?: string | null;
    };
  };
  payment?: { id?: string; status: PaymentStatus; amount?: string } | null;
  review?: BookingReview | null;
};

// ── Customer Bookings (matches GET /api/bookings/my-bookings) ────────
export type CustomerBookingStatus =
  | "REQUESTED" | "ACCEPTED" | "PAID" | "IN_PROGRESS" | "COMPLETED" | "DECLINED" | "CANCELLED";

export type CustomerBooking = {
  id: string;
  customerId: string;
  serviceId: string;
  bookingDate: string;
  timeSlot?: string;
  address: string;
  totalAmount: string;
  status: CustomerBookingStatus;
  createdAt: string;
  updatedAt: string;
  service: {
    id: string;
    title: string;
    description?: string;
    price: string;
    image?:string;
    category: { id?: string; name: string };
    technicianProfile?: {
      id: string;
      bio?: string;
      experience?: number;
      serviceArea?: string;
      averageRating?: number;
      user: { id: string; name: string; email: string; profileImage?: string | null };
    };
  };
  payment?: {
    id: string;
    amount: string;
    status: string;
    provider?: string;
    transactionId?: string;
    paidAt?: string;
  } | null;
  review?: {
    id: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
  } | null;
};

export type CustomerBookingsApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: { page: number; limit: number; total: number };
    data: CustomerBooking[];
  };
};

export type BookingsApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Booking[];
  meta?: { page: number; limit: number; total: number };
};


export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  profileImage: string | null;
  address: string | null;
  role: "ADMIN" | "TECHNICIAN" | "CUSTOMER" | string;
  status: "ACTIVE" | "BANNED" | string;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  page?: number;
  limit?: number;
  total?: number;
  totalPage?: number;
}

export interface UsersApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser[];      
  meta?: Meta;       
}


export interface ServiceQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  serviceArea?: string;
}

export interface ServiceItem {
  id: string;
  technicianProfileId: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string;
    icon: string | null;
    createdAt: string;
    updatedAt: string;
  };
  technicianProfile: {
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
      phone: string | null;
      profileImage: string | null;
      address: string | null;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
    availabilities: Array<{
      dayOfWeek: string;
      startTime: string;
      endTime: string;
    }>;
  };
}

export interface ServicesApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: ServiceItem[];
  };
}

export interface GetAllServicesError {
  error: string;
  status?: number;
  details?: unknown;
}
