"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import OptionalSearchFilters from "./OptionalSearchFilters";
import { FormFields, searchFiltersSchema } from "@/schemas";
import MobileSearchFilters from "./MobileSearchFilters";
import CarNameFilter from "./CarNameFilter";

const SearchPageFilters = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const form = useForm<FormFields>({
    resolver: zodResolver(searchFiltersSchema),
    defaultValues: {
      carType: [],
      carCapacity: [],
    },
  });
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setShowMobileFilters(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setShowMobileFilters(false);
  };

  console.log(errors, "errors");

  const currentPrice = watch("carMaxPrice");

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="bg-white_gray-900 sticky top-[5.75rem] z-20 flex size-full w-full flex-col border-b border-r border-b-blue-50/40 border-r-white-100 p-6 dark:border-b-gray-850 dark:border-r-gray-850 sm:top-[6.25rem] lg:max-w-[20rem] lg:overflow-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="semibold-12 hidden text-blue-100 lg:block">SEARCH</h3>
          <div className="flex gap-4 lg:pt-7">
            <CarNameFilter form={form} />
            <button
              className="flex-center size-12 shrink-0 rounded-ten border border-blue-500 lg:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Image
                src="/icons/filter.svg"
                height={24}
                width={24}
                alt="Image for the filter button"
                className="dark:grayscale dark:invert"
              />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-col">
            <OptionalSearchFilters
              form={form}
              currentPrice={currentPrice}
              mobileFilters={showMobileFilters}
            />
          </div>
        </form>
        {showMobileFilters && (
          <MobileSearchFilters
            mobileFilters={showMobileFilters}
            form={form}
            currentPrice={currentPrice}
            handleClose={handleClose}
          />
        )}
      </Form>
    </>
  );
};

export default SearchPageFilters;
