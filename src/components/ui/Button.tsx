"use client";

import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  shimmer?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: never;
}

interface LinkButtonProps extends BaseProps {
  href: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-charcoal hover:bg-gold-light font-medium tracking-wide",
  secondary:
    "bg-transparent border border-gold text-gold hover:bg-gold/10",
  outline:
    "bg-transparent border border-ivory/30 text-ivory hover:border-gold hover:text-gold",
  ghost: "bg-transparent text-ivory hover:text-gold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

function classes(
  variant: Variant,
  size: Size,
  shimmer: boolean,
  className?: string
) {
  return [
    "relative inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-300 z-10",
    variants[variant],
    sizes[size],
    shimmer ? "btn-shimmer" : "",
    className ?? "",
  ].join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  shimmer = false,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={classes(variant, size, shimmer, className)} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  shimmer = false,
  children,
  className,
}: LinkButtonProps) {
  return (
    <Link href={href} className={classes(variant, size, shimmer, className)}>
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
