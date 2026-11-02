type BadgeProps = {
  children: React.ReactNode;
  dot?: "live" | "accent";
  className?: string;
};

export function Badge({ children, dot, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-sm text-muted ${className}`}
    >
      {dot === "live" && <span aria-hidden className="size-2 animate-pulse-dot rounded-full bg-green-500" />}
      {dot === "accent" && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}

/** Small rounded label for tech names, set in mono. */
export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
      {children}
    </span>
  );
}
