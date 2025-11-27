"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IMoimInputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange: (value: string | File | null) => void;
  type?: "text" | "number" | "image";
  min?: string;
  fileName?: string;
}

const MoimInputField = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  min,
  fileName,
}: IMoimInputFieldProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  if (type === "image") {
    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
        </label>
        <div className="flex gap-2">
          <Input
            id={id}
            type="text"
            placeholder={placeholder}
            value={fileName || ""}
            readOnly
            className="flex-1 border-transparent text-sm font-semibold placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300/20 sm:text-base"
          />
          <label htmlFor="file-input">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer rounded-lg border-orange-600 px-2 py-1.5 text-xs font-semibold text-orange-600 hover:bg-orange-600 hover:text-white sm:px-3 sm:py-2 sm:text-sm"
              asChild
            >
              <span>파일 찾기</span>
            </Button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        min={min}
        className="border-transparent font-semibold placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-300/20"
      />
    </div>
  );
};

export default MoimInputField;
