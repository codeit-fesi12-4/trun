"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewWritableList from "./ReviewWritableList";
import ReviewWrittenList from "./ReviewWrittenList";

const MyReviewsTab = () => (
  <div className="flex flex-col gap-6">
    {/* 하위 Tabs */}
    <Tabs defaultValue="작성 가능한 리뷰">
      <TabsList className="flex gap-2 bg-transparent">
        <TabsTrigger
          value="작성 가능한 리뷰"
          className="h-9 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
        >
          내가 작성한 리뷰
        </TabsTrigger>
        <TabsTrigger
          value="작성한 리뷰"
          className="h-9 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white"
        >
          작성한 리뷰
        </TabsTrigger>
      </TabsList>

      <TabsContent value="작성 가능한 리뷰" className="pt-4">
        <ReviewWritableList />
      </TabsContent>
      <TabsContent value="작성한 리뷰" className="pt-4">
        <ReviewWrittenList />
      </TabsContent>
    </Tabs>
  </div>
);

export default MyReviewsTab;
