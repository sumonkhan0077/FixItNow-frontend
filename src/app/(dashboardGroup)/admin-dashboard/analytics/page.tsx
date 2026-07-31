import { getMe } from "@/service/getMe";
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { BarChart3 } from "lucide-react";

export default async function AdminAnalyticsPage() {
  const res = await getMe();
  const user = res?.data?.profile || null;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10">
            <BarChart3 className="size-5 text-rose-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">Platform insights and statistics</p>
          </div>
        </div>
      </GsapWrapper>

      <GsapWrapper animation="fadeUp" delay={0.1}>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-8 text-center">
          <BarChart3 className="size-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-semibold text-foreground">Analytics Dashboard</p>
          <p className="text-sm text-muted-foreground mt-1">Analytics features coming soon.</p>
        </div>
      </GsapWrapper>
    </div>
  );
}