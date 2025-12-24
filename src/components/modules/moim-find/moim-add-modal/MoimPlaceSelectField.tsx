"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOIM_LOCATION } from "@/constants/moim";

type MoimPlaceSelectFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
};

const MoimPlaceSelectField = ({
  id,
  label,
  placeholder,
  value,
  onValueChange,
  required = false,
}: MoimPlaceSelectFieldProps) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
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
        {Object.values(MOIM_LOCATION)
          .filter(location => location !== MOIM_LOCATION.ALL)
          .map(location => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>
);

export default MoimPlaceSelectField;
