import Image from "next/image";

const MoimFavoriteHeader = () => (
  <div className="mt-2 mb-[35px] sm:mt-4 sm:mb-[57px] md:mb-[71px]">
    <div className="flex flex-row gap-3 sm:gap-[26px]">
      <Image
        src="../icons/img_favorite.svg"
        alt="찜한 모임 이미지"
        width={68}
        height={50}
        className="sm:h-[76px] sm:w-[102px]"
      />
      <div className="flex flex-col sm:gap-4">
        <h1 className="text-lg font-semibold text-gray-800 sm:text-[32px]">찜한 모임</h1>
        <p className="text-base font-medium text-gray-400 sm:text-xl">
          마감되기 전에 지금 바로 참여해보세요 👀
        </p>
      </div>
    </div>
  </div>
);

export default MoimFavoriteHeader;
