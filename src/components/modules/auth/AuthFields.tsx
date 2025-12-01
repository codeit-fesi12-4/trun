"use client";

import Image from "next/image";
import { type InputHTMLAttributes, useState } from "react";

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
        "focus-visible:border-gray-400 focus-visible:ring-gray-200",
        error &&
          "border-2 border-red-600 text-red-600 focus-visible:border-red-500 focus-visible:ring-red-200",
        className,
      )}
      {...props}
    />
    {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}
  </div>
);

type PasswordFieldProps = FieldProps & {
  type?: never;
};

export const AuthPasswordField = ({
  id,
  label,
  placeholder,
  className,
  autoComplete = "current-password",
  error,
  ...props
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2 text-sm font-semibold text-gray-800">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-11 rounded-lg border border-gray-200 bg-gray-50 pr-10 text-base font-medium text-gray-900 placeholder:text-sm placeholder:font-medium placeholder:text-gray-400 sm:placeholder:text-base md:placeholder:text-base",
            "focus-visible:border-gray-400 focus-visible:ring-gray-200",
            error &&
              "border-2 border-red-500 text-red-600 focus-visible:border-red-500 focus-visible:ring-red-200",
            className,
          )}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible(prev => !prev)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700"
        >
          <Image
            src={visible ? "/icons/auth/visibility_on.svg" : "/icons/auth/visibility_off.svg"}
            alt={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
            width={16}
            height={16}
            className="opacity-80"
            priority={false}
          />
          <span className="sr-only">{visible ? "비밀번호 숨기기" : "비밀번호 표시"}</span>
        </button>
      </div>
      {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}
    </div>
  );
};
