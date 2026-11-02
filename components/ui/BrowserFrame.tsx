/** A minimal browser-window mockup around a screenshot or video. */
export function BrowserFrame({ url, children, className = "" }: { url: string; children: React.ReactNode; className?: string }) {
  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return url;
    }
  })();

  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-surface-2 ${className}`}>
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-ink/15" />
          <span className="size-2.5 rounded-full bg-ink/15" />
          <span className="size-2.5 rounded-full bg-ink/15" />
        </span>
        <span className="mx-auto truncate rounded-md bg-bg/60 px-3 py-0.5 font-mono text-xs text-muted">{host}</span>
        <span aria-hidden className="w-[42px]" />
      </div>
      <div className="relative overflow-hidden">{children}</div>
    </div>
  );
}
