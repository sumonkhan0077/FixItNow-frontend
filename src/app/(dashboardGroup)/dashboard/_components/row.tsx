import type { ReactElement } from "react";

interface RowProps {
  icon: ReactElement;
  label: string;
  value: React.ReactNode;
  valueClass?: string;
  mono?: boolean;
}

export function Row({ icon: Icon, label, value, valueClass, mono }: RowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
        {Icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
        <p className={`text-sm font-semibold text-foreground break-all ${mono ? "font-mono text-xs" : ""} ${valueClass ?? ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}