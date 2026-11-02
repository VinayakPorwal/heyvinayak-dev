"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Position in the stagger (0, 1, 2...) */
  order?: number;
  as?: "div" | "li" | "article" | "figure" | "span";
};

export function Reveal({ children, className, order = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: order * 0.06 }}
    >
      {children}
    </Tag>
  );
}
