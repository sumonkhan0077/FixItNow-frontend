"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { gsap } from "gsap";
import { UserProfile, UpdateProfilePayload } from "@/lib/types";
import { updateTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, X, Plus } from "lucide-react";

interface EditProfileFormProps {
  user: UserProfile;
}

export function EditProfileForm({ user }: EditProfileFormProps) {
  const tp = user.technicianProfile;
  const formRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(tp?.skills ?? []);

  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(
      formRef.current.querySelectorAll(".form-field"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }
    );
  }, []);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => setSkills(skills.filter((s) => s !== skill));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const payload: UpdateProfilePayload = {
      name:         fd.get("name")?.toString()         || undefined,
      phone:        fd.get("phone")?.toString()        || undefined,
      address:      fd.get("address")?.toString()      || undefined,
      bio:          fd.get("bio")?.toString()          || undefined,
      serviceArea:  fd.get("serviceArea")?.toString()  || undefined,
      experience:   fd.get("experience") ? Number(fd.get("experience")) : undefined,
      hourlyRate:   fd.get("hourlyRate")  ? Number(fd.get("hourlyRate"))  : undefined,
      availability: (fd.get("availability")?.toString() as UpdateProfilePayload["availability"]) || undefined,
      skills,
    };

    startTransition(async () => {
      const res = await updateTechnicianProfile(payload);
      if (res.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.message || "Update failed.");
      }
    });
  };

  return (
    <div ref={formRef}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-5">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Personal Information</h2>

          <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" name="name" defaultValue={user.name} placeholder="Your full name" />
            <Field label="Phone" name="phone" defaultValue={user.phone} placeholder="+1 234 567 8900" />
          </div>
          <div className="form-field">
            <Field label="Address" name="address" defaultValue={user.address} placeholder="Your address" />
          </div>
        </div>

        {/* Technician Info */}
        <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 space-y-5">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Technician Details</h2>

          <div className="form-field">
            <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
            <Textarea
              name="bio"
              defaultValue={tp?.bio}
              placeholder="Tell clients about yourself and your expertise..."
              className="min-h-[100px] resize-none bg-background/50"
            />
          </div>

          <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Service Area" name="serviceArea" defaultValue={tp?.serviceArea} placeholder="e.g. New York, NY" />
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Availability</label>
              <select
                name="availability"
                defaultValue={tp?.availability ?? ""}
                className="w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Select status</option>
                <option value="AVAILABLE">Available</option>
                <option value="BUSY">Busy</option>
                <option value="OFFLINE">Offline</option>
              </select>
            </div>
          </div>

          <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Experience (years)" name="experience" type="number" defaultValue={tp?.experience?.toString()} placeholder="e.g. 5" min="0" />
            <Field label="Hourly Rate ($)" name="hourlyRate" type="number" defaultValue={tp?.hourlyRate?.toString()} placeholder="e.g. 50" min="0" />
          </div>

          {/* Skills */}
          <div className="form-field">
            <label className="block text-sm font-medium text-foreground mb-1.5">Skills</label>
            <div className="flex gap-2 mb-3">
              <Input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill (e.g. Plumbing)"
                className="bg-background/50"
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
              />
              <Button type="button" variant="outline" size="icon" onClick={addSkill} className="shrink-0">
                <Plus className="size-4" />
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-field flex justify-end">
          <Button type="submit" disabled={isPending} className="gap-2 px-6">
            <Save className="size-4" />
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// Small reusable field
function Field({
  label, name, defaultValue, placeholder, type = "text", min,
}: {
  label: string; name: string; defaultValue?: string;
  placeholder?: string; type?: string; min?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        className="bg-background/50"
      />
    </div>
  );
}
