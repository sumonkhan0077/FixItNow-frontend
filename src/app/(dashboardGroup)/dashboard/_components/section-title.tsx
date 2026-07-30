interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{children}</p>;
}