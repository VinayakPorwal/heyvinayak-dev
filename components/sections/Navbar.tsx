"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { bookCallHref, navLinks } from "@/lib/links";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bg">
      <nav aria-label="Main" className="frame flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#top" className="text-body font-medium tracking-tight">
          vinayak porwal
        </a>

        <ul className="hidden items-center gap-8 text-small md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-ink/80 transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={bookCallHref}
            className="hidden h-10 items-center bg-accent px-5 text-small font-medium text-accent-ink transition-[filter,transform] hover:brightness-110 active:scale-[0.98] sm:inline-flex"
          >
            Book a call
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center hover:bg-surface-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full bg-bg pb-8 shadow-2xl md:hidden" // taste-skill-ignore: real overlay menu
          >
            <ul className="frame flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-lead">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-4">
                <a
                  href={bookCallHref}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center bg-accent px-6 text-small font-medium text-accent-ink"
                >
                  Book a call
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
