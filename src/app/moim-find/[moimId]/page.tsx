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
    <section className="flex flex-col gap-4">
      <MoimDetailInformation moimId={moimId} />
      <MoimDetailReviewArea moimId={moimId} />
    </section>
  );
};

export default MoimDetailPage;
