import MoimDetailInformation from "@/components/modules/moim-detail/MoimDetailInformation";

interface IMoimDetailPage {
  params: Promise<{
    moimId: string;
  }>;
}

const MoimDetailPage = async ({ params }: IMoimDetailPage) => {
  const { moimId } = await params;
  return (
    <div>
      <MoimDetailInformation moimId={moimId} />
    </div>
  );
};
export default MoimDetailPage;
