"use client";

import Image from "next/image";

type ServieCheckboxFieldProps = {
  title: string;
  subtitle?: string;
  service: string;
  isSelected: boolean;
  onServiceChange: (service: string) => void;
  iconSrc?: string;
  iconAlt?: string;
};

const ServieCheckboxField = ({
  title,
  subtitle,
  service,
  isSelected,
  onServiceChange,
  iconSrc,
  iconAlt,
}: ServieCheckboxFieldProps) => (
  <button
    type="button"
    onClick={() => onServiceChange(service)}
    className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors sm:gap-4 sm:p-4 ${
      isSelected ? "border-green-500 bg-[#DEFFF0] text-green-600" : "border-gray-50 text-gray-700"
    }`}
  >
    {iconSrc && (
      <Image
        src={iconSrc}
        alt={iconAlt || title}
        width={40}
        height={40}
        className="size-10 shrink-0 sm:size-12"
      />
    )}
    <div className="flex flex-col text-left">
      <span className="text-sm font-semibold sm:text-base">{title}</span>
      {subtitle && <span className="text-xs sm:text-sm">{subtitle}</span>}
    </div>
  </button>
);

export default ServieCheckboxField;
