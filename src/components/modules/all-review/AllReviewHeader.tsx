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
  const onFilterchange = (next: Partial<ReviewFilterValues>) => {
    console.warn("next", next);

    return onFilterChange({ ...filters, ...next });
  };

  return (
    <CategoryShell
      category={filters.type}
      onCategoryChange={type => onFilterchange({ type })}
      LocationSlot={
        <LocationFilter
          selectedLocation={filters.location}
          onLocationChange={location => onFilterchange({ location })}
          availableLocations={availableLocations}
        />
      }
      SortSlot={
        <AllReviewSort
          selectedSort={filters.sortBy}
          onSortChange={sortBy => onFilterchange({ sortBy })}
        />
      }
    />
  );
};

export default AllReviewHeader;
