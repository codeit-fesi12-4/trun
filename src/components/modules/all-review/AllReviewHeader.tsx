import CategoryShell from "@/components/common/CategoryShell";
import { ReviewFilterValues } from "@/types/review.type";
import AllReviewSort from "./AllReviewSort";
import LocationFilter from "@/components/common/LocationFilter";

type AllReviewHeaderProps = {
  filters: ReviewFilterValues;
  onFilterChange: (next: Partial<ReviewFilterValues>) => void;
  availableLocations?: string[];
};

const AllReviewHeader = ({ filters, onFilterChange, availableLocations }: AllReviewHeaderProps) => (
  <CategoryShell
    category={filters.type}
    onCategoryChange={type => onFilterChange({ type })}
    LocationSlot={
      <LocationFilter
        selectedLocation={filters.location}
        onLocationChange={location => onFilterChange({ location })}
        availableLocations={availableLocations}
      />
    }
    SortSlot={
      <AllReviewSort
        selectedSort={filters.sortBy}
        onSortChange={sortBy => onFilterChange({ sortBy })}
      />
    }
  />
);

export default AllReviewHeader;
