import { HeartSvg } from "./HeartSvg";
import { cn } from "@/lib/utils";

type HeartIconProps = {
  fillPercent: number;
  className?: string;
};

export const HeartIcon = ({ fillPercent, className }: HeartIconProps) => {
  const clamped = Math.max(0, Math.min(1, fillPercent));
  const clipRight = `${100 - clamped * 100}%`;

  return (
    <span className={cn("relative block h-5 w-5 sm:h-6 sm:w-6", className)} aria-hidden>
      <HeartSvg className="absolute inset-0 h-full w-full text-[#DAE3E3]" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        <HeartSvg className="h-full w-full text-green-500" />
      </span>
    </span>
  );
};
