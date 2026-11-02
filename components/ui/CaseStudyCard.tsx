"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { WorkItem } from "@/data";
import { isTodo } from "@/lib/links";
import { Badge } from "./Badge";
import { BrowserFrame } from "./BrowserFrame";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { UnderTheHood } from "./UnderTheHood";

export function CaseStudyCard({ item, flip = false }: { item: WorkItem; flip?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const story = [
    { label: "Problem", text: item.problem },
    { label: "Solution", text: item.solution },
    ...(!isTodo(item.result) ? [{ label: "Result", text: item.result }] : []),
  ];

  return (
    <article
      ref={ref}
      id={`work-${item.slug}`}
      aria-labelledby={`work-${item.slug}-title`}
      className="grid scroll-mt-28 grid-cols-[minmax(0,1fr)] items-center gap-8 rounded-3xl border border-border bg-surface p-4 md:p-6 lg:grid-cols-12 lg:gap-12 lg:p-8"
    >
      <Reveal order={0} className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="group block" tabIndex={-1} aria-hidden>
          <BrowserFrame url={item.link}>
            <motion.div style={{ y: reduce ? 0 : y }} className="relative aspect-[16/10] scale-[1.08]">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`Homepage of ${item.title}`}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              ) : (
                <div className="grid size-full place-items-center bg-surface-2 text-muted">Preview coming soon</div>
              )}
            </motion.div>
          </BrowserFrame>
        </a>
      </Reveal>

      <div className={`px-2 pb-2 lg:col-span-5 lg:px-0 lg:pb-0 ${flip ? "lg:order-1" : ""}`}>
        <Reveal order={1}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge dot="accent">{item.type}</Badge>
          </div>
          <h3 id={`work-${item.slug}-title`} className="headline mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)]">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{item.client}</p>
        </Reveal>

        <Reveal order={2}>
          <dl className="mt-6 space-y-4">
            {story.map((s) => (
              <div key={s.label} className="border-l-2 border-border pl-4 transition-colors hover:border-accent">
                <dt className="text-xs font-medium uppercase tracking-wider text-muted">{s.label}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ink/90">{s.text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal order={3} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Button href={item.link} external variant="ghost" className="h-11">
            Visit live site
          </Button>
          <UnderTheHood tech={item.tech} highlights={item.highlights} />
        </Reveal>
      </div>
    </article>
  );
}
