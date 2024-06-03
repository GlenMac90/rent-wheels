"use client";

import { useState } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { DialogClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import { pickupDropoffSchema, PickupDropoffFields } from "@/schemas";
import { formatDate } from "@/utils";
import { CarModalScreenTwoProps } from "@/types/car.index";
import { createTransaction } from "@/lib/actions/transaction.actions";
import ArrowDownIcon from "../ArrowDownIcon";
import Button from "../Button";

const CarModalScreenTwo = ({ handleClose, carId }: CarModalScreenTwoProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedPickupDate, setSelectedPickupDate] =
    useState<string>("Select your date");
  const [selectedDropoffDate, setSelectedDropoffDate] =
    useState<string>("Select your date");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PickupDropoffFields>({
    resolver: zodResolver(pickupDropoffSchema),
  });

  const onSubmit: SubmitHandler<PickupDropoffFields> = async (data) => {
    try {
      const newTransaction = await createTransaction({
        rentalData: {
          carId,
          startDate: data.pickupDate,
          endDate: data.dropoffDate,
        },
      });
      if (newTransaction) {
        router.push(`/transaction/${newTransaction}`);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "There was a problem processing your request. Please try again.",
      });
      console.error(error);
    }
  };

  const handleDateSelect = (
    selectedDate: Date | undefined,
    fieldName: keyof PickupDropoffFields
  ) => {
    if (!selectedDate) return;
    setValue(fieldName, selectedDate);
    const formattedDate = formatDate(selectedDate);

    if (fieldName === "pickupDate") {
      setSelectedPickupDate(formattedDate);
    } else if (fieldName === "dropoffDate") {
      setSelectedDropoffDate(formattedDate);
    }
  };

  const pickupDate = watch("pickupDate");
  const dropoffDate = watch("dropoffDate");

  // Styles

  const calendarImagesStyles = "flex w-full flex-col gap-3 lg:gap-4";
  const popoverTriggerStyles =
    "flex-between bg-white-200_gray-800 text-gray-400_white-200 light-12 lg:light-14 h-12 w-full rounded-md px-2.5 xs:px-4 lg:h-14 lg:px-6";
  const labelStyles = "semibold-14 lg:semibold-16 text-gray-900_white";
  const calendarStyles =
    "bg-white_gray-900 m-[-2px] rounded-md border border-white-200 dark:border-gray-850";

  return (
    <div className="bg-white_gray-850 flex h-fit w-full max-w-[31.25rem] flex-col rounded-ten p-6 lg:p-10">
      {/* Form Title */}

      <div className="flex-between w-full">
        <div className="flex flex-col gap-2.5">
          <h3 className="semibold-18 lg:semibold-20 text-gray-900_white">
            Add Pickup & Drop-Off Info
          </h3>
          <span className="base-14 text-gray-400">Please enter your info</span>
        </div>

        {/* Close Button */}

        <DialogClose>
          <button onClick={handleClose} className="self-start">
            <Image
              src="/icons/close.svg"
              height={25}
              width={25}
              alt="button to close modal"
              className="shrink-0 dark:grayscale dark:invert"
            />
          </button>
        </DialogClose>
      </div>

      {/* Form */}

      <form
        className="mt-7 flex w-full flex-col gap-6 lg:mt-10 lg:gap-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3 lg:gap-4">
          {/* Location Label */}

          <div className="flex gap-1.5">
            <Image
              src="/icons/mark.svg"
              height={16}
              width={16}
              alt="search icon for location field"
              className="shrink-0"
            />
            <label className={labelStyles}>Pick-up Location</label>
          </div>

          {/* Location Field */}

          <div className="flex-center bg-white-200_gray-800 h-12 w-full rounded-md px-2.5 xs:px-4 lg:h-14 lg:px-6">
            <input
              className="bg-white-200_gray-800 placeholder:text-gray-400_white-200 placeholder:light-12 placeholder:lg:light-14 text-gray-400_white-200 light-12 lg:light-14 w-full text-gray-400 outline-none"
              placeholder="Location Address"
              type="text"
              autoComplete="off"
              {...register("location")}
            />
          </div>

          {/* Location Error Message */}

          {errors.location && (
            <span className="light-12 text-red-500">
              {errors.location.message}
            </span>
          )}
        </div>
        <div className="flex w-full gap-2.5">
          <div className={calendarImagesStyles}>
            {/* Pickup Date Label */}

            <div className="flex gap-1.5">
              <Image
                src="/icons/calendar.svg"
                height={16}
                width={16}
                alt="search icon for location field"
                className="shrink-0"
              />
              <label className={labelStyles}>Pick-Up Date</label>
            </div>

            {/* Pickup Date Field */}

            <Popover>
              <PopoverTrigger className={popoverTriggerStyles}>
                {selectedPickupDate}
                <ArrowDownIcon />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  disabled={(date) => date < new Date() || date >= dropoffDate}
                  selected={pickupDate}
                  onSelect={(selectedDate) =>
                    handleDateSelect(selectedDate, "pickupDate")
                  }
                  className={calendarStyles}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Pickup Date Error Message */}

            {errors.pickupDate && (
              <span className="light-12 text-red-500">Please pick a date</span>
            )}
          </div>
        </div>
        <div className="flex w-full gap-2.5">
          {/* Dropoff Date Label */}

          <div className={calendarImagesStyles}>
            <div className="flex gap-1.5">
              <Image
                src="/icons/calendar.svg"
                height={16}
                width={16}
                alt="search icon for location field"
                className="shrink-0"
              />
              <label className={labelStyles}>Drop-Off Date</label>
            </div>

            {/* Dropoff Date Field */}

            <Popover>
              <PopoverTrigger className={popoverTriggerStyles}>
                {selectedDropoffDate}
                <ArrowDownIcon />
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  disabled={(date) => date < new Date() || date <= pickupDate}
                  selected={dropoffDate}
                  onSelect={(selectedDate) =>
                    handleDateSelect(selectedDate, "dropoffDate")
                  }
                  className={calendarStyles}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Dropoff Date Error Message */}

            {errors.dropoffDate && (
              <span className="light-12 text-red-500">Please pick a date</span>
            )}
          </div>
        </div>
        <Button width="w-full" height="h-14" submit disabled={isSubmitting}>
          {isSubmitting ? "Renting..." : "Rent Now"}
        </Button>
      </form>
    </div>
  );
};

export default CarModalScreenTwo;
