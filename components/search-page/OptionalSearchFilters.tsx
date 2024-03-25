"use client";

import { OptionalSearchFiltersProps } from "@/types/searchpage.index";
import CarTypeFilters from "./CarTypeFilters";
import CarCapacityFilters from "./CarCapacityFilters";
import CarMaxPriceFilter from "./CarMaxPriceFilter";

const OptionalSearchFilters = ({
  mobileFilters,
  urlValues,
}: OptionalSearchFiltersProps) => {
  const typeArray = urlValues?.type?.split(",") ?? [];
  const capacityArray = urlValues?.capacity?.split(",") ?? [];
  const maxPrice = urlValues?.maxPrice ?? "";

  return (
    <>
      <CarTypeFilters mobileFilters={mobileFilters} />
      <CarCapacityFilters mobileFilters={mobileFilters} />
      <CarMaxPriceFilter mobileFilters={mobileFilters} />
    </>
  );
};

export default OptionalSearchFilters;
