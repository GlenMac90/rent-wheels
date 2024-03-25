"use client";

import React from "react";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

import { carTypes } from "@/constants";
import { CarTypeFiltersProps } from "@/types/searchpage.index";

const CarTypeFilters = ({ mobileFilters, types }: CarTypeFiltersProps) => {
  const [type, setType] = useURLQuery("type", "");

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
    <div className={`${!mobileFilters && "mt-14"}  flex flex-col`}>
      <label
        className={`${mobileFilters ? "mb-3" : "mb-7"} semibold-12  text-blue-100`}
      >
        TYPE
      </label>
      <div className="flex flex-col gap-2">
        {carTypes.map((type) => (
          <div className="flex items-center gap-2" key={type.id}>
            <input
              id={type.id}
              type="checkbox"
              onChange={(e) => setChange(e)}
              checked={types?.includes(type.id)}
              className="size-4"
            />
            <label className="text-gray-700_white-100 semibold-20">
              {type.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarTypeFilters;
