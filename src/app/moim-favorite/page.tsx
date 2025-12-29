import MoimFavoriteClient from "@/components/modules/moim-favorite/MoimFavoriteClient";
import { Suspense } from "react";

const MoimFavoritePage = () => (
  <Suspense fallback={null}>
    <MoimFavoriteClient />
  </Suspense>
);

export default MoimFavoritePage;
