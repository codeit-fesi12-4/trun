import BottomFloatingBar from "@/components/modules/moim-detail/BottomFloatingBar";
import MoimDetailInformation from "@/components/modules/moim-detail/MoimDetailInformation";
import MoimDetailReviewArea from "@/components/modules/moim-detail/MoimDetailReviewArea";

type MoimDetailPage = {
  params: Promise<{
    moimId: string;
  }>;
};

const MoimDetailPage = async ({ params }: MoimDetailPage) => {
  const { moimId } = await params;

  return (
    <div className="flex flex-col gap-4">
      <MoimDetailInformation moimId={moimId} />
      <MoimDetailReviewArea />
      <BottomFloatingBar />
    </div>
  );
};

export default MoimDetailPage;
