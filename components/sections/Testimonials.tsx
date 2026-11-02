import { testimonials } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/** Renders nothing until `testimonials` in data.ts has at least one entry. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section
      id="testimonials"
      kicker="Testimonials"
      title={
        <>
          What clients <span className="serif-accent">say</span>
        </>
      }
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name} order={i}>
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8">
              <span aria-hidden className="serif-accent text-6xl leading-none text-accent-text">
                “
              </span>
              <blockquote className="mt-2 text-xl leading-snug tracking-tight md:text-2xl">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 text-sm">
                <span aria-hidden className="grid size-10 place-items-center rounded-full bg-surface-2 font-medium">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  <span className="block font-medium text-ink">{t.name}</span>
                  <span className="text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
