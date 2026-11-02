"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { Pill } from "./Badge";

type UnderTheHoodProps = {
  tech: string[];
  highlights?: string[];
  links?: { label: string; href: string }[];
};

/** Collapsed technical details for developers. Clients never have to open it. */
export function UnderTheHood({ tech, highlights = [], links = [] }: UnderTheHoodProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-1.5 rounded-full py-1 font-mono text-xs text-muted transition-colors hover:text-ink"
      >
        <span aria-hidden className="text-accent-text">{"</>"}</span>
        Under the hood
        <ChevronDown aria-hidden className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border border-border bg-surface-2/60 p-4 font-mono text-xs">
              <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
                {tech.map((t) => (
                  <li key={t}>
                    <Pill>{t}</Pill>
                  </li>
                ))}
              </ul>
              {highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5 text-muted">
                  {highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span aria-hidden className="text-accent-text">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {links.length > 0 && (
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-text underline-offset-4 hover:underline"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
