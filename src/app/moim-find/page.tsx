"use client";

import { useMoimsQuery } from "@/hooks/api/moim.api";
import { convertMoimsToMoimCardData } from "@/utils/moim.util";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import MoimFindHeader from "@/components/modules/moim-find/MoimFindHeader";

const MoimFindPage = () => {
  // 모임 목록 조회 API 호출
  const { data, isLoading, error } = useMoimsQuery({});

  // API 응답 데이터(Moim[])를 MoimCardData[] 형식으로 변환
  const moimCardData = data ? convertMoimsToMoimCardData(data) : undefined;

  return (
    <>
      <MoimFindHeader />
      {isLoading && (
        <div className="mt-6 text-center text-gray-500">모임 목록을 불러오는 중...</div>
      )}
      {error && (
        <div className="mt-6 text-center text-red-500">
          모임 목록을 불러오는데 실패했습니다. 다시 시도해주세요.
        </div>
      )}
      {!isLoading && !error && moimCardData && <MoimCardList items={moimCardData} />}
    </>
  );
};

export default MoimFindPage;
