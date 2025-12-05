import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const HeartSvg = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 32 28"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
  >
    <path d="M31.825 9.65833C31.6667 4.275 27.3917 0 22.0083 0C20.2667 0 17.575 1.26667 16.4667 3.325C16.3083 3.8 15.675 3.8 15.5167 3.325C14.25 1.425 11.7167 0.158333 9.81667 0.158333C4.59167 0.158333 0.158333 4.43333 0 9.65833V9.975C0 12.6667 1.10833 15.2 3.00833 17.1C3.00833 17.1 3.00833 17.1 3.00833 17.2583C3.16667 17.4167 10.7667 24.0667 14.25 27.075C15.2 27.8667 16.625 27.8667 17.575 27.075C21.0583 24.0667 28.5 17.4167 28.8167 17.2583C28.8167 17.2583 28.8167 17.2583 28.8167 17.1C30.7167 15.3583 31.825 12.825 31.825 9.975V9.65833Z" />
  </svg>
);

const HeartIcon = ({ fillPercent }: { fillPercent: number }) => {
  const clamped = Math.max(0, Math.min(1, fillPercent));
  const clipRight = `${100 - clamped * 100}%`;

  return (
    <span className="relative block h-5 w-5 sm:h-6 sm:w-6" aria-hidden>
      <HeartSvg className="absolute inset-0 text-[#DAE3E3]" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}
      >
        <HeartSvg className="text-green-500" />
      </span>
    </span>
  );
};

const AllReviewAverageBox = () => {
  const averageScore = scoresData?.averageScore ?? 0;

  return (
    <Card className="bg-gradient-100 rounded-3xl border border-green-300 shadow-none sm:rounded-4xl">
      <CardContent className="flex flex-col gap-5 rounded-xl px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 sm:py-7">
        <div className="flex flex-col items-center gap-2 text-center sm:w-2/5">
          <span className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            {averageScore.toFixed(1)}
          </span>
          <div className="flex gap-1 text-gray-300 sm:gap-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <HeartIcon key={idx} fillPercent={heartFillFor(idx)} />
            ))}
          </div>
          <p className="text-sm font-medium text-green-600 sm:text-base">
            {scoresData === undefined ? "집계 중.." : `총 ${totalItemCount}명 참여`}
          </p>
        </div>

        <div className="my-2 h-px w-full bg-gray-200 sm:my-0 sm:hidden" />
        <div className="hidden h-24 w-px bg-gray-200 sm:block" />

        <div className="grid w-full gap-2 sm:w-3/5 sm:gap-2.5">
          {distribution.map(item => (
            <div key={item.score} className="flex items-center gap-3">
              <span className="w-8 text-xs font-medium text-gray-500 sm:w-10 sm:text-sm">
                {item.score}점
              </span>
              <Progress
                value={totalReviews === 0 ? 0 : (item.count / totalReviews) * 100}
                className="bg-[#DAE3E3]"
              />
              <span className="w-6 text-right text-xs font-medium text-gray-500 sm:w-8 sm:text-sm">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllReviewAverageBox;
