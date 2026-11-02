import Image from "next/image";
import { projects } from "@/data";
import { isTodo } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UnderTheHood } from "@/components/ui/UnderTheHood";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="frame py-28 md:py-44">
      <SectionHeading
        id="projects-title"
        title="Side projects"
        intro="Things I built on my own time to learn and to try ideas."
      />
      <ul className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-2">
        {projects.map((p, i) => {
          const links = [
            ...(p.code && !isTodo(p.code) ? [{ label: "Source code", href: p.code }] : []),
          ];
          return (
            <Reveal as="li" order={i % 2} key={p.slug} className={i % 2 ? "md:mt-24" : ""}>
              {p.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image src={p.image} alt={`Screenshot of ${p.title}`} fill sizes="(min-width: 768px) 45vw, 100vw" className="lit object-cover object-top" />
                </div>
              )}
              <h3 className="mt-6 text-lead font-medium tracking-tight">{p.title}</h3>
              <p className="mt-2 max-w-[52ch] text-muted">{p.description}</p>
              {p.link && (
                <div className="mt-6">
                  <ButtonLink href={p.link} external variant="secondary">
                    Try it live
                  </ButtonLink>
                </div>
              )}
              <UnderTheHood tech={p.tech} links={links} />
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
