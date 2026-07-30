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
  title: string;
  description: string;
  price: string;
  category: { name: string };
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
  rating: number;
  comment?: string;
  createdAt: string;
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

export type BookingsMeta = {
  page: number;
  limit: number;
  total: number;
};

export type BookingsApiResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Booking[];
  meta?: BookingsMeta;
};
