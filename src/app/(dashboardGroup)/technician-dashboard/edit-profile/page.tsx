import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { EditProfileForm } from "../_components/edit-profile-form";
import { GsapWrapper } from "../_components/gsap-wrapper";
import { PenLine, Plus } from "lucide-react";

export default async function EditProfilePage() {
  const res = await getMyTechnicianProfile();
  const profile = res?.success && res.data ? res.data : null;
  const isEditMode = profile !== null;

  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6 lg:p-8 space-y-8">
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-4">
          <div className={`flex size-12 items-center justify-center rounded-2xl shadow-sm ${isEditMode ? "bg-primary/10" : "bg-emerald-500/10"}`}>
            {isEditMode
              ? <PenLine className="size-5 text-primary" />
              : <Plus className="size-5 text-emerald-600 dark:text-emerald-400" />
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{isEditMode ? "Edit Profile" : "Create Profile"}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isEditMode ? "Update your technician information below." : "Fill in the details to get started."}
            </p>
          </div>
        </div>
      </GsapWrapper>

      <GsapWrapper animation="fadeIn" delay={0.15}>
        <div className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border ${isEditMode ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"}`}>
          <span className={`size-1.5 rounded-full ${isEditMode ? "bg-blue-500" : "bg-emerald-500"}`} />
          {isEditMode ? "Editing existing profile" : "Creating new profile"}
        </div>
      </GsapWrapper>

      <EditProfileForm profile={profile} />
    </div>
  );
}
