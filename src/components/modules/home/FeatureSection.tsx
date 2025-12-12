"use client";

import { ReactNode } from "react";

type FeatureSectionProps = {
  bgColor: string;
  title: string;
  description: ReactNode;
  reverse?: boolean;
  imageStyle?: string;
};

const FeatureSection = ({
  bgColor,
  title,
  description,
  reverse = false,
  imageStyle = "w-full max-w-[600px]",
}: FeatureSectionProps) => (
  <section className={`${bgColor} py-16 md:py-24`}>
    <div className="mx-auto max-w-7xl px-6">
      <div
        className={`flex flex-col items-center gap-8 md:gap-12 ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* 이미지 영역 */}
        <div className={`flex-1 ${imageStyle}`}>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
            {/* 추후 이미지가 들어갈 공간 */}
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              <span className="text-sm">이미지 영역</span>
            </div>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-1 flex-col justify-center gap-4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">{title}</h2>
          <div className="space-y-3 text-base text-gray-600 md:text-lg">{description}</div>
        </div>
      </div>
    </div>
  </section>
);

export default FeatureSection;
