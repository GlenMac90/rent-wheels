"use client";

import React from "react";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

import { carTypes } from "@/constants";
import { FormItem, FormLabel, FormField, FormControl } from "../ui/form";
import { CarTypeFiltersProps } from "@/types/searchpage.index";

const CarTypeFilters = ({ mobileFilters, form }: CarTypeFiltersProps) => {
  const [type, setType] = useURLQuery("type", "");
  const typesArray = type.split(",");

  const setChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const typeArray = type.split(",");
    const isChecked = e.target.checked;
    const targetType = e.target.id;

    if (isChecked) {
      typeArray.push(targetType);
    } else {
      const index = typeArray.indexOf(targetType);
      typeArray.splice(index, 1);
    }

    const typeSet = Array.from(new Set(typeArray));
    setType(typeSet.join(","));
  };

  return (
    <FormItem className={`${!mobileFilters && "mt-14"}  flex flex-col`}>
      <FormLabel
        className={`${mobileFilters ? "mb-3" : "mb-7"} semibold-12  text-blue-100`}
      >
        TYPE
      </FormLabel>
      <div className="flex flex-col gap-2">
        {carTypes.map((type) => (
          <FormField
            key={type.id}
            control={form.control}
            name="carType"
            render={({ field }) => {
              return (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      id={type.id}
                      type="checkbox"
                      onChange={(e) => setChange(e)}
                      checked={typesArray.includes(type.id)}
                    />
                  </FormControl>
                  <FormLabel className="text-gray-700_white-100 semibold-20 -translate-y-1">
                    {type.label}
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

export default CarTypeFilters;
