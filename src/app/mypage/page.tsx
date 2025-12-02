import ProfileSection from "@/components/modules/mypage/ProfileCard";
import TabsSection from "@/components/modules/mypage/TabsSection";

// Mock 유저
const TEST_USER_DATA = {
  id: 1,
  name: "낭만 러닝",
  companyName: "러닝 크루",
  email: "test1@test.com",
  image: "/icons/myprofile_edit.svg",
};

const Mypage = () => (
  <main className="flex flex-col gap-4">
    {/* 타이틀 */}
    <h1 className="text-lg font-semibold text-gray-900 md:text-2xl">마이페이지</h1>

    {/* 내 프로필 */}
    <ProfileSection
      name={TEST_USER_DATA.name}
      companyName={TEST_USER_DATA.companyName}
      email={TEST_USER_DATA.email}
      image={TEST_USER_DATA.image}
    />

    {/* 탭 영역*/}
    <TabsSection />
  </main>
);

export default Mypage;
