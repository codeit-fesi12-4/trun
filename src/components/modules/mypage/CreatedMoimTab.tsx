"use client";

import MyPageCard from "./MyPageCard";
import { MOCK_CREATED_MOIM } from "@/constants/mypageTestData";

const CreatedMoimTab = () => (
  <div className="flex flex-col gap-6">
    {MOCK_CREATED_MOIM.length === 0 ? (
      <p className="flex h-40 items-center justify-center text-sm font-medium text-gray-500">
        아직 만든 모임이 없어요
      </p>
    ) : (
      MOCK_CREATED_MOIM.map(card => (
        <MyPageCard key={card.id} item={card} showButton={false} isCreatedMoimTab={true} />
      ))
    )}
  </div>
);

export default CreatedMoimTab;
