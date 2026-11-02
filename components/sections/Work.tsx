import { work } from "@/data";
import { CaseStudyCard } from "@/components/ui/CaseStudyCard";
import { Section } from "@/components/ui/Section";

export function Work() {
  return (
    <Section
      id="work"
      kicker="Client work"
      title={
        <>
          Real sites, <span className="serif-accent">live</span> right now
        </>
      }
      intro="Each one started with a problem the owner needed solved. Here's what I built and why."
    >
      <div className="space-y-6 md:space-y-8">
        {work.map((w, i) => (
          <CaseStudyCard key={w.slug} item={w} flip={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
