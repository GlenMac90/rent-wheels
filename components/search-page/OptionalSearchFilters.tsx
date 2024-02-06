"use client";

import { FormItem, FormLabel, FormField, FormControl } from "../ui/form";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { carTypes, carCapacity } from "@/constants";
import { OptionalSearchFiltersProps } from "@/types/searchpage.index";

const OptionalSearchFilters = ({
  form,
  currentPrice,
  mobileFilters = false,
}: OptionalSearchFiltersProps) => {
  return (
    <>
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
                      <Checkbox
                        checked={field.value?.includes(type.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, type.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== type.id
                                )
                              );
                        }}
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
      <FormItem
        className={`${mobileFilters ? "mt-8" : "mt-14"}  flex flex-col`}
      >
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
                      <Checkbox
                        checked={field.value?.includes(capacity.id.toString())}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, capacity.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== capacity.id.toString()
                                )
                              );
                        }}
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
      <FormItem className={`${mobileFilters ? "mt-8" : "mt-14"} flex flex-col`}>
        <FormLabel
          className={`${mobileFilters ? "mb-3" : "mb-7"} semibold-12  text-blue-100`}
        >
          PRICE
        </FormLabel>
        <Slider
          defaultValue={currentPrice ? [currentPrice] : [50]}
          max={1000}
          step={1}
          className="w-full"
          onValueChange={(value) => form.setValue("carMaxPrice", value[0])}
        />
      </FormItem>
      <FormLabel className="semibold-12 mt-4 text-gray-700">
        Max Price: ${currentPrice}
      </FormLabel>
    </>
  );
};

export default OptionalSearchFilters;
