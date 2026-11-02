import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  title: React.ReactNode;
  kicker?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
};

/** Standard section: consistent padding, container and heading block. */
export function Section({ id, title, kicker, intro, children, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-16 md:py-24 ${className}`}>
      <div className="container-x">
        <div className="max-w-2xl">
          {kicker && (
            <Reveal>
              <p className="mb-4 text-sm font-medium text-accent-text">{kicker}</p>
            </Reveal>
          )}
          <Reveal order={1}>
            <h2 id={`${id}-title`} className="headline text-h2">
              {title}
            </h2>
          </Reveal>
          {intro && (
            <Reveal order={2}>
              <p className="mt-5 text-lg text-muted">{intro}</p>
            </Reveal>
          )}
        </div>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
