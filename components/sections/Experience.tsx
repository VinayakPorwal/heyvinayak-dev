import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data";
import { isTodo } from "@/lib/links";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { UnderTheHood } from "@/components/ui/UnderTheHood";

/** Year shown on the timeline: the year a role ended, or the current year while it's ongoing. */
function YearLabel({ duration }: { duration: string }) {
  if (/present/i.test(duration)) return <CurrentYear />;
  return <>{duration.match(/\d{4}/g)?.at(-1) ?? ""}</>;
}

export function Experience() {
  return (
    <Section
      id="experience"
      kicker="Experience"
      title={
        <>
          Where I&apos;ve <span className="serif-accent">worked</span>
        </>
      }
      intro="In-house roles and freelance work, most recent first."
    >
      <ol className="relative">
        <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-border md:left-[135px]" />
        {experience.map((job, i) => (
          <li key={job.company + job.duration} className="relative grid gap-3 pb-6 md:grid-cols-[112px_1fr] md:gap-12">
            <div className="pl-8 md:pl-0">
              <p className="font-mono text-sm text-ink md:sticky md:top-28 md:pt-6 md:text-right">
                <YearLabel duration={job.duration} />
              </p>
            </div>
            <Reveal order={i} className="relative pl-8 md:pl-0">
              <span
                aria-hidden
                className="absolute left-[3px] top-7 size-[9px] rounded-full border-2 border-bg bg-accent ring-1 ring-border md:-left-[29px]"
              />
              <article className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-border-strong md:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 hover:text-accent-text"
                      >
                        {job.company}
                        <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      job.company
                    )}
                    <span className="font-normal text-muted"> · {job.role}</span>
                  </h3>
                  <p className="font-mono text-xs text-muted">{job.duration}</p>
                </div>
                <p className="mt-3 text-[0.9375rem] text-ink/90">{job.summary}</p>
                {!isTodo(job.impact) && (
                  <p className="mt-2 flex gap-2 text-[0.9375rem] text-muted">
                    <span aria-hidden className="text-accent-text">↗</span>
                    {job.impact}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <UnderTheHood tech={job.tech} />
                  <p className="text-xs text-muted">{job.location}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
