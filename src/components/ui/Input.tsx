import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-grey-70">
          {label}
          {props.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "w-full rounded-lg border border-grey-40 bg-white px-3 py-2 text-sm text-grey-90",
          "placeholder:text-grey-50 transition-colors duration-200",
          "focus:outline-none focus:border-primary-20 focus:ring-1 focus:ring-primary-20",
          "disabled:bg-grey-10 disabled:cursor-not-allowed",
          error ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
