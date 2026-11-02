import { Briefcase, Check, GraduationCap, LayoutDashboard, Rocket, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ServiceIcon } from "@/data";
import { Spotlight } from "./Spotlight";

const icons: Record<ServiceIcon, LucideIcon> = {
  rocket: Rocket,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  "layout-dashboard": LayoutDashboard,
};

type BentoCardProps = {
  title: string;
  icon: ServiceIcon;
  benefit: string;
  includes: string[];
  image?: string;
  large?: boolean;
  className?: string;
};

export function BentoCard({ title, icon, benefit, includes, image, large, className = "" }: BentoCardProps) {
  const Icon = icons[icon];
  return (
    <Spotlight
      className={`group h-full overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong ${className}`}
    >
      <article tabIndex={0} className="flex h-full flex-col p-6 outline-none md:p-8">
        <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent-text transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
          <Icon aria-hidden className="size-5" />
        </span>
        <h3 className="mt-6 text-h3 font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-muted">{benefit}</p>

        {/* "What you get": always visible on touch, revealed on hover/focus with a pointer */}
        <div className="mt-6 grid transition-[grid-template-rows,opacity] duration-300 ease-out [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:opacity-100">
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-ink">What you get</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check aria-hidden className="size-3.5 shrink-0 text-accent-text" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {large && image && (
          <div className="relative -mb-8 mt-auto hidden aspect-[16/7] translate-y-2 overflow-hidden rounded-t-xl border border-b-0 border-border pt-0 transition-transform duration-500 group-hover:translate-y-0 md:-mr-8 md:ml-8 md:block">
            <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
          </div>
        )}
      </article>
    </Spotlight>
  );
}
