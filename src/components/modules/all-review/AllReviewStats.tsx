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

  return (
    <Card className="bg-gradient-100 rounded-3xl border border-green-300 shadow-none sm:rounded-4xl">
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-semibold">{averageScore.toFixed(1)}</span>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <HeartIcon key={idx} fillPercent={heartFillFor(idx)} />
            ))}
          </div>
          <p className="text-sm text-green-600">총 {totalReviews}명 참여</p>
        </div>

        <div className="grid w-full gap-2">
          {distribution.map(item => (
            <div key={item.score} className="flex items-center gap-3">
              <span className="w-10 text-sm">{item.score}점</span>
              <Progress value={totalReviews === 0 ? 0 : (item.count / totalReviews) * 100} />
              <span className="w-8 text-right text-sm">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllReviewStats;
