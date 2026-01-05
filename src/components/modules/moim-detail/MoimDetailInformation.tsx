"use client";

import { useMoimQuery } from "@/hooks/queries/useMoimDetailQuery";
import MoimDetailImage from "./MoimDetailImage";
import MoimDetailImageSkeleton from "./detail-skeleton/MoimDetailImageSkeleton";
import MoimDetailSummary from "./MoimDetailSummary";
import MoimDetailSummarySkeleton from "./detail-skeleton/MoimDetailSummarySkeleton";

type MoimDetailInformationProps = {
  moimId: number;
};

const MoimDetailInformation = ({ moimId }: MoimDetailInformationProps) => {
  const { data, isLoading, error } = useMoimQuery(moimId);

  if (isLoading)
    return (
      <div>
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center md:gap-5">
          <MoimDetailImageSkeleton />
          <MoimDetailSummarySkeleton />
        </div>
      </div>
    );
  if (error) return <div>에러발생</div>;
  if (!data) return null;

  return (
    <div>
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center md:gap-5">
        <MoimDetailImage moim={data} />
        <MoimDetailSummary moim={data} />
      </div>
    </div>
  );
};

export default MoimDetailInformation;
