import MoimInformation from "@/components/modules/moim-detail/MoimInformation";

interface IMoimDetailPage {
  params: Promise<{
    moimId: string;
  }>;
}

const MoimDetailPage = async ({ params }: IMoimDetailPage) => {
  const { moimId } = await params;
  return (
    <div>
      <MoimInformation moimId={moimId} />
    </div>
  );
};
export default MoimDetailPage;
