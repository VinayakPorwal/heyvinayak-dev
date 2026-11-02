import Image from "next/image";
import { projects } from "@/data";
import { isTodo } from "@/lib/links";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { UnderTheHood } from "@/components/ui/UnderTheHood";

export function Projects() {
  return (
    <Section id="projects" kicker="Side projects" title="Things I built for fun" intro="Experiments and tools I made on my own time.">
      <ul className="grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => {
          const links = p.code && !isTodo(p.code) ? [{ label: "Source code", href: p.code }] : [];
          return (
            <Reveal as="li" key={p.slug} order={i % 2}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-4">
                {p.image && (
                  <BrowserFrame url={p.link || p.code}>
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={p.image}
                        alt={`Screenshot of ${p.title}`}
                        fill
                        sizes="(min-width: 768px) 520px, 100vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </BrowserFrame>
                )}
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[0.9375rem] text-muted">{p.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    {p.link && (
                      <Button href={p.link} external variant="ghost" className="h-10">
                        Try it live
                      </Button>
                    )}
                    <UnderTheHood tech={p.tech} links={links} />
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
