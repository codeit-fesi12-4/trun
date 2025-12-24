"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type MoimInputFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange: (value: string | File | null) => void;
  type?: "text" | "number" | "image";
  min?: string;
  fileName?: string;
  error?: string;
  maxLength?: number;
  helperText?: string;
  required?: boolean;
};

const MoimInputField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  min,
  fileName,
  error,
  maxLength,
  helperText,
  required = false,
}: MoimInputFieldProps) => {
  // 파일 입력 처리 이벤트 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  // 텍스트 입력 처리 이벤트 핸들러 (최대 길이 제한)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) {
      return; // 최대 길이 초과 시 입력 차단
    }
    onChange(newValue);
  };

  if (type === "image") {
    const fileInputId = `${id}-file`;
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-gray-600">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex gap-2">
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={fileName || ""}
            readOnly
            className={`flex-1 border-transparent text-sm font-semibold placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300/20 sm:text-base ${
              error ? "border-red-500" : ""
            }`}
          />
          <label htmlFor={fileInputId}>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer rounded-lg border-green-600 bg-white px-2 py-1.5 text-xs font-semibold text-green-600 hover:bg-green-600 hover:text-white sm:px-3 sm:py-2 sm:text-sm"
              asChild
            >
              <span>파일 찾기</span>
            </Button>
            <input
              id={fileInputId}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-gray-600">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleTextChange}
        min={min}
        maxLength={maxLength}
        className={`border-transparent font-semibold placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300/20 ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {maxLength && (
        <p className="text-xs text-gray-500">
          {(value || "").length}/{maxLength}
        </p>
      )}
      {helperText && !error && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};

export default MoimInputField;
