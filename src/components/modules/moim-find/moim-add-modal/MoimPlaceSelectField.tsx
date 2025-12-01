"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IMoimPlaceSelectFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
}

const MoimPlaceSelectField = ({
  id,
  label,
  placeholder,
  value,
  onValueChange,
}: IMoimPlaceSelectFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">
      {label}
    </label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        className="w-full border-transparent font-semibold data-[placeholder]:!text-gray-400 [&>svg:last-child]:hidden"
      >
        <SelectValue placeholder={placeholder} />
        <Image
          src="/icons/color=default, type=down.svg"
          alt="dropdown"
          width={28}
          height={28}
          className="size-6 shrink-0"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="건대입구">건대입구</SelectItem>
        <SelectItem value="을지로3가">을지로3가</SelectItem>
        <SelectItem value="신림">신림</SelectItem>
        <SelectItem value="홍대입구">홍대입구</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default MoimPlaceSelectField;
