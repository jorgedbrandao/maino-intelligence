import React from "react";

type BadgeVariant = "primary" | "secondary" | "outline" | "update" | "maintenance" | "feature";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary-10/30 text-primary-40",
  secondary: "bg-secondary-20 text-white",
  outline: "border border-grey-30 text-grey-60",
  update: "bg-primary-10/30 text-primary-40",
  maintenance: "bg-yellow-100 text-yellow-800",
  feature: "bg-secondary-10/50 text-secondary-40",
};

export function Badge({ variant = "primary", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
