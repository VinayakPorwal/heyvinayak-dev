"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Position in the section's stagger: heading 0, text 1, picture 2... */
  order?: number;
  as?: "div" | "li" | "article" | "figure";
};

const STEP = 0.075;

export function Reveal({ children, className, order = 0, as = "div" }: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: order * STEP }}
    >
      {children}
    </Tag>
  );
}
