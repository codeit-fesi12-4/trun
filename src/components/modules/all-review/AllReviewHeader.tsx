import CategoryShell from "@/components/common/CategoryShell";
import { ReviewFilterValues } from "@/types/review.type";
import MoimFindLocationFilter from "@/components/modules/moim-find/MoimFindLocationFilter";
import AllReviewSort from "./AllReviewSort";

type AllReviewHeaderProps = {
  filters: ReviewFilterValues;
  onFilterChange: (next: ReviewFilterValues) => void;
  availableLocations?: string[];
};

const AllReviewHeader = ({ filters, onFilterChange, availableLocations }: AllReviewHeaderProps) => {
  const update = (next: Partial<ReviewFilterValues>) => onFilterChange({ ...filters, ...next });

  return (
    <CategoryShell
      category={filters.category}
      onCategoryChange={category => update({ category })}
      LocationSlot={
        <MoimFindLocationFilter
          selectedLocation={filters.location}
          onLocationChange={location => update({ location })}
          availableLocations={availableLocations}
        />
      }
      SortSlot={
        <AllReviewSort selectedSort={filters.sortBy} onSortChange={sortBy => update({ sortBy })} />
      }
    />
  );
};

export default AllReviewHeader;
