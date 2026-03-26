import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <span
      className={[
        "bg-gradient-to-r from-white to-primary-10 bg-clip-text text-transparent",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
