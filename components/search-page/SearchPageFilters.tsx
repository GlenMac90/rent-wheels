"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  carType: z.array(z.string()).optional(),
  carCapacity: z.array(z.string()).optional(),
  carMaxPrice: z.number().min(1).max(1000).optional(),
});

type FormFields = z.infer<typeof searchFiltersSchema>;

const SearchPageFilters = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(searchFiltersSchema),
  });

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <form
      className="bg-white_gray-900 flex size-full max-w-[20rem] flex-col p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="semibold-12 text-blue-100">SEARCH</h3>
      <input
        {...register("carName")}
        type="text"
        autoComplete="off"
        placeholder="Search by brand or title"
      />
    </form>
  );
};

export default SearchPageFilters;
