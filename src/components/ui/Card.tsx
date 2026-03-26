import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        "rounded-2xl border border-grey-20 bg-white transition-shadow duration-200",
        onClick ? "cursor-pointer hover:shadow-lg" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
