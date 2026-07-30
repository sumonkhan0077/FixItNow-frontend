"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateMe } from "@/service/user/updateMe";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, User, Phone, MapPin, ImageIcon } from "lucide-react";
import { UserProfile } from "@/lib/types";

interface EditProfileFormProps {
  profile: UserProfile;
}

export function EditProfileForm({ profile }: EditProfileFormProps) {
  const router     = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [form, setForm] = useState({
    name:         profile.name         ?? "",
    phone:        profile.phone        ?? "",
    address:      profile.address      ?? "",
    profileImage: profile.profileImage ?? "",
  });

  const initials = form.name ? form.name.slice(0, 2).toUpperCase() : "ME";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setIsPending(true);
    try {
      const result = await updateMe({
        name:         form.name.trim(),
        phone:        form.phone.trim()        || undefined,
        address:      form.address.trim()      || undefined,
        profileImage: form.profileImage.trim() || undefined,
      });

      if (result.success) {
        toast.success("Profile updated successfully!");
        router.push("/dashboard/profile");
        router.refresh();
      } else {
        toast.error(result.message || "Update failed.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">

      {/* Avatar preview */}
      <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 space-y-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ImageIcon className="size-4 text-primary" />
          Profile Image
        </label>

        {/* Live preview */}
        <div className="flex items-center gap-4">
          <Avatar className="size-16 shrink-0 border-2 border-border/60">
            <AvatarImage src={form.profileImage || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <Input
              value={form.profileImage}
              onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
              placeholder="Paste image URL (e.g. https://...)"
              className="bg-background/50 focus-visible:ring-primary/40"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Paste a direct image link. Preview updates instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <User className="size-4 text-primary" />
          Full Name <span className="text-destructive">*</span>
        </label>
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your full name"
          className="bg-background/50 focus-visible:ring-primary/40"
          required
        />
      </div>

      {/* Phone */}
      <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Phone className="size-4 text-primary" />
          Phone
        </label>
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="e.g. +880 1700 000000"
          className="bg-background/50 focus-visible:ring-primary/40"
        />
      </div>

      {/* Address */}
      <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 space-y-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <MapPin className="size-4 text-primary" />
          Address
        </label>
        <Input
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Your address"
          className="bg-background/50 focus-visible:ring-primary/40"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-1">
        <Button type="submit" disabled={isPending} className="gap-2 px-8 h-11 font-semibold">
          {isPending ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
