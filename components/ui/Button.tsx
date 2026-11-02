"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "link";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

const styles = {
  primary:
    "h-12 rounded-full bg-accent px-6 font-medium text-accent-ink hover:brightness-105",
  ghost:
    "h-12 rounded-full border border-border-strong px-6 font-medium text-ink hover:border-ink/40 hover:bg-surface-2",
  link: "font-medium text-accent-text underline-offset-4 hover:underline",
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  magnetic = variant === "primary",
  className = "",
  icon,
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-2 text-[0.9375rem] transition-[background-color,border-color,filter,color] duration-200 active:scale-[0.98] ${styles[variant]} ${className}`}
    >
      {children}
      {icon ??
        (external && (
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        ))}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </motion.a>
  );
}
