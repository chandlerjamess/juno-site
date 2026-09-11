import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "inverse" | "outline";

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  /** Dark pill on a light surface. */
  primary: "bg-ink text-white hover:bg-grey-600",
  /** Light pill on a dark surface. */
  inverse: "bg-white text-ink hover:bg-grey-200",
  /** Quiet, bordered alternative on a light surface. */
  outline: "border border-grey-200 text-ink hover:border-ink hover:bg-grey-50",
};

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
