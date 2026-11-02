"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { process } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const fill = reduce ? 1 : progress;

  return (
    <Section
      id="process"
      kicker="Process"
      title={
        <>
          How we&apos;ll work <span className="serif-accent">together</span>
        </>
      }
      intro="Four simple steps from first call to a live site. You always know what's happening and what comes next."
    >
      <ol ref={ref} className="relative grid gap-10 md:grid-cols-4 md:gap-6">
        {/* Connecting line: vertical on mobile, horizontal on desktop */}
        <span aria-hidden className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-border md:right-5 md:h-px md:w-auto" />
        <motion.span
          aria-hidden
          style={{ scaleY: fill }}
          className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px origin-top bg-accent md:hidden"
        />
        <motion.span
          aria-hidden
          style={{ scaleX: fill }}
          className="absolute left-5 right-5 top-5 hidden h-px origin-left bg-accent md:block"
        />

        {process.map((step, i) => (
          <Reveal as="li" key={step.title} order={i} className="relative flex gap-5 md:flex-col md:gap-6">
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-border-strong bg-bg font-mono text-sm text-accent-text">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
