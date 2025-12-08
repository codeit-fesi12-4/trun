import { HeartSvg } from "./HeartSvg";

export const HeartIcon = ({ fillPercent }: { fillPercent: number }) => {
  const clamped = Math.max(0, Math.min(1, fillPercent));
  const clipRight = `${100 - clamped * 100}%`;

  return (
    <span className="relative block h-5 w-5 sm:h-6 sm:w-6" aria-hidden>
      <HeartSvg className="absolute inset-0 text-[#DAE3E3]" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        <HeartSvg className="text-green-500" />
      </span>
    </span>
  );
};
