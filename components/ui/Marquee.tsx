type MarqueeProps = {
  children: React.ReactNode;
  label: string;
  className?: string;
};

/** Infinite horizontal loop. Content is rendered twice; pauses on hover; static under reduced motion. */
export function Marquee({ children, label, className = "" }: MarqueeProps) {
  return (
    <div className={`group mask-fade-x overflow-hidden ${className}`} role="region" aria-label={label}>
      <div className="flex w-max animate-marquee gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}
