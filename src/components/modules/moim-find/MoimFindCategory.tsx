"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MoimFindLocationFilter from "./MoimFindLocationFilter";
import MoimFindDatePicker from "./MoimFindDatePicker";
import MoimFindSort from "./MoimFindSort";
import Image from "next/image";

const MoimFindCategory = () => (
  <div className="flex h-[95px] flex-col sm:h-[53px] sm:flex-row sm:items-center sm:justify-between sm:border-b sm:border-gray-200">
    <Tabs defaultValue="달림핏">
      <TabsList className="flex w-full justify-between bg-transparent">
        <div className="flex w-full border-b border-gray-200 sm:border-0">
          <TabsTrigger
            value="달림핏"
            className="h-[53px] w-1/2 gap-2 bg-transparent! text-base font-semibold text-gray-500 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 data-[state=active]:shadow-none sm:text-xl"
          >
            <Image
              src="../icons/dallimfit.svg"
              alt="달림핏 아이콘"
              width={32}
              height={32}
              className="size-10"
            />
            달림핏
          </TabsTrigger>
          <TabsTrigger
            value="런케이션"
            className="h-[53px] w-1/2 gap-2 bg-transparent! text-base font-semibold text-gray-500 data-[state=active]:rounded-none data-[state=active]:border-x-0 data-[state=active]:border-t-0 data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 data-[state=active]:shadow-none sm:text-xl"
          >
            <Image
              src="../icons/runcation.svg"
              alt="런케이션 아이콘"
              width={40}
              height={40}
              className="sm:size-13"
            />
            런케이션
          </TabsTrigger>
        </div>
      </TabsList>
    </Tabs>
    <div className="mx-4 mt-8 flex flex-row sm:mt-0">
      <MoimFindLocationFilter />
      <MoimFindDatePicker />
      <MoimFindSort />
    </div>
  </div>
);

export default MoimFindCategory;
