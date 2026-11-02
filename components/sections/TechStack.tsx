import { Boxes, Cloud, Code2, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiApachekafka, SiCss, SiDocker, SiExpress, SiFirebase, SiFramer, SiGithub, SiHtml5, SiJavascript,
  SiMongodb, SiNextdotjs, SiNodedotjs, SiPhp, SiPython, SiReact, SiRedis, SiRedux, SiTailwindcss,
  SiTurborepo, SiTypescript, SiVercel,
} from "react-icons/si";
import { skills } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

// Icon + brand colour shown on hover. `null` colour = use the ink colour (black/white brands).
const meta: Record<string, [IconType | LucideIcon, string | null]> = {
  HTML5: [SiHtml5, "#E34F26"], CSS3: [SiCss, "#1572B6"], JavaScript: [SiJavascript, "#F7DF1E"],
  TypeScript: [SiTypescript, "#3178C6"], React: [SiReact, "#61DAFB"], "Next.js": [SiNextdotjs, null],
  "Tailwind CSS": [SiTailwindcss, "#06B6D4"], "Redux Toolkit": [SiRedux, "#764ABC"], "Framer Motion": [SiFramer, "#0055FF"],
  "Node.js": [SiNodedotjs, "#5FA04E"], Express: [SiExpress, null], MongoDB: [SiMongodb, "#47A248"],
  Firebase: [SiFirebase, "#FFCA28"], PHP: [SiPhp, "#777BB4"], Python: [SiPython, "#3776AB"],
  "REST APIs": [Code2, null], Docker: [SiDocker, "#2496ED"], AWS: [Cloud, "#FF9900"], Redis: [SiRedis, "#FF4438"],
  Kafka: [SiApachekafka, null], Turborepo: [SiTurborepo, "#EF4444"], "Micro-frontends": [Boxes, null],
  "Git & GitHub": [SiGithub, null], Vercel: [SiVercel, null],
};

const groups = [
  { title: "Frontend", items: skills.frontend },
  { title: "Backend", items: skills.backend },
  { title: "Infra & scaling", items: skills.infra },
];

export function TechStack() {
  return (
    <Section
      id="stack"
      kicker="Tech stack"
      title="For the developers 👋"
      intro="The tools behind the sites above. Clients can safely skip this part."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {groups.map((g, gi) => (
          <Reveal key={g.title} order={gi} className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">{g.title}</h3>
            <ul className="mt-5 grid grid-cols-3 gap-2">
              {g.items.map((item) => {
                const [Icon, color] = meta[item] ?? [Code2, null];
                return (
                  <li key={item}>
                    <span
                      style={{ "--brand": color ?? "var(--ink)" } as React.CSSProperties}
                      className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-transparent bg-surface-2/60 p-2 text-center transition-colors duration-300 hover:border-border hover:bg-surface-2"
                    >
                      <Icon aria-hidden className="size-6 text-muted transition-[color,transform] duration-300 group-hover:scale-110 group-hover:text-[var(--brand)]" />
                      <span className="text-[0.6875rem] leading-tight text-muted transition-colors group-hover:text-ink">{item}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
