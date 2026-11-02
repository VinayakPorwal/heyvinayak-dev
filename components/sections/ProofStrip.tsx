import { SiFramer, SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";
import { work } from "@/data";
import { Marquee } from "@/components/ui/Marquee";

const tech = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "Vercel", Icon: SiVercel },
];

export function ProofStrip() {
  return (
    <div className="border-y border-border bg-surface/40 py-6">
      <Marquee label="Clients and tools">
        {work.map((w) => (
          <span key={w.slug} className="flex items-center gap-3 whitespace-nowrap text-lg font-semibold tracking-tight text-ink/80">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {w.title}
            <span className="text-sm font-normal text-muted">{w.type}</span>
          </span>
        ))}
        {tech.map(({ name, Icon }) => (
          <span key={name} className="flex items-center gap-2 whitespace-nowrap text-muted transition-colors hover:text-ink">
            <Icon aria-hidden className="size-5" />
            {name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
