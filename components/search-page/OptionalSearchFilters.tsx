"use client";

import { OptionalSearchFiltersProps } from "@/types/searchpage.index";
import CarTypeFilters from "./CarTypeFilters";
import CarCapacityFilters from "./CarCapacityFilters";
import CarMaxPriceFilter from "./CarMaxPriceFilter";

const OptionalSearchFilters = ({
  form,
  mobileFilters,
}: OptionalSearchFiltersProps) => {
  return (
    <>
      <CarTypeFilters mobileFilters={mobileFilters} form={form} />
      <CarCapacityFilters mobileFilters={mobileFilters} form={form} />
      <CarMaxPriceFilter mobileFilters={mobileFilters} form={form} />
    </>
  );
};

export default OptionalSearchFilters;
