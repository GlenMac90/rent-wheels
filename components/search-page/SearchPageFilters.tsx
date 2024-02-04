"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

const carTypes = [
  {
    id: "sport",
    label: "Sport",
  },
  {
    id: "suv",
    label: "SUV",
  },
  {
    id: "mpv",
    label: "MPV",
  },
  {
    id: "sedan",
    label: "Sedan",
  },
  {
    id: "coupe",
    label: "Coupe",
  },
  {
    id: "hatchback",
    label: "Hatchback",
  },
];

const carCapacity = [
  {
    id: "2",
    label: "2 Persons",
  },
  {
    id: "4",
    label: "4 Persons",
  },
  {
    id: "6",
    label: "6 Persons",
  },
  {
    id: "8",
    label: "8 Persons or More",
  },
];

const searchFiltersSchema = z.object({
  carName: z.string().min(1).max(10),
  carType: z.array(z.string()),
  carCapacity: z.array(z.string()),
  carMaxPrice: z.number().min(1).max(1000).optional(),
});

type FormFields = z.infer<typeof searchFiltersSchema>;

const SearchPageFilters = () => {
  const form = useForm<FormFields>({
    resolver: zodResolver(searchFiltersSchema),
    defaultValues: {
      carType: [],
      carCapacity: [],
      carMaxPrice: 50,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  console.log(errors, "errors");

  const currentPrice = watch("carMaxPrice");

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="bg-white_gray-900 flex size-full max-w-[20rem] flex-col border-r border-r-white-100 p-6
        dark:border-r-gray-850"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="semibold-12 text-blue-100">SEARCH</h3>
        <div className="flex-center bg-white_gray-850 mt-7 flex h-12 w-full gap-4 rounded-ten border border-blue-50 px-3 dark:border-gray-800">
          <Image
            src="/search-large.svg"
            height={24}
            width={24}
            alt="Search icon"
            className="dark:grayscale dark:invert"
          />
          <input
            {...register("carName")}
            type="text"
            autoComplete="off"
            placeholder="Search by brand or title"
            className="bg-white_gray-850 text-gray-blue-100 w-full outline-none"
          />
        </div>
        <FormItem className="mt-14 flex flex-col">
          <FormLabel className="semibold-12 mb-7 text-blue-100">
            Car Type
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
        <FormItem className="mt-14 flex flex-col">
          <FormLabel className="semibold-12 mb-7 text-blue-100">
            Capacity
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
                          checked={field.value?.includes(capacity.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, capacity.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== capacity.id
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
        <FormItem className="mt-14 flex flex-col">
          <FormLabel className="semibold-12 mb-7 text-blue-100">
            Price
          </FormLabel>
          <Slider
            defaultValue={[50]}
            max={1000}
            step={1}
            className="w-full"
            onValueChange={(value) => setValue("carMaxPrice", value[0])}
          />
        </FormItem>
        <FormLabel className="semibold-12 mt-4 text-gray-700">
          Max Price: ${currentPrice}
        </FormLabel>
      </form>
    </Form>
  );
};

export default SearchPageFilters;
