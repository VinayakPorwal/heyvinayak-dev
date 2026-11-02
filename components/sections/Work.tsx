"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { work, type WorkItem } from "@/data";
import { isTodo } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UnderTheHood } from "@/components/ui/UnderTheHood";

const shotAlt = (w: WorkItem) => `Homepage of ${w.title}, ${w.type.toLowerCase()}`;

export function Work() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" className="frame py-28 md:py-44">
      <SectionHeading
        id="work-title"
        title="Client work"
        intro="Real sites for real businesses, live right now. Each one started with a problem the owner needed solved."
      />

      <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {work.map((w, i) => {
            const isActive = i === active;
            return (
              <article
                key={w.slug}
                id={`work-${w.slug}`}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                aria-labelledby={`work-${w.slug}-title`}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                className="scroll-mt-28 pb-24 last:pb-0 lg:min-h-[75vh]"
              >
                <Reveal order={0} className="mb-6 lg:hidden">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Image src={w.image} alt={shotAlt(w)} fill sizes="100vw" className="lit object-cover object-top" />
                  </div>
                </Reveal>
                <Reveal order={1}>
                  <p className="text-small text-muted">
                    {w.type} · {w.client}
                  </p>
                  <h3
                    id={`work-${w.slug}-title`}
                    className={`display mt-3 text-[clamp(2.5rem,1.4rem+3.6vw,4.75rem)] transition-colors duration-300 ${isActive ? "text-ink" : "lg:text-muted"}`}
                  >
                    {w.title}
                  </h3>
                </Reveal>
                <Reveal order={2}>
                  <dl className="mt-8 space-y-5">
                    <div>
                      <dt className="text-small text-muted">The problem</dt>
                      <dd className="mt-1">{w.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-small text-muted">What I built</dt>
                      <dd className="mt-1">{w.solution}</dd>
                    </div>
                    {!isTodo(w.result) && (
                      <div>
                        <dt className="text-small text-muted">The result</dt>
                        <dd className="mt-1">{w.result}</dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-8">
                    <ButtonLink href={w.link} external variant="secondary">
                      Visit live site
                    </ButtonLink>
                  </div>
                  <UnderTheHood tech={w.tech} highlights={w.highlights} />
                </Reveal>
              </article>
            );
          })}
        </div>

        <div className="hidden lg:col-span-7 lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              {work.map((w, i) => (
                <Image
                  key={w.slug}
                  src={w.image}
                  alt={i === active ? shotAlt(w) : ""}
                  aria-hidden={i !== active}
                  fill
                  sizes="58vw"
                  className={`lit object-cover object-top transition-[opacity,transform] duration-500 ${i === active ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"}`}
                />
              ))}
            </div>
            <p className="mt-4 text-small text-muted" aria-live="polite">
              <span className="text-ink">{work[active]?.title}</span> · live at{" "}
              {work[active] && new URL(work[active].link).host}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
