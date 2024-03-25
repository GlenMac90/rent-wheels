"use client";

import { FormItem, FormLabel } from "../ui/form";
import { CarTypeFiltersProps } from "@/types/searchpage.index";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

const CarMaxPriceFilter = ({ form, mobileFilters }: CarTypeFiltersProps) => {
  const [price, setPrice] = useURLQuery("maxPrice", "50", 200);

  return (
    <>
      <FormItem className={`${mobileFilters ? "mt-8" : "mt-14"} flex flex-col`}>
        <FormLabel
          className={`${mobileFilters ? "mb-3" : "mb-7"} semibold-12  text-blue-100`}
        >
          PRICE
        </FormLabel>
        <input
          {...form.register("carMaxPrice")}
          type="range"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormItem>
      <FormLabel className="semibold-12 mt-4 text-gray-700">
        Max Price: ${price}
      </FormLabel>
    </>
  );
};

export default CarMaxPriceFilter;
