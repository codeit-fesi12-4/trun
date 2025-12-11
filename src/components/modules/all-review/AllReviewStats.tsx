import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HeartIcon } from "./HeartIcon";
import { ReviewDistribution } from "@/types/review.type";

type AllReviewStatsProps = {
  averageScore: number;
  distribution: ReviewDistribution[];
};

const AllReviewStats = ({ averageScore, distribution }: AllReviewStatsProps) => {
  const totalReviews = distribution.reduce((sum, i) => sum + i.count, 0);
  const heartFillFor = (index: number) => Math.max(0, Math.min(1, averageScore - index));

  // 가장 많은 count를 가진 점수 찾기
  const maxCount = Math.max(...distribution.map(item => item.count));

  return (
    <Card className="bg-gradient-100 rounded-3xl border border-green-300 shadow-none sm:rounded-4xl">
      <CardContent className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-6">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
          <div className="flex items-end justify-center gap-1">
            <span className="text-4xl font-bold">{averageScore.toFixed(1)}</span>
            <p className="pb-0.5 text-sm text-gray-500">(총 {totalReviews}명 참여)</p>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <HeartIcon
                key={idx}
                fillPercent={heartFillFor(idx)}
                className="h-5 w-5 sm:h-7 sm:w-7"
              />
            ))}
          </div>
        </div>

        <div className="hidden h-px w-full self-stretch bg-gray-200 md:block md:h-auto md:w-px" />

        <div className="flex w-full flex-col gap-2 p-5 sm:mx-0 md:w-90 lg:mx-20">
          {distribution.map(item => {
            const isMaxCount = item.count === maxCount && maxCount > 0;
            return (
              <div key={item.score} className="flex items-center">
                <span
                  className={`w-10 shrink-0 text-sm font-semibold ${isMaxCount ? "text-green-500" : "text-gray-500"}`}
                >
                  {item.score}점
                </span>
                <Progress
                  value={totalReviews === 0 ? 0 : (item.count / totalReviews) * 100}
                  className="bg-[#DAE3E3]"
                />
                <span
                  className={`w-8 shrink-0 text-right text-sm font-semibold ${isMaxCount ? "text-green-500" : "text-gray-500"}`}
                >
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllReviewStats;
