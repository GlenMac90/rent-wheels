"use client";

import { CarTypeFiltersProps } from "@/types/searchpage.index";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

const CarMaxPriceFilter = ({
  mobileFilters,
  maxPrice,
}: CarTypeFiltersProps) => {
  const [price, setPrice] = useURLQuery("maxPrice", "200", 200);

  return (
    <>
      <div className={`${mobileFilters ? "mt-8" : "mt-14"} flex flex-col`}>
        <label
          className={`${mobileFilters ? "mb-3" : "mb-7"} semibold-12  text-blue-100`}
        >
          PRICE
        </label>
        <input
          max={500}
          type="range"
          value={maxPrice}
          onChange={(e) => setPrice(e.target.value)}
          className="cursor-pointer"
        />
      </div>
      <label className="semibold-12 mt-4 text-gray-700">
        Max Price: ${price}
      </label>
    </>
  );
};

export default CarMaxPriceFilter;
