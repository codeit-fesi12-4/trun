import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const GroupSearchFilter = () => (
  <div className="mx-[10%]">
    <div className="mt-[50px] mb-[30px] flex flex-row gap-[16px]">
      <div className="h-[72px] w-[72px]">
        <Image src="icons/gethering.svg" alt="모임참여아이콘" width={100} height={100} />
      </div>
      <div className="flex flex-col justify-center gap-[8px]">
        <p className="text-sm font-medium text-gray-700">함께 할 사람이 없나요?</p>
        <h1 className="text-2sl font-semibold text-gray-900">지금 모임에 참여해보세요</h1>
      </div>
    </div>
    <div>
      <Tabs defaultValue="달램핏" className="w-[400px]">
        <TabsList className="gap-2 bg-transparent">
          <TabsTrigger
            value="달램핏"
            className="gap-[1px] px-[5px] py-[18px] text-lg font-semibold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-[2px] data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
            달램핏
            <Image
              src="icons/dalaemfit.svg"
              alt="달램핏아이콘"
              width={30}
              height={30}
              className="text-gray-400 data-[state=active]:text-gray-900"
            />
          </TabsTrigger>
          <TabsTrigger
            value="워케이션"
            className="gap-[1px] px-[5px] py-[18px] text-lg font-semibold text-gray-400 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-[2px] data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
          >
            워케이션
            <Image
              src="icons/workation.svg"
              alt="워케이션아이콘"
              width={30}
              height={30}
              className="text-gray-400 data-[state=active]:text-gray-900"
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="달램핏">달램핏 내용이다.</TabsContent>
        <TabsContent value="워케이션">워케이션 내용이다.</TabsContent>
      </Tabs>
    </div>
  </div>
);

export default GroupSearchFilter;
