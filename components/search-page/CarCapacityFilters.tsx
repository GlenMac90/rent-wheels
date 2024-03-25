"use client";

import React from "react";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

import { carCapacity } from "@/constants";
import { CarTypeFiltersProps } from "@/types/searchpage.index";

const CarCapacityFilters = ({
  mobileFilters,
  capacities,
}: CarTypeFiltersProps) => {
  const [capacity, setCapacity] = useURLQuery("capacity", "");

  const setChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capacityAsArray = capacity.split(",");
    const isChecked = e.target.checked;
    const targetType = e.target.id;

    if (isChecked) {
      capacityAsArray.push(targetType);
    } else {
      const index = capacityAsArray.indexOf(targetType);
      capacityAsArray.splice(index, 1);
    }

    const typeSet = Array.from(new Set(capacityAsArray));
    setCapacity(typeSet.join(","));
  };

  return (
    <div className={`${mobileFilters ? "mt-8" : "mt-14"}  flex flex-col`}>
      <label
        className={`${mobileFilters ? "mb-3" : " mb-7"} semibold-12 text-blue-100`}
      >
        CAPACITY
      </label>
      <div className="flex flex-col gap-2">
        {carCapacity.map((capacity) => (
          <div className="flex items-center gap-2" key={capacity.id}>
            <input
              id={capacity.id.toString()}
              type="checkbox"
              onChange={(e) => setChange(e)}
              checked={capacities?.includes(capacity.id.toString())}
              className="size-4 cursor-pointer"
            />
            <label className="text-gray-700_white-100 semibold-20">
              {capacity.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCapacityFilters;
