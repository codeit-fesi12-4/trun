"use client";

import { useQuery } from "@tanstack/react-query";
import EmptyState from "./EmptyState";
import ReviewCardWritten from "./ReviewCardWritten";
import { getMoimJoined } from "@/api/mypageMoim.api";
import { TEAM_NAME } from "@/constants";

const ReviewWrittenList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mypage", "joinedMoims"],
    queryFn: () => getMoimJoined(undefined, TEAM_NAME),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const items = data ?? [];
  return (
    <div className="flex flex-col rounded-3xl bg-white px-6 pt-6">
      {items.length === 0 ? (
        <EmptyState text="아직 작성한 리뷰가 없어요" />
      ) : (
        items.map(item => <ReviewCardWritten key={item.id} item={item} />)
      )}
    </div>
  );
};
export default ReviewWrittenList;
