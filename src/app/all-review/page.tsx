import AllReviewContent from "@/components/modules/all-review/AllReviewContent";
import AllReviewHero from "@/components/modules/all-review/AllReviewHero";
import { Suspense } from "react";

const AllReview = () => (
  <section>
    <AllReviewHero />
    <Suspense fallback={null}>
      <AllReviewContent />
    </Suspense>
  </section>
);

export default AllReview;
