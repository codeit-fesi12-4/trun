import CategoryShell from "@/components/common/CategoryShell";
import { ReviewFilterValues } from "@/types/review.type";
import AllReviewSort from "./AllReviewSort";
import LocationFilter from "@/components/common/LocationFilter";

type AllReviewHeaderProps = {
  filters: ReviewFilterValues;
  onFilterChange: (next: ReviewFilterValues) => void;
  availableLocations?: string[];
};

const AllReviewHeader = ({ filters, onFilterChange, availableLocations }: AllReviewHeaderProps) => {
  const handleFilterChange = (next: Partial<ReviewFilterValues>) =>
    onFilterChange({ ...filters, ...next });

  return (
    <CategoryShell
      category={filters.type}
      onCategoryChange={type => handleFilterChange({ type })}
      LocationSlot={
        <LocationFilter
          selectedLocation={filters.location}
          onLocationChange={location => handleFilterChange({ location })}
          availableLocations={availableLocations}
        />
      }
      SortSlot={
        <AllReviewSort
          selectedSort={filters.sortBy}
          onSortChange={sortBy => handleFilterChange({ sortBy })}
        />
      }
    />
  );
};

export default AllReviewHeader;
