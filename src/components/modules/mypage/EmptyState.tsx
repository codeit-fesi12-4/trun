import Image from "next/image";

type EmptyStateProps = {
  text: string;
  height?: number;
};

export const EmptyState = ({ text }: EmptyStateProps) => (
  <div className="flex h-[360px] flex-col items-center justify-center">
    <Image src="/icons/common/empty.svg" alt="empty" width={160} height={160} />
    <p className="text-sm font-medium text-gray-500 sm:text-lg sm:font-semibold">{text}</p>
  </div>
);
