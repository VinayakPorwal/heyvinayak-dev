"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, GraduationCap, LayoutDashboard, Rocket, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { services, type ServiceIcon } from "@/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<ServiceIcon, LucideIcon> = {
  rocket: Rocket,
  briefcase: Briefcase,
  "graduation-cap": GraduationCap,
  "layout-dashboard": LayoutDashboard,
};

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" aria-labelledby="services-title" className="frame py-28 md:py-44">
      <SectionHeading
        id="services-title"
        title="What I can build for you"
        intro="Pick what fits your business. Every project is designed for phones first, loads fast and is built to bring you enquiries."
      />

      <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
        <Reveal order={2} className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-28 aspect-[4/3] overflow-hidden bg-surface">
            {services.map((s, i) => (
              <Image
                key={s.title}
                src={s.image}
                alt=""
                fill
                sizes="48vw"
                className={`lit object-cover object-left-top transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </Reveal>

        <ul className="lg:col-span-5 lg:col-start-8">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            const isActive = i === active;
            return (
              <Reveal as="li" order={i} key={s.title} className="py-2">
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`service-${i}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`flex w-full items-center gap-4 py-4 text-left transition-colors ${isActive ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  <Icon aria-hidden className={`size-6 shrink-0 transition-colors ${isActive ? "text-accent" : ""}`} />
                  <span className="text-lead font-medium tracking-tight">{s.title}</span>
                </button>
                <p className={`pl-10 text-body transition-colors ${isActive ? "text-ink" : "text-muted"}`}>{s.benefit}</p>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`service-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 pl-10">
                        <p className="mt-4 text-small text-muted">What you get</p>
                        <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-small">
                          {s.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
