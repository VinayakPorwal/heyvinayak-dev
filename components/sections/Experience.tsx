import { experience } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UnderTheHood } from "@/components/ui/UnderTheHood";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="frame py-28 md:py-44">
      <SectionHeading
        id="experience-title"
        title="Where I've worked"
        intro="Before freelancing full time, I built products inside teams. Here is what those businesses got."
      />

      <ol className="mt-16 lg:mt-24">
        {experience.map((job, i) => (
          <Reveal as="li" order={i} key={job.company} className="py-8 first:pt-0 md:py-10">
            <div className="grid gap-x-8 gap-y-1 text-[clamp(1.375rem,0.9rem+1.4vw,2rem)] leading-tight tracking-tight md:grid-cols-12">
              <h3 className="font-medium md:col-span-5">{job.company}</h3>
              <p className="text-muted md:col-span-3">{job.role}</p>
              <p className="text-muted tabular-nums md:col-span-4 md:text-right">{job.duration}</p>
            </div>
            <div className="mt-4 grid gap-x-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <p>{job.summary}</p>
                <p className="mt-2">
                  <span className="text-accent dark:text-[#ff5a6b]">→</span> {job.impact}
                </p>
                <UnderTheHood tech={job.tech} />
              </div>
              <p className="mt-2 text-small text-muted md:col-span-5 md:mt-0 md:text-right">{job.location}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
