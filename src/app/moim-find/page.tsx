import MoimFindClient from "@/components/modules/moim-find/MoimFindClient";
import { Suspense } from "react";

const MoimFindPage = () => (
  <Suspense fallback={null}>
    <MoimFindClient />
  </Suspense>
);

export default MoimFindPage;
