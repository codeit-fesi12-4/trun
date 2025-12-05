import Image from "next/image";

const EmptyReview = () => (
  <div className="flex h-[250px] flex-col items-center justify-center">
    <Image src="../icons/img_empty.svg" alt="리뷰가 없습니다." width={120} height={115} />
    <div className="text-lg font-semibold text-gray-400">아직 리뷰가 없어요</div>
  </div>
);

export default EmptyReview;
