import { MOIM_INFORMATION } from "@/constants/moimFakeData";
import MoimDetailImage from "./MoimDetailImage";
import MoimDetailSummary from "./MoimDetailSummary";

interface IMoimDetailInformation {
  moimId: string;
}

const MoimDetailInformation = ({ moimId }: IMoimDetailInformation) => {
  // 추후 실제 데이터로 변경
  const data = MOIM_INFORMATION;

  return (
    <div>
      <div className="flex w-full flex-col items-center gap-4 sm:h-60 sm:flex-row sm:justify-center md:h-[270px]">
        <MoimDetailImage moim={data} />
        <MoimDetailSummary moim={data} />
      </div>
      {moimId}
    </div>
  );
};

export default MoimDetailInformation;
