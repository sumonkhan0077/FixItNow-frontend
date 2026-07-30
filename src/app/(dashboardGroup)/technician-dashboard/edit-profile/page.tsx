import { getMyTechnicianProfile } from "@/service/technician/getTechnicianProfile";
import { EditProfileForm } from "../_components/edit-profile-form";
import { GsapWrapper } from "../_components/gsap-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UserCircle } from "lucide-react";

async function EditProfileContent() {
  const res = await getMyTechnicianProfile();
  const user = res?.data ?? null;

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Could not load profile. Please try again.</p>
      </div>
    );
  }

  return (
    <GsapWrapper animation="fadeUp" delay={0}>
      <EditProfileForm user={user} />
    </GsapWrapper>
  );
}

export default function EditProfilePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <UserCircle className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Edit Profile</h1>
          <p className="text-sm text-muted-foreground">Update your technician information</p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="space-y-6">
            <Skeleton className="h-52 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
          </div>
        }
      >
        <EditProfileContent />
      </Suspense>
    </div>
  );
}
