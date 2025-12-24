import MoimDetailInformation from "@/components/modules/moim-detail/MoimDetailInformation";
import MoimDetailReviewArea from "@/components/modules/moim-detail/MoimDetailReviewArea";

type MoimDetailPage = {
  params: Promise<{
    moimId: string;
  }>;
};

const MoimDetailPage = async ({ params }: MoimDetailPage) => {
  const { moimId } = await params;
  const numberMoimId = Number(moimId);

  return (
    <section className="flex flex-col gap-4">
      <MoimDetailInformation moimId={numberMoimId} />
      <MoimDetailReviewArea moimId={numberMoimId} />
    </section>
  );
};

export default MoimDetailPage;
