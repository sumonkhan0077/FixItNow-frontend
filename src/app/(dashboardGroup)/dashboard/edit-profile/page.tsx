import { getMe } from "@/service/getMe";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { EditProfileForm } from "../_components/edit-profile-form";
import { AlertCircle, PenLine } from "lucide-react";

export default async function CustomerEditProfilePage() {
  const res     = await getMe();
  const profile = res?.data?.profile ?? null;

  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <AlertCircle className="size-10 text-muted-foreground/40" />
        <p className="text-lg font-semibold">Profile not found</p>
        <p className="text-sm text-muted-foreground">Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl p-4 md:p-6 lg:p-8 space-y-8">
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
            <PenLine className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Update your account information.</p>
          </div>
        </div>
      </GsapWrapper>

      <GsapWrapper animation="fadeUp" delay={0.1}>
        <EditProfileForm profile={profile} />
      </GsapWrapper>
    </div>
  );
}
