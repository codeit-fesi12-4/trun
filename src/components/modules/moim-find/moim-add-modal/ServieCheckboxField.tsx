"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface IServieCheckboxFieldProps {
  id: string;
  title: string;
  subtitle?: string;
  service: string;
  isSelected: boolean;
  onServiceChange: (service: string) => void;
  checkColor?: "orange-500" | "orange-600";
}

const ServieCheckboxField = ({
  id,
  title,
  subtitle,
  service,
  isSelected,
  onServiceChange,
  checkColor = "orange-500",
}: IServieCheckboxFieldProps) => (
  <label
    htmlFor={id}
    className={`flex flex-1 cursor-pointer items-start gap-1.5 rounded-lg border-2 p-2 transition-colors sm:gap-2 sm:p-3 ${
      isSelected
        ? "border-transparent bg-gray-900 text-white"
        : "border-transparent bg-white text-gray-700"
    }`}
  >
    <Checkbox
      id={id}
      checked={isSelected}
      onCheckedChange={() => onServiceChange(service)}
      className={`mt-1 size-4 shrink-0 sm:size-5 ${
        isSelected
          ? checkColor === "orange-600"
            ? "data-[state=checked]:bg-white data-[state=checked]:text-orange-600! [&_svg]:stroke-[3px]"
            : "data-[state=checked]:bg-white data-[state=checked]:text-orange-500! [&_svg]:stroke-[3px]"
          : ""
      }`}
    />
    <div className="flex flex-col">
      <span className="text-sm font-semibold sm:text-base">{title}</span>
      {subtitle && <span className="text-xs sm:text-sm">{subtitle}</span>}
    </div>
  </label>
);

export default ServieCheckboxField;
