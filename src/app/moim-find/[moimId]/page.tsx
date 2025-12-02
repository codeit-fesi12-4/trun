import BottomFloatingBar from "@/components/modules/moim-detail/BottomFloatingBar";
import MoimDetailInformation from "@/components/modules/moim-detail/MoimDetailInformation";
import MoimDetailReviewArea from "@/components/modules/moim-detail/MoimDetailReviewArea";

const MoimDetailPage = async () => (
  <div className="flex flex-col gap-4">
    <MoimDetailInformation />
    <MoimDetailReviewArea />
    <BottomFloatingBar />
  </div>
);

export default MoimDetailPage;
