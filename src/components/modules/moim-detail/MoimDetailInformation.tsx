"use client";

import MoimDetailImage from "./MoimDetailImage";
import MoimDetailSummary from "./MoimDetailSummary";
import { useMoim } from "@/hooks/api/moimDetail.api";

type MoimDetailInformationProps = {
  moimId: string;
};

const MoimDetailInformation = ({ moimId }: MoimDetailInformationProps) => {
  // 추후 실제 데이터로 변경

  const { data, isLoading, error } = useMoim({ moimId: Number(moimId) });

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  if (!data) return null;

  return (
    <div>
      <div className="flex w-full flex-col items-center gap-4 sm:h-60 sm:flex-row sm:justify-center md:h-[270px]">
        <MoimDetailImage moim={data} />
        <MoimDetailSummary moim={data} />
      </div>
    </div>
  );
};

export default MoimDetailInformation;
