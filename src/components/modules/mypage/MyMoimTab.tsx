"use client";

import EmptyState from "./EmptyState";
import MyPageCard from "./MyPageCard";
import { useQuery } from "@tanstack/react-query";
import { TEAM_NAME } from "@/constants";
import { getMoimJoined } from "@/api/mypageMoim.api";

const handleJoinClick = (id: number) => {
  alert(`${id}하기`);
};

const MyMoimTab = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mypage", "joinedMoims"],
    queryFn: () => getMoimJoined(undefined, TEAM_NAME),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const items = data ?? [];

  return (
    <div className="flex flex-col gap-6">
      {items.length === 0 ? (
        <EmptyState text="신청한 모임이 아직 없어요" />
      ) : (
        items.map(item => (
          <MyPageCard
            key={item.id}
            item={item}
            onClick={() => handleJoinClick(item.id)}
            showButton={true}
            isCreatedMoimTab={false}
          />
        ))
      )}
    </div>
  );
};

export default MyMoimTab;
