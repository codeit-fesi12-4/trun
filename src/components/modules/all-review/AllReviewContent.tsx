"use client";

import { useState } from "react";
import Image from "next/image";

import MoimFindCategory from "@/components/modules/moim-find/MoimFindCategory";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@/components/ui/tabs";

type ReviewDistribution = { score: number; count: number };

const SERVICE_CATEGORIES = [{ value: "running" }, { value: "workation" }];

const INITIAL_DISTRIBUTION: ReviewDistribution[] = [
  { score: 5, count: 0 },
  { score: 4, count: 0 },
  { score: 3, count: 0 },
  { score: 2, count: 0 },
  { score: 1, count: 0 },
];

const AllReviewContent = () => {
  const [service, setService] = useState(SERVICE_CATEGORIES[0].value);
  const totalReviews = INITIAL_DISTRIBUTION.reduce((sum, item) => sum + item.count, 0);

  return (
    <Tabs value={service} onValueChange={setService} className="w-full">
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 p-5 shadow-sm sm:p-4">
        <MoimFindCategory />

        <TabsContent value={service} className="flex flex-col gap-4 pt-1">
          <Card className="bg-gradient-100 border-0 shadow-none">
            <CardContent className="flex flex-col gap-5 rounded-xl px-4 px-8 py-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-7">
              <div className="flex flex-col items-center gap-2 text-center sm:w-2/5">
                <span className="text-3xl text-5xl font-semibold text-gray-900 sm:text-4xl">
                  0.0
                </span>
                <div className="flex gap-1 text-gray-300 sm:gap-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Image
                      key={idx}
                      src="/icons/review/icon_heart.svg"
                      alt="heart rating"
                      width={20}
                      height={20}
                      className="h-5 w-5 sm:h-6 sm:w-6"
                    />
                  ))}
                </div>
              </div>

              <div className="my-2 h-px w-full bg-gray-200 sm:my-0 sm:hidden" />
              <div className="hidden h-24 w-px bg-gray-200 sm:block" />

              <div className="grid w-full gap-2 sm:w-3/5 sm:gap-2.5">
                {INITIAL_DISTRIBUTION.map(item => (
                  <div key={item.score} className="flex items-center gap-3">
                    <span className="w-8 text-xs font-medium text-gray-700 sm:w-10 sm:text-sm">
                      {item.score}점
                    </span>
                    <Progress
                      value={totalReviews === 0 ? 0 : (item.count / totalReviews) * 100}
                      className="bg-white/60"
                    />
                    <span className="w-6 text-right text-xs font-medium text-gray-700 sm:w-8 sm:text-sm">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-dashed border-gray-200 bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center gap-3 py-12 py-14 text-gray-600 sm:py-14">
              <Image
                src="/icons/review/blank_review.svg"
                alt="blank review"
                width={140}
                height={120}
                className="h-auto w-28 w-32 sm:w-32"
              />
              <p className="text-base font-medium sm:text-lg">아직 리뷰가 없어요</p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default AllReviewContent;
