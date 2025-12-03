"use client";

import MyPageCard from "./MyPageCard";
import { MOCK_CREATED_MOIM } from "@/constants/mypageTestData";
import EmptyState from "./EmptyState";

const CreatedMoimTab = () => (
  <div className="flex flex-col gap-6">
    {MOCK_CREATED_MOIM.length === 0 ? (
      <EmptyState text="아직 만든 모임이 없어요" />
    ) : (
      MOCK_CREATED_MOIM.map(card => (
        <MyPageCard key={card.id} item={card} showButton={false} isCreatedMoimTab={true} />
      ))
    )}
  </div>
);

export default CreatedMoimTab;
