import { services } from "@/data";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

// Bento layout: big, small / small, big
const spans = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4"];

export function Services() {
  return (
    <Section
      id="services"
      kicker="Services"
      title={
        <>
          What I can <span className="serif-accent">build</span> for you
        </>
      }
      intro="Pick what fits your business. Every project is designed for phones first, loads fast and is built to bring you enquiries."
    >
      <ul className="grid gap-4 md:grid-cols-6">
        {services.map((s, i) => {
          const large = spans[i % spans.length] === "md:col-span-4";
          return (
            <Reveal as="li" key={s.title} order={i} className={spans[i % spans.length]}>
              <BentoCard {...s} large={large} />
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
