import { Reveal } from "./Reveal";

export function SectionHeading({ id, title, intro }: { id: string; title: string; intro?: string }) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <h2 id={id} className="display text-head">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal order={1}>
          <p className="mt-6 max-w-[46ch] text-lead leading-snug text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
