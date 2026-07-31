
import { GsapWrapper } from "../../technician-dashboard/_components/gsap-wrapper";
import { Wrench } from "lucide-react";

export default async function AdminTechniciansPage() {


  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <GsapWrapper animation="fadeUp" delay={0}>
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10">
            <Wrench className="size-5 text-purple-500" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Technicians</h1>
            <p className="text-sm text-muted-foreground">Manage technician profiles</p>
          </div>
        </div>
      </GsapWrapper>

      <GsapWrapper animation="fadeUp" delay={0.1}>
        <div className="rounded-2xl border border-border/60 bg-card/60 p-8 text-center">
          <Wrench className="size-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="font-semibold text-foreground">Technicians Management</p>
          <p className="text-sm text-muted-foreground mt-1">Technician management features coming soon.</p>
        </div>
      </GsapWrapper>
    </div>
  );
}