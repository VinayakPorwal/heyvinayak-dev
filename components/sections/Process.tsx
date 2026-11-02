import Image from "next/image";
import { process } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Varying space above each picture so the row rises and falls.
const gaps = ["md:mt-10", "md:mt-28", "md:mt-16", "md:mt-36"];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="py-28 md:py-44">
      <div className="frame">
        <SectionHeading
          id="process-title"
          title="How we'll work together"
          intro="Four simple steps from first call to a live site. You always know what's happening and what comes next."
        />
      </div>

      <ol className="frame mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-8">
        {process.map((step, i) => (
          <Reveal
            as="li"
            order={i}
            key={step.title}
            className="grid grid-cols-[1fr_38%] gap-5 md:flex md:flex-col md:gap-0"
          >
            <div>
              <h3 className="text-lead font-medium tracking-tight">{step.title}</h3>
              <p className="mt-3 text-small text-muted md:text-body">{step.text}</p>
            </div>
            <div className={`relative aspect-[4/5] overflow-hidden bg-surface ${gaps[i % gaps.length]}`}>
              <Image src={step.image} alt={step.alt} fill sizes="(min-width: 768px) 24vw, 38vw" className="lit object-cover" />
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
