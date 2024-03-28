"use client";

import { ChangeEvent } from "react";
import { CarPriceFilterProps } from "@/types/searchpage.index";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

const CarMaxPriceFilter = ({
  mobileFilters,
  displayPrice,
  setDisplayPrice,
}: CarPriceFilterProps) => {
  const [price, setPrice] = useURLQuery("maxPrice", "400", 200);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayPrice(e.target.value);
    setPrice(e.target.value);
  };

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
          value={displayPrice || price}
          onChange={handleChange}
          className="cursor-pointer"
        />
      </div>
      <label className="semibold-12 mt-4 text-gray-700">
        Max Price: ${displayPrice || price}
      </label>
    </>
  );
};

export default CarMaxPriceFilter;
