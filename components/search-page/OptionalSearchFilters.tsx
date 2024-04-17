"use client";

import { OptionalSearchFiltersProps } from "@/types/searchpage.index";
import { CarTypeFilters, CarCapacityFilters, CarMaxPriceFilter } from ".";

const OptionalSearchFilters = ({
  mobileFilters,
  urlValues,
  displayPrice,
  setDisplayPrice,
}: OptionalSearchFiltersProps) => {
  const typeArray = urlValues?.type?.split(",") ?? [];
  const capacityArray = urlValues?.capacity?.split(",") ?? [];

  return (
    <>
      <CarTypeFilters mobileFilters={mobileFilters} types={typeArray} />
      <CarCapacityFilters
        mobileFilters={mobileFilters}
        capacities={capacityArray}
      />
      <CarMaxPriceFilter
        mobileFilters={mobileFilters}
        displayPrice={displayPrice}
        setDisplayPrice={setDisplayPrice}
      />
    </>
  );
};

export default OptionalSearchFilters;
