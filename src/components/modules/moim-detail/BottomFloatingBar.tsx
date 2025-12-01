"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const BottomFloatingBar = () => {
  const [isJoined] = useState(false);
  const [isCanceled] = useState(true);
  const [isCreator] = useState(true);

  return (
    <div
      className={`fixed bottom-0 left-0 flex ${isCreator ? "h-[134px] sm:h-24" : "h-24"} w-full justify-center border-t-2 border-gray-900 bg-white`}
    >
      <div
        className={`mx-4 my-5 w-full max-w-[996px] justify-between sm:mx-6 ${isCreator ? "flex flex-col" : "flex flex-row"} sm:flex-row`}
      >
        <div>
          <h3 className="text-sm font-semibold text-gray-900 sm:text-base">런닝 프로그램 🏃</h3>
          <p className="text-xs font-medium text-gray-700">런닝을 통해 더 건강한 나를 만나세요</p>
        </div>
        {isCreator ? (
          <div className="flex gap-2">
            <Button className="h-11 w-1/2 rounded-[12px] border border-orange-600 bg-transparent text-base font-semibold text-orange-600 hover:bg-orange-600 hover:text-white sm:w-[115px]">
              취소하기
            </Button>
            <Button className="sm: h-11 w-1/2 rounded-[12px] bg-orange-600 text-base font-semibold text-white hover:border hover:border-orange-600 hover:bg-transparent hover:text-orange-600">
              공유하기
            </Button>
          </div>
        ) : isJoined ? (
          <Button className="h-11 w-[115px] rounded-[12px] border border-orange-600 bg-transparent text-base font-semibold text-orange-600 hover:bg-orange-600 hover:text-white">
            참여 취소하기
          </Button>
        ) : (
          <Button
            disabled={isCanceled}
            className="h-11 w-[115px] rounded-[12px] bg-orange-600 text-base font-semibold text-white hover:border hover:border-orange-600 hover:bg-transparent hover:text-orange-600 disabled:bg-gray-400"
          >
            참여하기
          </Button>
        )}
        {}
      </div>
    </div>
  );
};

export default BottomFloatingBar;
