"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { bookCallHref, navLinks } from "@/lib/links";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Highlight the section currently in the middle of the viewport.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
      <nav
        aria-label="Main"
        className={`pointer-events-auto flex w-full items-center justify-between gap-4 rounded-full border border-border bg-bg/70 backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "max-w-3xl py-1.5 pl-5 pr-1.5" : "max-w-[1100px] py-2.5 pl-6 pr-2.5"
        }`}
      >
        <a href="#top" className="shrink-0 text-[0.9375rem] font-semibold tracking-tight">
          vinayak<span className="text-accent-text">.</span>
        </a>

        <ul className="hidden items-center gap-1 text-sm md:flex">
          {navLinks.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative z-10 block rounded-full px-3.5 py-1.5 transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {l.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={bookCallHref}
            className="hidden h-9 items-center rounded-full bg-accent px-4 text-sm font-medium text-accent-ink transition-[filter,transform] hover:brightness-105 active:scale-[0.98] sm:inline-flex"
          >
            Book a call
          </a>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full hover:bg-surface-2 md:hidden"
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
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute inset-x-3 top-[4.5rem] rounded-3xl border border-border bg-bg/95 p-3 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-lg hover:bg-surface-2">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={bookCallHref}
              onClick={() => setOpen(false)}
              className="mt-2 flex h-12 items-center justify-center rounded-full bg-accent font-medium text-accent-ink"
            >
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
