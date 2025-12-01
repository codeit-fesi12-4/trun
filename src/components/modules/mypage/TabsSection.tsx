"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import MyMoimTab from "./MyMoimTab";
import MyReviewsTab from "./MyReviewsTab";
import CreatedMoimTab from "./CreatedMoimTab";

const TabsSection = () => (
  <Tabs defaultValue="myMoim" className="border-t-2 border-gray-900 bg-white px-4 py-6 md:px-6">
    <TabsList className="bg-transparen flex gap-3">
      <TabsTrigger
        value="myMoim"
        className="rounded-none border-0 border-transparent border-b-transparent bg-transparent p-0 text-center text-lg font-semibold text-gray-400 shadow-none hover:text-gray-900 focus:ring-0 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:text-black data-[state=active]:shadow-none"
      >
        나의 모임
      </TabsTrigger>
      <TabsTrigger
        value="myReviews"
        className="rounded-none border-0 border-transparent border-b-transparent bg-transparent p-0 text-center text-lg font-semibold text-gray-400 shadow-none hover:text-gray-900 focus:ring-0 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:text-black data-[state=active]:shadow-none"
      >
        나의 리뷰
      </TabsTrigger>
      <TabsTrigger
        value="createdMoim"
        className="rounded-none border-0 border-transparent border-b-transparent bg-transparent p-0 text-center text-lg font-semibold text-gray-400 shadow-none hover:text-gray-900 focus:ring-0 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:text-black data-[state=active]:shadow-none"
      >
        내가 만든 모임
      </TabsTrigger>
    </TabsList>

    <TabsContent value="myMoim" className="pt-3">
      <MyMoimTab />
    </TabsContent>
    <TabsContent value="myReviews" className="pt-3">
      <MyReviewsTab />
    </TabsContent>
    <TabsContent value="createdMoim" className="pt-3">
      <CreatedMoimTab />
    </TabsContent>
  </Tabs>
);

export default TabsSection;
