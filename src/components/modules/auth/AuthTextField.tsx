"use client";

import { type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

export const AuthTextField = ({
  id,
  label,
  placeholder,
  className,
  autoComplete,
  type = "text",
  error,
  ...props
}: FieldProps) => (
  <div className="space-y-2 text-sm font-semibold text-gray-800">
    <label htmlFor={id} className="flex items-center gap-2">
      <span>{label}</span>
      {error ? <span className="text-xs font-semibold text-red-600">※ {error}</span> : null}
    </label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      className={cn(
        "h-11 rounded-lg border border-gray-50 bg-white text-base font-medium text-gray-900 placeholder:text-sm placeholder:font-medium placeholder:text-gray-400 sm:placeholder:text-base md:placeholder:text-base",
        "focus-visible:border-gray-50 focus-visible:ring-gray-50",
        error &&
          "border-2 border-red-600 text-red-600 focus-visible:border-red-500 focus-visible:ring-red-200",
        className,
      )}
      {...props}
    />
  </div>
);
