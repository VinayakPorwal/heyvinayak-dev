"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile, sections, work } from "@/data";
import { ButtonLink } from "@/components/ui/Button";

const fade = (order: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 + order * 0.08 },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const exhibitY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const exhibits = work.filter((w) => w.image);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || exhibits.length < 2) return;
    const t = setInterval(() => setActive((i) => (i + 1) % exhibits.length), 4500);
    return () => clearInterval(t);
  }, [reduce, exhibits.length]);

  const current = exhibits[active];

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-8 pt-10 md:pt-16">
      <div className="frame">
        <motion.h1
          {...fade(0)}
          id="hero-title"
          style={{ scale: reduce ? 1 : titleScale }}
          className="display max-w-[24ch] origin-left text-[clamp(2.25rem,1.2rem+4.4vw,5.25rem)]"
        >
          {profile.headline}
        </motion.h1>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <motion.p {...fade(1)} className="max-w-[40ch] text-lead leading-snug text-muted">
              <span className="text-ink">
                {profile.greeting} {profile.name.split(" ")[0]}, a {profile.role.toLowerCase()}.
              </span>{" "}
              {profile.subheadline}
            </motion.p>
            <motion.div {...fade(2)} className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="#contact">Start a project</ButtonLink>
              <ButtonLink href={sections.work ? "#work" : "#services"} variant="secondary">
                See my work
              </ButtonLink>
            </motion.div>
            <motion.p {...fade(3)} className="mt-8 text-small text-muted">
              {profile.trustLine}
            </motion.p>
          </div>

          {current && (
            <motion.figure {...fade(2)} style={{ y: reduce ? 0 : exhibitY }} className="lg:col-span-7">
              <a href={sections.work ? `#work-${current.slug}` : current.link} className="group block">
                <span className="sr-only">See the {current.title} case study</span>
                <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={current.slug}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image}
                        alt={`Homepage of ${current.title}, a ${current.type.toLowerCase()} I built`}
                        fill
                        priority={active === 0}
                        sizes="(min-width: 1024px) 56vw, 100vw"
                        className="lit object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </a>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-small">
                <span>
                  <span className="text-ink">{current.title}</span>
                  <span className="text-muted"> · {current.type}, live</span>
                </span>
                <span className="flex gap-1">
                  {exhibits.map((w, i) => (
                    <button
                      key={w.slug}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Preview ${w.title}`}
                      aria-pressed={i === active}
                      className="grid h-8 w-8 place-items-center"
                    >
                      <span
                        className={`block h-1 w-5 transition-colors ${i === active ? "bg-accent" : "bg-surface-2 hover:bg-muted"}`}
                      />
                    </button>
                  ))}
                </span>
              </figcaption>
            </motion.figure>
          )}
        </div>
      </div>
    </section>
  );
}
