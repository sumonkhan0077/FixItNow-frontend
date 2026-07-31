import { getMe } from "@/service/getMe";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { Tag } from "lucide-react";

export default async function AdminCategoriesPage() {
  const res = await getMe();
  const user = res?.data?.profile || null;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-yellow-500/10">
            <Tag className="size-5 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Categories</h1>
            <p className="text-sm text-muted-foreground">Manage service categories</p>
          </div>
        </div>
      </GsapWrapper>

      <GsapWrapper animation="fadeUp" delay={0.1}>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-8 text-center">
          <Tag className="size-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-semibold text-foreground">Categories Management</p>
          <p className="text-sm text-muted-foreground mt-1">Category management features coming soon.</p>
        </div>
      </GsapWrapper>
    </div>
  );
}