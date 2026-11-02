import { ArrowUpRight } from "lucide-react";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  className?: string;
};

const styles = {
  primary: "bg-accent text-accent-ink hover:brightness-110 px-6 h-12",
  secondary: "bg-surface-2 text-ink hover:bg-ink hover:text-bg px-6 h-12",
  text: "text-ink underline decoration-muted underline-offset-4 hover:decoration-accent",
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: ButtonLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-2 text-small font-medium transition-[background-color,color,filter,transform] duration-200 active:scale-[0.98] ${styles[variant]} ${className}`}
    >
      {children}
      {external && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
