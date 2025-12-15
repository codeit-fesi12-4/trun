"use client";

import { type InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

export const MypageField = ({
  id,
  label,
  placeholder,
  className,
  autoComplete,
  type = "text",
  error,
  ...props
}: FieldProps) => (
  <div className="space-y-2 py-1 text-sm font-semibold text-gray-800">
    <label htmlFor={id} className="block">
      {label}
    </label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      className={cn(
        "h-11 rounded-lg border border-gray-200 bg-gray-50 text-base font-medium text-gray-900 placeholder:text-sm placeholder:font-medium placeholder:text-gray-400 sm:placeholder:text-base md:placeholder:text-base",
        "focus-visible:border-green-400 focus-visible:ring-0",
        error &&
          "border-2 border-red-600 text-red-600 focus-visible:border-red-500 focus-visible:ring-0",
        className,
      )}
      {...props}
    />
    {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}
  </div>
);
