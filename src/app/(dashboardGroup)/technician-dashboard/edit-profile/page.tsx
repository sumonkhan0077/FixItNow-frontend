import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { EditProfileForm } from "../_components/edit-profile-form";
import { GsapWrapper } from "../_components/gsap-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { PenLine, Plus } from "lucide-react";

async function EditProfileContent() {
  const res = await getMyTechnicianProfile();

  // profile is null → create mode; profile exists → edit mode
  const profile = res?.success && res.data ? res.data : null;
  const isEditMode = profile !== null;

  return (
    <div className="space-y-8">
      {/* Page heading — changes based on mode */}
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-4">
          <div className={`flex size-12 items-center justify-center rounded-2xl shadow-sm ${
            isEditMode ? "bg-primary/10" : "bg-emerald-500/10"
          }`}>
            {isEditMode
              ? <PenLine className="size-5 text-primary" />
              : <Plus className="size-5 text-emerald-600 dark:text-emerald-400" />
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditMode ? "Edit Profile" : "Create Profile"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {isEditMode
                ? "Update your technician information below."
                : "You don't have a profile yet. Fill in the details to get started."}
            </p>
          </div>
        </div>
      </GsapWrapper>

      {/* Mode indicator badge */}
      <GsapWrapper animation="fadeIn" delay={0.15}>
        <div className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold border ${
          isEditMode
            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
        }`}>
          <span className={`size-1.5 rounded-full ${isEditMode ? "bg-blue-500" : "bg-emerald-500"}`} />
          {isEditMode ? "Editing existing profile" : "Creating new profile"}
        </div>
      </GsapWrapper>

      {/* Form */}
      <EditProfileForm profile={profile} />
    </div>
  );
}

function EditProfileSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-40 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-6 w-48 rounded-xl" />
      <Skeleton className="h-44 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-28 rounded-2xl" />
      <div className="flex justify-end">
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <div className="mx-auto max-w-2xl p-4 md:p-6 lg:p-8">
      <Suspense fallback={<EditProfileSkeleton />}>
        <EditProfileContent />
      </Suspense>
    </div>
  );
}
