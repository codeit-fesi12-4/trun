import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MoimFindCategoryContent = () => {
  const items = ["전체", "오피스 스트레칭", "마인드풀니스"];

  return (
    <div className="h-10">
      <TabsContent value="달림핏">
        <Tabs defaultValue="전체" className="w-fit">
          <TabsList className="flex w-full justify-between gap-2 bg-transparent">
            {items.map(item => (
              <li key={item} className="list-none">
                <TabsTrigger
                  value={item}
                  className="h-9 w-fit rounded-[12px] bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white sm:h-10 sm:px-4 sm:py-2.5"
                >
                  {item}
                </TabsTrigger>
              </li>
            ))}
          </TabsList>
        </Tabs>
      </TabsContent>
      <TabsContent value="런케이션" />
    </div>
  );
};

export default MoimFindCategoryContent;
