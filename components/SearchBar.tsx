"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Button from "./Button";
import ArrowDownIcon from "./ArrowDownIcon";
import { formatDate } from "@/utils";
import { searchBarSchema } from "@/schemas";
import { searchBarStyles } from "@/constants";

type FormFields = z.infer<typeof searchBarSchema>;

const {
  outerDivStyles,
  innerDivStyles,
  inputDivStyles,
  labelStyles,
  inputStyles,
  placeholderStyles,
  errorMessageStyles,
  calendarStyles,
} = searchBarStyles;

const SearchBar = () => {
  const [selectedFromDate, setSelectedFromDate] =
    useState<string>("Select your date");
  const [selectedToDate, setSelectedToDate] =
    useState<string>("Select your date");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(searchBarSchema),
  });

  const availableFrom = watch("availableFrom");
  const availableTo = watch("availableTo");

  const handleDateSelect = (
    selectedDate: Date | undefined,
    fieldName: keyof FormFields
  ) => {
    if (!selectedDate) return;
    setValue(fieldName, selectedDate);
    const formattedDate = formatDate(selectedDate);

    if (fieldName === "availableFrom") {
      setSelectedFromDate(formattedDate);
    } else if (fieldName === "availableTo") {
      setSelectedToDate(formattedDate);
    }
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const { location, availableFrom, availableTo } = data;
    console.log(location, availableFrom, availableTo);
  };

  return (
    <form
      className="bg-white-200_gray-900 md:bg-white_gray-850 flex w-full flex-col rounded-ten md:flex-row md:px-4 md:py-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-5 md:flex-row md:gap-4">
        <div className="bg-white_gray-850 flex w-full flex-col gap-5 rounded-ten px-3 py-5 md:flex-row md:gap-4 md:p-0">
          <div className={outerDivStyles}>
            <div className={innerDivStyles}>
              <Image
                src="/mark.svg"
                height={16}
                width={16}
                alt="Icon displaying the location input on the form"
              />
              <label className={labelStyles}>Location</label>
            </div>
            <div className={inputDivStyles}>
              <input
                type="text"
                autoComplete="off"
                {...register("location")}
                placeholder="Select your location"
                className={`${inputStyles} placeholder:base-12 placeholder:md:base-14 placeholder:text-gray-400_white-200`}
              />
              <ArrowDownIcon />
            </div>
            {errors.location && (
              <span className={errorMessageStyles}>
                {errors.location.message}
              </span>
            )}
          </div>
          <div className={outerDivStyles}>
            <div className={innerDivStyles}>
              <Image
                src="/calendar.svg"
                height={16}
                width={16}
                alt="Icon displaying the location input on the form"
              />
              <label className={labelStyles}>Available From</label>
            </div>
            <Popover>
              <PopoverTrigger>
                <div className={inputDivStyles}>
                  <span className={placeholderStyles}>{selectedFromDate}</span>
                  <ArrowDownIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  className={calendarStyles}
                  mode="single"
                  disabled={(date) => date < new Date() || date >= availableTo}
                  selected={availableFrom}
                  onSelect={(selectedDate) =>
                    handleDateSelect(selectedDate, "availableFrom")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.availableFrom && !availableFrom && (
              <span className={errorMessageStyles}>Please select a date</span>
            )}
          </div>
          <div className={outerDivStyles}>
            <div className={innerDivStyles}>
              <Image
                src="/calendar.svg"
                height={16}
                width={16}
                alt="Icon displaying the location input on the form"
              />
              <label className={labelStyles}>Available To</label>
            </div>
            <Popover>
              <PopoverTrigger>
                <div className={inputDivStyles}>
                  <span className={placeholderStyles}>{selectedToDate}</span>
                  <ArrowDownIcon />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  className={calendarStyles}
                  mode="single"
                  disabled={(date) =>
                    date < new Date() || date <= availableFrom
                  }
                  selected={availableTo}
                  onSelect={(selectedDate) =>
                    handleDateSelect(selectedDate, "availableTo")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.availableTo && !availableTo && (
              <span className={errorMessageStyles}>Please select a date</span>
            )}
          </div>
        </div>

        <Button
          width="w-full md:w-[4.625rem] lg:w-[10rem]"
          height="h-[3rem] md:h-[3.5rem]"
          className="gap-1.5 self-end"
          submit
        >
          <Image
            src="/search-icon.svg"
            height={14}
            width={14}
            alt="Search icon for search bar"
          />
          <span className="semibold-14 lg:medium-16 text-white md:hidden lg:flex">
            Search
          </span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
