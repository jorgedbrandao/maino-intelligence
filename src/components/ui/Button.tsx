"use client";

import React from "react";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary-30 text-white hover:bg-primary-40 focus-visible:ring-primary-30",
  secondary:
    "border border-primary-20 text-primary-30 hover:bg-primary-10/10 focus-visible:ring-primary-20",
  white:
    "bg-white text-primary-40 hover:bg-grey-10 focus-visible:ring-white",
  ghost:
    "text-grey-60 hover:text-grey-90 hover:bg-grey-10 focus-visible:ring-grey-30",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
