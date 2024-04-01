"use client";

import React from "react";
import { useURLQuery } from "@/lib/hooks/useURLQuery";
import { Checkbox } from "../ui/checkbox";

import { carTypes } from "@/constants";
import { CarTypeFiltersProps } from "@/types/searchpage.index";

const CarTypeFilters = ({ mobileFilters, types }: CarTypeFiltersProps) => {
  const [type, setType] = useURLQuery("type", "");

  const setChange = ({
    checked,
    id,
  }: {
    checked: boolean | string;
    id: string;
  }) => {
    const typeArray = type.split(",");
    const isChecked = checked;
    const targetType = id;

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
            <Checkbox
              id={type.id}
              onCheckedChange={(checked) => setChange({ checked, id: type.id })}
              checked={types?.includes(type.id)}
              className="size-4 cursor-pointer"
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
