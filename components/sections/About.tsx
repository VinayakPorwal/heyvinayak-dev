import Image from "next/image";
import { contacts, profile } from "@/data";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const facts = [
    { label: "Based in", value: profile.location },
    { label: "Works with", value: "Clients worldwide, remotely" },
    { label: "Reply time", value: "Within 24 hours" },
  ];
  const [first, ...rest] = profile.about.split(". ");
  const restText = rest.join(". ");

  return (
    <section id="about" aria-labelledby="about-title" className="frame py-28 md:py-44">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <Reveal>
            <h2 id="about-title" className="text-lead font-medium tracking-tight">
              About me
            </h2>
          </Reveal>
          <Reveal order={1}>
            <dl className="mt-8 hidden space-y-5 text-small lg:block">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-muted">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="lg:col-span-9">
          <Reveal order={1}>
            <p className="text-[clamp(1.375rem,0.9rem+1.5vw,2.25rem)] leading-[1.25] tracking-tight">
              <span className="float-left mr-[0.5em] mt-[0.2em] block size-[2.5em] overflow-hidden bg-surface-2">
                {profile.photo ? (
                  <Image src={profile.photo} alt={`Portrait of ${profile.name}`} width={240} height={240} className="size-full object-cover" />
                ) : (
                  // TODO: replace with a real photo (set profile.photo in data.ts)
                  <span className="grid size-full place-items-center text-[0.9em] font-medium text-muted" role="img" aria-label={`Photo of ${profile.name} coming soon`}>
                    VP
                  </span>
                )}
              </span>
              {first}.
            </p>
            <p className="clear-both pt-8 max-w-[60ch] text-lead leading-snug text-muted">{restText}</p>
          </Reveal>

          <Reveal order={2}>
            <dl className="mt-10 grid grid-cols-3 gap-4 text-small lg:hidden">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-muted">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-12 flex flex-wrap gap-3">
              <ButtonLink href={profile.resumeLink} external variant="secondary">
                View my resume
              </ButtonLink>
              <ButtonLink href={`mailto:${contacts.email}`} variant="text" className="h-12 px-2">
                {contacts.email}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
