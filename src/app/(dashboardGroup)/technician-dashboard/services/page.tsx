import { Wrench } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
          <Wrench className="size-5 text-primary" />
        </div>
        <h1 className="text-xl font-bold text-foreground">My Services</h1>
      </div>
      <p className="text-muted-foreground text-sm">Services management coming soon.</p>
    </div>
  );
}
