"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import { contacts, photoCredits, profile } from "@/data";
import { navLinks, socials } from "@/lib/links";

const noop = () => () => {};

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  // Year is read on the client only, so the page can stay fully prerendered.
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);

  return (
    <footer ref={ref} className="relative isolate flex min-h-[88svh] flex-col overflow-hidden text-[#f2f2f2] md:min-h-[100svh]">
      <motion.div style={{ scale: reduce ? 1 : photoScale }} className="absolute inset-0 -z-10">
        <Image
          src="/photos/arch-1033-2400x1350.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover brightness-[0.55]"
        />
      </motion.div>

      <div className="frame flex flex-wrap justify-between gap-10 pt-10 text-body md:pt-14">
        <nav aria-label="Footer">
          <ul className="space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:underline hover:underline-offset-4">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1 md:text-right">
          <p>
            <a href={`mailto:${contacts.email}`} className="hover:underline hover:underline-offset-4">
              {contacts.email}
            </a>
          </p>
          {socials.map((s) => (
            <p key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:underline hover:underline-offset-4">
                {s.label}
              </a>
            </p>
          ))}
        </div>
      </div>

      <div className="frame mt-auto pb-8">
        <motion.p
          aria-hidden
          style={{ scale: reduce ? 1 : scale }}
          className="display origin-bottom-left whitespace-nowrap text-mark leading-[0.82] tracking-[-0.05em]"
        >
          vinayak porwal
        </motion.p>
        <p className="mt-6 flex flex-wrap justify-between gap-x-6 gap-y-1 text-small text-[#d4d4d4]">
          <span>
            © {year ? `${year} ` : ""}{profile.name} · Built with Next.js
          </span>
          <span>Photos: {photoCredits.join(", ")} (Unsplash)</span>
        </p>
      </div>
    </footer>
  );
}
