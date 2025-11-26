import GatheringFilter from "./GatheringFilter";
import GetheringSort from "./GetheringSort";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const GetheringCategoryContent = () => (
  <div>
    <TabsContent value="달램핏">
      <Tabs defaultValue="all" className="w-fit">
        <TabsList className="flex w-full justify-between gap-[8px] bg-transparent">
          <TabsTrigger
            value="all"
            className="h-[40px] w-[57px] rounded-[12px] bg-gray-200 text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
          >
            전체
          </TabsTrigger>
          <TabsTrigger
            value="오피스 스트레칭"
            className="h-[40px] w-fit rounded-[12px] bg-gray-200 px-[15px] text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
          >
            오피스 스트레칭
          </TabsTrigger>
          <TabsTrigger
            value="마인드풀니스"
            className="h-[40px] w-fit rounded-[12px] bg-gray-200 px-[15px] text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
          >
            마인드풀니스
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </TabsContent>
    <TabsContent value="워케이션" />
    <div className="my-[16px] h-[2px] w-full bg-gray-200" />
    <div className="flex justify-between">
      <GatheringFilter />
      <GetheringSort />
    </div>
  </div>
);

export default GetheringCategoryContent;
