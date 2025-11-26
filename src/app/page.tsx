import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => (
  <>
    <Tabs className="">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="">Account</div>
      </TabsContent>
      <TabsContent value="password">
        <div className="">Password</div>
      </TabsContent>
    </Tabs>

    <div className="p-4">
      <h1 className="text-3xl font-bold text-orange-500">안녕하세요</h1>
      <p className="text-2xl font-semibold text-orange-800">본문 내용</p>
    </div>
  </>
);

export default page;
