import { testimonials } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Renders nothing until `testimonials` in data.ts has at least one entry. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="frame py-28 md:py-44">
      <SectionHeading id="testimonials-title" title="What clients say" />
      <ul className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-8">
        {testimonials.map((t, i) => (
          <Reveal as="li" order={i} key={t.name}>
            <figure>
              <blockquote className="text-lead leading-snug tracking-tight">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-small">
                <span className="text-ink">{t.name}</span>
                <span className="text-muted"> · {t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
