"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import MyMoimTab from "./MyMoimTab";
import MyReviewsTab from "./MyReviewsTab";
import CreatedMoimTab from "./CreatedMoimTab";

const TabsSection = () => (
  <Tabs defaultValue="myMoim">
    <div className="flex w-full justify-start border-b">
      <TabsList className="bg-transparen w-full p-0 sm:w-auto">
        <TabsTrigger
          value="myMoim"
          className="flex-1 rounded-none border-0 border-transparent border-b-transparent bg-transparent p-0 pb-4 text-center text-sm font-semibold text-gray-600 shadow-none hover:text-green-600 focus:ring-0 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-b-green-600 data-[state=active]:text-green-600 data-[state=active]:shadow-none sm:min-w-40 sm:text-xl"
        >
          나의 모임
        </TabsTrigger>
        <TabsTrigger
          value="myReviews"
          className="flex-1 rounded-none border-0 border-transparent border-b-transparent bg-transparent p-0 pb-4 text-center text-sm font-semibold text-gray-600 shadow-none hover:text-green-600 focus:ring-0 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-b-green-600 data-[state=active]:text-green-600 data-[state=active]:shadow-none sm:min-w-40 sm:text-xl"
        >
          나의 리뷰
        </TabsTrigger>
        <TabsTrigger
          value="createdMoim"
          className="flex-1 rounded-none border-0 border-transparent border-b-transparent bg-transparent p-0 pb-4 text-center text-sm font-semibold text-gray-600 shadow-none hover:text-green-600 focus:ring-0 focus:outline-none data-[state=active]:border-b-2 data-[state=active]:border-b-green-600 data-[state=active]:text-green-600 data-[state=active]:shadow-none sm:min-w-40 sm:text-xl"
        >
          내가 만든 모임
        </TabsTrigger>
      </TabsList>
    </div>

    <div className="pt-3.5">
      <TabsContent value="myMoim">
        <MyMoimTab />
      </TabsContent>
      <TabsContent value="myReviews">
        <MyReviewsTab />
      </TabsContent>
      <TabsContent value="createdMoim">
        <CreatedMoimTab />
      </TabsContent>
    </div>
  </Tabs>
);

export default TabsSection;
