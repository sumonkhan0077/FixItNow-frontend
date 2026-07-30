"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TechnicianProfileData } from "@/lib/types";
import {
  createTechnicianProfile,
  updateTechnicianProfile,
} from "@/service/technician/getTechnicianProfile";
import { updateMe } from "@/service/user/updateMe";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Save,
  Plus,
  MapPin,
  Clock,
  FileText,
  User,
  Phone,
  ImageIcon,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface EditProfileFormProps {
  /** Pass existing profile to enter edit mode; pass null to enter create mode */
  profile: TechnicianProfileData | null;
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const isEditMode = profile !== null;
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Loader States for separate actions
  const [isUserPending, setIsUserPending] = useState(false);
  const [isTechPending, setIsTechPending] = useState(false);

  // User Profile States
  const user = profile?.user;
  const [userForm, setUserForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    profileImage: user?.profileImage ?? "",
  });

  const initials = userForm.name
    ? userForm.name.slice(0, 2).toUpperCase()
    : "TECH";

  // GSAP stagger entrance animation
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".form-row"),
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  // 1. Handlers for Updating Personal Info (User API)
  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = userForm.name.trim();
    const phone = userForm.phone.trim() || undefined;
    const address = userForm.address.trim() || undefined;
    const profileImage = userForm.profileImage.trim() || undefined;

    if (!name) {
      toast.error("Name is required.");
      return;
    }

    setIsUserPending(true);
    try {
      const res = await updateMe({ name, phone, address, profileImage });
      if (res.success) {
        toast.success("Personal information updated successfully!");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update personal information.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUserPending(false);
    }
  };

  // 2. Handlers for Updating Professional Info (Technician API)
  const handleTechSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const bio = fd.get("bio")?.toString().trim() ?? "";
    const serviceArea = fd.get("serviceArea")?.toString().trim() ?? "";
    const expRaw = fd.get("experience")?.toString().trim() ?? "";
    const experience = expRaw ? Number(expRaw) : undefined;

    if (!bio) {
      toast.error("Bio is required.");
      return;
    }
    if (!serviceArea) {
      toast.error("Service area is required.");
      return;
    }
    if (experience === undefined || isNaN(experience) || experience < 0) {
      toast.error("Please enter a valid experience value.");
      return;
    }

    setIsTechPending(true);
    try {
      const res = isEditMode
        ? await updateTechnicianProfile({ bio, serviceArea, experience })
        : await createTechnicianProfile({ bio, serviceArea, experience });

      if (res.success) {
        toast.success(
          isEditMode
            ? "Technician details updated successfully!"
            : "Technician profile created successfully!"
        );
        router.push("/technician-dashboard/profile");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to update technician details.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsTechPending(false);
    }
  };

  return (
    <div ref={formRef} className="space-y-6">
      {/* ==================== 1. USER PERSONAL INFORMATION FORM ==================== */}
      <form onSubmit={handleUserSubmit} noValidate className="form-row rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-border/40">
          <div className="flex items-center gap-2 text-primary font-bold text-base">
            <User className="size-5" />
            <span>Personal Information</span>
          </div>
        </div>

        {/* Profile Picture & URL Input */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Avatar className="size-20 shrink-0 border-2 border-primary/20 shadow-sm">
            <AvatarImage src={userForm.profileImage || undefined} className="object-cover" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <ImageIcon className="size-3.5" /> Profile Image URL
            </label>
            <Input
              value={userForm.profileImage}
              onChange={(e) =>
                setUserForm({ ...userForm, profileImage: e.target.value })
              }
              placeholder="https://example.com/photo.jpg"
              className="bg-background/50 focus-visible:ring-primary/40"
            />
            <p className="text-[11px] text-muted-foreground">
              Paste a direct image URL. Preview updates automatically.
            </p>
          </div>
        </div>

        {/* Name & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <User className="size-3.5 text-primary" /> Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={userForm.name}
              onChange={(e) =>
                setUserForm({ ...userForm, name: e.target.value })
              }
              placeholder="e.g. John Doe"
              className="bg-background/50 focus-visible:ring-primary/40"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Phone className="size-3.5 text-primary" /> Phone Number
            </label>
            <Input
              value={userForm.phone}
              onChange={(e) =>
                setUserForm({ ...userForm, phone: e.target.value })
              }
              placeholder="e.g. +880 1700 000000"
              className="bg-background/50 focus-visible:ring-primary/40"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary" /> Address
          </label>
          <Input
            value={userForm.address}
            onChange={(e) =>
              setUserForm({ ...userForm, address: e.target.value })
            }
            placeholder="e.g. House 12, Road 5, Mirpur, Dhaka"
            className="bg-background/50 focus-visible:ring-primary/40"
          />
        </div>

        {/* Action Button 1 */}
        <div className="flex justify-end pt-2 border-t border-border/30">
          <Button
            type="submit"
            disabled={isUserPending}
            variant="outline"
            className="gap-2 px-6 h-10 text-xs font-semibold border-primary/30 hover:bg-primary/10"
          >
            {isUserPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                Saving Info...
              </>
            ) : (
              <>
                <Save className="size-3.5" />
                Save Personal Info
              </>
            )}
          </Button>
        </div>
      </form>

      {/* ==================== 2. TECHNICIAN PROFESSIONAL DETAILS FORM ==================== */}
      <form onSubmit={handleTechSubmit} noValidate className="form-row rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-border/40">
          <div className="flex items-center gap-2 text-primary font-bold text-base">
            <FileText className="size-5" />
            <span>Professional Details</span>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            Bio <span className="text-destructive">*</span>
          </label>
          <Textarea
            name="bio"
            defaultValue={profile?.bio ?? ""}
            placeholder="Tell clients about yourself, your skills, and expertise..."
            className="min-h-[110px] resize-none bg-background/50 focus-visible:ring-primary/40"
            required
          />
          <p className="text-[11px] text-muted-foreground">
            Briefly describe your experience and services to help clients trust your work.
          </p>
        </div>

        {/* Experience & Service Area Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="experience" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Clock className="size-3.5 text-primary" /> Experience (Years) <span className="text-destructive">*</span>
            </label>
            <Input
              id="experience"
              name="experience"
              type="number"
              min="0"
              max="60"
              step="1"
              defaultValue={profile?.experience ?? ""}
              placeholder="e.g. 5"
              className="bg-background/50 focus-visible:ring-primary/40"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="serviceArea" className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" /> Service Area <span className="text-destructive">*</span>
            </label>
            <Input
              id="serviceArea"
              name="serviceArea"
              type="text"
              defaultValue={profile?.serviceArea ?? ""}
              placeholder="e.g. Dhaka, Gulshan, Uttara"
              className="bg-background/50 focus-visible:ring-primary/40"
              required
            />
          </div>
        </div>

        {/* Action Button 2 */}
        <div className="flex justify-end pt-2 border-t border-border/30">
          <Button
            type="submit"
            disabled={isTechPending}
            className="gap-2 px-6 h-10 text-xs font-semibold shadow-sm"
          >
            {isTechPending ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                {isEditMode ? "Updating Details..." : "Creating Details..."}
              </>
            ) : isEditMode ? (
              <>
                <Save className="size-3.5" />
                Update Professional Details
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                Create Professional Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}