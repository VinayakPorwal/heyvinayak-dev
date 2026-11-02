import { MapPin, Clock, Globe } from "lucide-react";
import Image from "next/image";
import { contacts, profile } from "@/data";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

export function About() {
  const facts = [
    { Icon: MapPin, label: profile.location },
    { Icon: Globe, label: "Works with clients worldwide" },
    { Icon: Clock, label: "Replies within 24 hours" },
  ];

  return (
    <Section
      id="about"
      kicker="About"
      title={
        <>
          The person <span className="serif-accent">behind</span> the code
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-6">
          <div className="group relative aspect-[16/11] overflow-hidden rounded-3xl border border-border bg-surface">
            <Image
              src="/vinayak-wide.jpg"
              alt={`${profile.name} sitting at a desk, arms crossed`}
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover object-[60%_40%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal order={1}>
            <p className="text-xl leading-relaxed tracking-tight text-ink md:text-2xl md:leading-snug">{profile.about}</p>
          </Reveal>
          <Reveal order={2}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {facts.map(({ Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted">
                  <Icon aria-hidden className="size-3.5 text-accent-text" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal order={3} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={profile.resumeLink} external variant="ghost">
              View my resume
            </Button>
            <Button href={contacts.instagram} external variant="link" className="px-2">
              {contacts.instagramHandle}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
