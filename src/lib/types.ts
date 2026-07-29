export type TechnicianProfile = {
  id: string;
  userId: string;
  bio?: string;
  experience?: number;
  serviceArea?: string;
  averageRating?: number;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string ;
  address?: string ;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status?: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
  technicianProfile?: TechnicianProfile | null;
};

export type GetProfileResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: UserProfile;
  };
};

export type NavbarProps = {
  user?: UserProfile;
};