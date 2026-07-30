"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { TechnicianProfileData } from "@/lib/types";
import {
  createTechnicianProfile,
  updateTechnicianProfile,
} from "@/service/technician/getTechnicianProfile";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Plus, MapPin, Clock, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditProfileFormProps {
  /** Pass existing profile to enter edit mode; pass null to enter create mode */
  profile: TechnicianProfileData | null;
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const isEditMode = profile !== null;
  const formRef = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // GSAP stagger entrance
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".form-row"),
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const bio        = fd.get("bio")?.toString().trim()        ?? "";
    const serviceArea= fd.get("serviceArea")?.toString().trim() ?? "";
    const expRaw     = fd.get("experience")?.toString().trim()  ?? "";
    const experience = expRaw ? Number(expRaw) : undefined;

    // Basic validation
    if (!bio) { toast.error("Bio is required."); return; }
    if (!serviceArea) { toast.error("Service area is required."); return; }
    if (experience === undefined || isNaN(experience) || experience < 0) {
      toast.error("Please enter a valid experience value.");
      return;
    }

    setIsPending(true);
    try {
      const result = isEditMode
        ? await updateTechnicianProfile({ bio, serviceArea, experience })
        : await createTechnicianProfile({ bio, serviceArea, experience });

      if (result.success) {
        toast.success(isEditMode ? "Profile updated successfully!" : "Profile created successfully!");
        router.push("/technician-dashboard/profile");
        router.refresh();
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Bio */}
        <div className="form-row rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="size-4 text-primary" />
            Bio
            <span className="text-destructive">*</span>
          </label>
          <Textarea
            name="bio"
            defaultValue={profile?.bio ?? ""}
            placeholder="Tell clients about yourself and your expertise..."
            className="min-h-[120px] resize-none bg-background/50 focus-visible:ring-primary/40"
            required
          />
          <p className="text-xs text-muted-foreground">
            Describe your skills, experience, and what makes you a great technician.
          </p>
        </div>

        {/* Experience */}
        <div className="form-row rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground" htmlFor="experience">
            <Clock className="size-4 text-primary" />
            Experience (years)
            <span className="text-destructive">*</span>
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
            className="bg-background/50 focus-visible:ring-primary/40 max-w-xs"
            required
          />
          <p className="text-xs text-muted-foreground">
            Total years of professional experience in your field.
          </p>
        </div>

        {/* Service Area */}
        <div className="form-row rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-foreground" htmlFor="serviceArea">
            <MapPin className="size-4 text-primary" />
            Service Area
            <span className="text-destructive">*</span>
          </label>
          <Input
            id="serviceArea"
            name="serviceArea"
            type="text"
            defaultValue={profile?.serviceArea ?? ""}
            placeholder="e.g. Dhaka, Chittagong"
            className="bg-background/50 focus-visible:ring-primary/40"
            required
          />
          <p className="text-xs text-muted-foreground">
            The city or area where you provide your services.
          </p>
        </div>

        {/* Submit */}
        <div className="form-row flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isPending}
            className="gap-2 px-8 h-11 text-sm font-semibold"
          >
            {isPending ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : isEditMode ? (
              <>
                <Save className="size-4" />
                Update Profile
              </>
            ) : (
              <>
                <Plus className="size-4" />
                Create Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
