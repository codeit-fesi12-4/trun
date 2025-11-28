import MoimDetailInformation from "@/components/modules/moim-detail/MoimDetailInformation";
import MoimDetailReviewArea from "@/components/modules/moim-detail/MoimDetailReviewArea";

// interface IMoimDetailPage {
//   params: Promise<{
//     moimId: string;
//   }>;
// }

const MoimDetailPage = async () => (
  // const { moimId } = await params;
  <div className="flex flex-col gap-4">
    <MoimDetailInformation />
    <MoimDetailReviewArea />
  </div>
);

export default MoimDetailPage;
