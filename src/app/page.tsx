import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

const page = () => (
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
);

export default page;
