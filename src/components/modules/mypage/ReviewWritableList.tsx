import MyPageCard from "./MyPageCard";
import EmptyState from "./EmptyState";
import { getMoimJoined } from "@/api/mypageMoim.api";
import { TEAM_NAME } from "@/constants";
import { useQuery } from "@tanstack/react-query";

const handleJoinClick = (id: number) => {
  alert(`모임 ${id} 클릭`);
};

const ReviewWritableList = () => {
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
        <EmptyState text="아직 작성 가능한 리뷰가 없어요" />
      ) : (
        items.map(card => (
          <MyPageCard
            key={card.id}
            item={card}
            onClick={() => handleJoinClick(card.id)}
            showButton={true}
            isReviewedMoimTab={true}
          />
        ))
      )}
    </div>
  );
};
export default ReviewWritableList;
