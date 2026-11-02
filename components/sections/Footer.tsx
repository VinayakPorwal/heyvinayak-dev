"use client";

import { useSyncExternalStore } from "react";
import { contacts, profile } from "@/data";
import { navLinks, socials } from "@/lib/links";

// Ticks every 30s; the server renders nothing so the page stays prerendered.
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 30_000);
  return () => clearInterval(t);
};
const timeFmt = new Intl.DateTimeFormat("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: profile.timezone,
});
const getTime = () => timeFmt.format(new Date());

export function Footer() {
  const time = useSyncExternalStore(subscribe, getTime, () => null);
  const year = useSyncExternalStore(subscribe, () => new Date().getFullYear(), () => null);

  return (
    <footer className="relative overflow-hidden border-t border-border pt-16">
      <div className="container-x">
        <div className="flex flex-wrap justify-between gap-10">
          <div>
            <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
            <p className="mt-1 text-sm text-muted">{profile.role}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
              <span aria-hidden className="size-1.5 animate-pulse-dot rounded-full bg-green-500" />
              {time ? `${time} IST` : "IST"} · {profile.location}
            </p>
          </div>
          <nav aria-label="Footer" className="flex gap-16 text-sm">
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-muted transition-colors hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${contacts.email}`} className="text-muted transition-colors hover:text-ink">
                  Email
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 flex flex-wrap justify-between gap-2 text-xs text-muted">
          <span>
            © {year ? `${year} ` : ""}
            {profile.name}
          </span>
          <span>Built with Next.js</span>
        </p>
      </div>

      <p
        aria-hidden
        className="headline pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[12.5vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_var(--border-strong)]"
        style={{ backgroundImage: "linear-gradient(to bottom, var(--surface-2), transparent 85%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}
      >
        vinayak porwal
      </p>
    </footer>
  );
}
