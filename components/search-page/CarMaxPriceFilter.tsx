"use client";

import { CarPriceFilterProps } from "@/types/searchpage.index";
import { useURLQuery } from "@/lib/hooks/useURLQuery";
import { Slider } from "../ui/slider";

const CarMaxPriceFilter = ({
  mobileFilters,
  displayPrice,
  setDisplayPrice,
}: CarPriceFilterProps) => {
  const [price, setPrice] = useURLQuery("maxPrice", "400", 200);

  const handleChange = (price: number[]) => {
    const priceToString = price.toString();
    setDisplayPrice(priceToString);
    setPrice(priceToString);
  };

  return (
    <>
      <div className={`${mobileFilters ? "mt-8" : "mt-14"} flex flex-col`}>
        <label
          className={`${mobileFilters ? "mb-3" : "mb-7"} semibold-12  text-blue-100`}
        >
          PRICE
        </label>
        <Slider
          max={500}
          defaultValue={[+displayPrice] || [+price]}
          value={[+displayPrice] || [price]}
          onValueChange={handleChange}
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
