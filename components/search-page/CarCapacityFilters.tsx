"use client";

import React from "react";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

import { carCapacity } from "@/constants";
import { FormItem, FormLabel, FormField, FormControl } from "../ui/form";
import { CarTypeFiltersProps } from "@/types/searchpage.index";

const CarCapacityFilters = ({ form, mobileFilters }: CarTypeFiltersProps) => {
  const [capacity, setCapacity] = useURLQuery("capacity", "");
  const capacityArray = capacity?.split(",");

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
    <FormItem className={`${mobileFilters ? "mt-8" : "mt-14"}  flex flex-col`}>
      <FormLabel
        className={`${mobileFilters ? "mb-3" : " mb-7"} semibold-12 text-blue-100`}
      >
        CAPACITY
      </FormLabel>
      <div className="flex flex-col gap-2">
        {carCapacity.map((capacity) => (
          <FormField
            key={capacity.id}
            control={form.control}
            name="carCapacity"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      id={capacity.id.toString()}
                      type="checkbox"
                      onChange={(e) => setChange(e)}
                      checked={capacityArray.includes(capacity.id.toString())}
                    />
                  </FormControl>
                  <FormLabel className="text-gray-700_white-100 semibold-20 -translate-y-1">
                    {capacity.label}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
      </div>
    </FormItem>
  );
};

export default CarCapacityFilters;
