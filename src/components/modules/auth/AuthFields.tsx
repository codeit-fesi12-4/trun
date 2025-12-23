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
  value,
  onFocus,
  onBlur,
  ...props
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const hasValue = Boolean(value && String(value).length > 0);
  const showIcon = isFocused && hasValue;

  return (
    <div className="space-y-2 text-sm font-semibold text-gray-800">
      <label htmlFor={id} className="flex items-center gap-2">
        <span>{label}</span>
        {error ? <span className="text-xs font-semibold text-red-600">※ {error}</span> : null}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "h-11 rounded-lg border border-gray-50 bg-white pr-10 text-base font-medium text-gray-900 placeholder:text-sm placeholder:font-medium placeholder:text-gray-400 sm:placeholder:text-base md:placeholder:text-base",
            "focus-visible:border-gray-50 focus-visible:ring-gray-50",
            error &&
              "border-2 border-red-500 text-red-600 focus-visible:border-red-500 focus-visible:ring-red-200",
            className,
          )}
          {...props}
        />
        {showIcon && (
          <button
            type="button"
            onMouseDown={e => {
              e.preventDefault();
              setVisible(prev => !prev);
            }}
            className="absolute top-1/2 right-4 -translate-y-1/2 font-bold text-gray-500 transition-colors hover:text-gray-700"
          >
            <Image
              src={visible ? "/icons/auth/visibility_on.svg" : "/icons/auth/visibility_off.svg"}
              alt={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
              width={20}
              height={20}
              className="font-bold opacity-60"
              priority={false}
            />
            <span className="sr-only">{visible ? "비밀번호 숨기기" : "비밀번호 표시"}</span>
          </button>
        )}
      </div>
    </div>
  );
};
