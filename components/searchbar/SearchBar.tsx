"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

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

import Button from "../Button";
import ArrowDownIcon from "../ArrowDownIcon";
import { formatDate, formatUrlDate } from "@/utils";
import { searchBarSchema } from "@/schemas";

export const searchBarStyles = {
  outerDivStyles: "flex w-full flex-col gap-3 relative",
  innerDivStyles: "flex w-full gap-2",
  inputDivStyles:
    "bg-white-200_gray-800 flex-between h-14 w-full rounded-md px-2.5",
  labelStyles: "semibold-14 md:semibold-16 text-gray-900_white",
  inputStyles:
    "bg-white-200_gray-800 outline-none w-full text-gray-400_white-200 placeholder:base-12 placeholder:md:base-14 placeholder:text-gray-400_white-200",
  placeholderStyles: "base-12 md:base-14 text-gray-400_white-200",
  errorMessageStyles:
    "base-12 text-red-500 md:absolute md:bottom-0 md:translate-y-4",
  calendarStyles:
    "bg-white_gray-900 m-[-2px] rounded-md border border-white-200 dark:border-gray-850",
};

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

const SearchBar = ({ searchPage }: { searchPage?: boolean }) => {
  const [searchBarQuery, setSearchBarQuery] = useURLQuery("dateRange", "");
  const parsedQuery = searchBarQuery.split("-");
  const queryIsValid = parsedQuery.length === 3;
  const router = useRouter();

  const initialData = {
    location: queryIsValid ? parsedQuery[2] : "",
    availableFrom: queryIsValid ? formatUrlDate(parsedQuery[0]) : new Date(),
    availableTo: queryIsValid ? formatUrlDate(parsedQuery[1]) : undefined,
  };

  const [selectedFromDate, setSelectedFromDate] = useState<string>("");
  const [selectedToDate, setSelectedToDate] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      location: initialData.location,
      availableFrom: initialData.availableFrom,
      availableTo: initialData.availableTo,
    },
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
    const formattedFrom = formatDate(availableFrom);
    const formattedTo = formatDate(availableTo);
    if (searchPage) {
      setSearchBarQuery(`${formattedFrom}-${formattedTo}-${location}`);
    } else {
      router.push(
        `/search?maxPrice=400&?dateRange=${formattedFrom}-${formattedTo}-${location}`
      );
    }
  };

  return (
    <div className={`flex w-full ${!searchPage && "px-6 pb-6"}`}>
      <form
        className="bg-white-200_gray-900 md:bg-white_gray-850 flex w-full flex-col rounded-ten shadow-md md:flex-row md:px-4 md:py-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={`flex w-full flex-col gap-5  md:gap-4 ${searchPage ? "xl:flex-row" : "md:flex-row"}`}
        >
          <div
            className={`bg-white_gray-850 flex w-full flex-col gap-5 rounded-ten px-3 py-5  md:gap-4 md:p-0 ${searchPage ? "xl:flex-row" : "md:flex-row"}`}
          >
            <div
              className={`${outerDivStyles} ${searchPage ? "xl:w-1/3" : "md:w-1/3"}`}
            >
              <div className={innerDivStyles}>
                <Image
                  src="/icons/mark.svg"
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
                  className={inputStyles}
                />
                <ArrowDownIcon />
              </div>
              {errors.location && (
                <span className={errorMessageStyles}>
                  {errors.location.message}
                </span>
              )}
            </div>
            <div
              className={`flex w-full flex-col gap-5 md:flex-row md:gap-4 ${searchPage ? "xl:w-2/3" : "md:w-2/3"}`}
            >
              <div className={outerDivStyles}>
                <div className={innerDivStyles}>
                  <Image
                    src="/icons/calendar.svg"
                    height={16}
                    width={16}
                    alt="Icon displaying the location input on the form"
                  />
                  <label className={labelStyles}>Available From</label>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <div className={inputDivStyles}>
                      <span className={placeholderStyles}>
                        {selectedFromDate ||
                          parsedQuery[0] ||
                          "Select your date"}
                      </span>
                      <ArrowDownIcon />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      className={calendarStyles}
                      mode="single"
                      disabled={(date) =>
                        date < new Date() || date >= availableTo
                      }
                      selected={availableFrom ?? initialData.availableFrom}
                      onSelect={(selectedDate) =>
                        handleDateSelect(selectedDate, "availableFrom")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.availableFrom && !availableFrom && (
                  <span className={errorMessageStyles}>
                    Please select a date
                  </span>
                )}
              </div>
              <div className={outerDivStyles}>
                <div className={innerDivStyles}>
                  <Image
                    src="/icons/calendar.svg"
                    height={16}
                    width={16}
                    alt="Icon displaying the location input on the form"
                  />
                  <label className={labelStyles}>Available To</label>
                </div>
                <Popover>
                  <PopoverTrigger>
                    <div className={inputDivStyles}>
                      <span className={placeholderStyles}>
                        {selectedToDate || parsedQuery[1] || "Select your date"}
                      </span>
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
                      selected={availableTo ?? initialData.availableTo}
                      onSelect={(selectedDate) =>
                        handleDateSelect(selectedDate, "availableTo")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.availableTo && !availableTo && (
                  <span className={errorMessageStyles}>
                    Please select a date
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            width={`w-full ${searchPage ? "xl:w-[10rem]" : "md:w-[4.625rem] lg:w-[10rem]"} `}
            height="h-[3rem] md:h-[3.5rem]"
            className="gap-1.5 self-end rounded-md"
            submit
          >
            <Image
              src="/icons/search-icon.svg"
              height={14}
              width={14}
              alt="Search icon for search bar"
            />
            <span
              className={`semibold-14 lg:medium-16 text-white  ${searchPage ? "flex" : "md:hidden lg:flex"}`}
            >
              Search
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
