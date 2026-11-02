import { Boxes, Cloud, Code2, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiApachekafka, SiCss, SiDocker, SiExpress, SiFirebase, SiFramer, SiGithub, SiHtml5, SiJavascript,
  SiMongodb, SiNextdotjs, SiNodedotjs, SiPhp, SiPython, SiReact, SiRedis, SiRedux, SiTailwindcss,
  SiTurborepo, SiTypescript, SiVercel,
} from "react-icons/si";
import { skills } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconFor: Record<string, IconType | LucideIcon> = {
  HTML5: SiHtml5, CSS3: SiCss, JavaScript: SiJavascript, TypeScript: SiTypescript, React: SiReact,
  "Next.js": SiNextdotjs, "Tailwind CSS": SiTailwindcss, "Redux Toolkit": SiRedux, "Framer Motion": SiFramer,
  "Node.js": SiNodedotjs, Express: SiExpress, MongoDB: SiMongodb, Firebase: SiFirebase, PHP: SiPhp,
  Python: SiPython, "REST APIs": Code2, Docker: SiDocker, AWS: Cloud, Redis: SiRedis, Kafka: SiApachekafka,
  Turborepo: SiTurborepo, "Micro-frontends": Boxes, "Git & GitHub": SiGithub, Vercel: SiVercel,
};

const groups = [
  { title: "Frontend", items: skills.frontend },
  { title: "Backend", items: skills.backend },
  { title: "Infra & scaling", items: skills.infra },
];

export function TechStack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="bg-surface py-28 md:py-40">
      <div className="frame">
        <SectionHeading
          id="stack-title"
          // taste-skill-ignore: the 👋 is requested in the brief
          title="For the developers 👋"
          intro="The tools behind the sites above. Clients can skip this part."
        />
        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {groups.map((g, gi) => (
            <Reveal key={g.title} order={gi}>
              <h3 className="text-lead font-medium tracking-tight">{g.title}</h3>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 text-small">
                {g.items.map((item) => {
                  const Icon = iconFor[item];
                  return (
                    <li key={item} className="flex items-center gap-2.5">
                      {Icon ? <Icon aria-hidden className="size-4 shrink-0 text-muted" /> : <span className="size-4" />}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
