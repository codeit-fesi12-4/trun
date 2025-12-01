"use client";

import { useMoimsQuery } from "@/hooks/api/moim.api";
import { convertMoimsToMoimCardData } from "@/utils/moim.util";
import MoimCardList from "@/components/modules/moim-find/MoimCardList";
import MoimFindHeader from "@/components/modules/moim-find/MoimFindHeader";

const MoimFindPage = () => {
  const { data, isLoading, error } = useMoimsQuery({});
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
