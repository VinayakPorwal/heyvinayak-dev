import { ArrowUpRight } from "lucide-react";
import { experience } from "@/data";
import { isTodo } from "@/lib/links";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { UnderTheHood } from "@/components/ui/UnderTheHood";

type Job = (typeof experience)[number];

const startYear = (duration: string) => duration.match(/\d{4}/)?.[0] ?? "";

/** Groups consecutive jobs by the year they started, keeping data order. */
function byYear(jobs: Job[]) {
  const groups: { year: string; jobs: Job[] }[] = [];
  for (const job of jobs) {
    const year = startYear(job.duration);
    const last = groups.at(-1);
    if (last?.year === year) last.jobs.push(job);
    else groups.push({ year, jobs: [job] });
  }
  return groups;
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
      <div className="relative">
        <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-border md:left-[135px]" />
        {byYear(experience).map((group) => (
          <div key={group.year + group.jobs[0].company} className="relative grid gap-4 pb-10 md:grid-cols-[112px_1fr] md:gap-12">
            <div className="pl-8 md:pl-0">
              <p className="font-mono text-sm text-muted md:sticky md:top-28 md:text-right">{group.year}</p>
            </div>
            <ol className="space-y-4">
              {group.jobs.map((job, i) => (
                <Reveal as="li" key={job.company + job.duration} order={i} className="relative pl-8 md:pl-0">
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
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  );
}
