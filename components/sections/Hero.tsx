"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { profile, sections, work } from "@/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay: 0.05 + i * 0.07 },
});

function Headline() {
  const { headline, headlineAccent } = profile;
  const at = headlineAccent ? headline.lastIndexOf(headlineAccent) : -1;
  if (at < 0) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, at)}
      <span className="serif-accent pr-[0.06em] text-accent-text">{headlineAccent}</span>
      {headline.slice(at + headlineAccent.length)}
    </>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });
  const featured = work.find((w) => w.image);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          {profile.available && (
            <motion.div {...rise(0)}>
              <Badge dot="live">Available for new projects</Badge>
            </motion.div>
          )}

          <motion.h1 {...rise(1)} id="hero-title" className="headline mt-7 text-hero">
            <Headline />
          </motion.h1>

          <motion.p {...rise(2)} className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted">
            <span className="text-ink">
              {profile.greeting} {profile.name.split(" ")[0]}.
            </span>{" "}
            {profile.subheadline}
          </motion.p>

          <motion.div {...rise(3)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#contact" icon={<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}>
              Start a project
            </Button>
            <Button href={sections.work ? "#work" : "#services"} variant="ghost">
              See my work
            </Button>
          </motion.div>

          <motion.div {...rise(4)} className="mt-12">
            <p className="text-sm text-muted">{profile.trustLine.split("·")[0].trim()}</p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              {work.map((w) => (
                <li key={w.slug}>
                  <a
                    href={sections.work ? `#work-${w.slug}` : w.link}
                    className="text-[0.9375rem] font-semibold tracking-tight text-ink/70 transition-colors hover:text-ink"
                  >
                    {w.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          {...rise(2)}
          className="relative mx-auto w-full max-w-[400px] [perspective:1000px] lg:col-span-4 lg:max-w-none"
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse") return;
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 360px, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </div>

            {featured && (
              <motion.a
                href={sections.work ? `#work-${featured.slug}` : featured.link}
                initial={{ opacity: 0, y: 20 }}
                animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
                transition={
                  reduce
                    ? { duration: 0.4 }
                    : { opacity: { duration: 0.6, delay: 0.6 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 } }
                }
                style={{ translateZ: 40 }}
                className="absolute -bottom-8 -left-4 w-[70%] overflow-hidden rounded-2xl border border-border-strong bg-surface/90 p-2 backdrop-blur-md transition-colors hover:border-accent sm:-left-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image src={featured.image} alt="" fill sizes="260px" className="object-cover object-top" />
                </div>
                <p className="flex items-center justify-between gap-2 px-1.5 pb-1 pt-2.5 text-xs">
                  <span className="font-medium text-ink">{featured.title}</span>
                  <span className="text-muted">Recent project ↗</span>
                </p>
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
