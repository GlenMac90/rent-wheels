"use client";

import { useURLQuery } from "@/lib/hooks/useURLQuery";
import { Checkbox } from "../ui/checkbox";

import { carCapacity } from "@/constants";
import { CarTypeFiltersProps } from "@/types/searchpage.index";

const CarCapacityFilters = ({
  mobileFilters,
  capacities,
}: CarTypeFiltersProps) => {
  const [capacity, setCapacity] = useURLQuery("capacity", "");

  const setChange = ({
    checked,
    id,
  }: {
    checked: boolean | string;
    id: number;
  }) => {
    const capacityAsArray = capacity.split(",");
    const isChecked = checked;
    const targetType = id.toString();

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
            <Checkbox
              id={capacity.id.toString()}
              onCheckedChange={(checked) =>
                setChange({ checked, id: capacity.id })
              }
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
