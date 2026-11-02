"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

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
    <div className="mt-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-ink"
      >
        <Plus
          aria-hidden
          className={`size-4 transition-transform duration-300 ${open ? "rotate-45" : "group-hover:rotate-90"}`}
        />
        Under the hood
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-surface p-5 text-small">
              <p className="text-ink">
                <span className="text-muted">Stack: </span>
                {tech.join(" · ")}
              </p>
              {highlights.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-ink marker:text-muted">
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {links.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink underline decoration-muted underline-offset-4 hover:decoration-accent"
                    >
                      {l.label}
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
