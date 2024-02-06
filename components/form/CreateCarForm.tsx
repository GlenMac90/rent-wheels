"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

import Button from "../Button";
import { carFormSchema, CarFormFields } from "@/schemas";
import { carTypes, carCapacity, carTransmission } from "@/constants";
import { PopoverClose } from "@radix-ui/react-popover";

const rowStyles = "flex flex-col gap-6 md:flex-row md:gap-8 mt-6";
const labelInputContainerStyles =
  "flex w-full flex-col gap-2.5 md:gap-4 relative";
const labelStyles = "semibold-14 md:semibold-16 text-gray-900_white";
const inputStyles =
  "flex items-center w-full rounded-md bg-white-200_gray-800 h-12 md:h-14 px-4 md:px-6";
const errorMessageStyles = "absolute text-red-500 light-14 -bottom-5";

const CreateCarForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CarFormFields>({
    resolver: zodResolver(carFormSchema),
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<CarFormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      className="bg-white_gray-850 w-full max-w-[53.25rem] rounded-ten p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="semibold-20 text-gray-900_white">Add a Car for Rent</h3>
      <span className="base-14 mt-2.5 flex text-gray-400">
        Please enter your car info
      </span>
      <h4 className="extrabold-18 mt-9 text-blue-300">CAR INFO</h4>
      <div className={rowStyles}>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>Car Title</label>
          <div className={inputStyles}>
            <input
              {...register("carTitle")}
              autoComplete="off"
              type="text"
              className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
              value={formValues.carTitle}
              placeholder="Car Title"
            />
          </div>
          {errors.carTitle && (
            <span className={errorMessageStyles}>
              {errors.carTitle.message}
            </span>
          )}
        </div>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>Car Type</label>
          <Popover>
            <PopoverTrigger>
              <div className={inputStyles}>
                <span className="flex w-full text-gray-400">
                  {formValues.carType ?? "Car Type"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="border-0 p-0">
              <Command className="bg-white-200_gray-800">
                <CommandGroup>
                  {carTypes.map((type) => {
                    return (
                      <CommandItem
                        key={type.id}
                        value={type.label}
                        onSelect={() => setValue("carType", type.label)}
                      >
                        <PopoverClose className="flex w-full">
                          {type.label}
                        </PopoverClose>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.carType && (
            <span className={errorMessageStyles}>{errors.carType.message}</span>
          )}
        </div>
      </div>
      <div className={rowStyles}>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>Rent Price</label>
          <div className={inputStyles}>
            <input
              autoComplete="off"
              type="number"
              className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
              value={formValues.rentPrice}
              onChange={(e) => setValue("rentPrice", Number(e.target.value))}
              placeholder="Price in dollars"
            />
          </div>
          {errors.rentPrice && (
            <span className={errorMessageStyles}>
              {errors.rentPrice.message}
            </span>
          )}
        </div>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>Capacity</label>
          <Popover>
            <PopoverTrigger>
              <div className={inputStyles}>
                <span className="flex w-full text-gray-400">
                  {formValues.capacity
                    ? `${formValues.capacity} Persons`
                    : "Car Capacity"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="border-0 p-0">
              <Command className="bg-white-200_gray-800">
                <CommandGroup>
                  {carCapacity.map((capacity) => {
                    return (
                      <CommandItem
                        key={capacity.id}
                        value={capacity.label}
                        onSelect={() => setValue("capacity", capacity.id)}
                      >
                        <PopoverClose className="flex w-full">
                          {capacity.label}
                        </PopoverClose>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.capacity && (
            <span className={errorMessageStyles}>
              {errors.capacity.message}
            </span>
          )}
        </div>
      </div>
      <div className={rowStyles}>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>Transmission</label>
          <Popover>
            <PopoverTrigger>
              <div className={inputStyles}>
                <span className="flex w-full text-gray-400">
                  {formValues.transmission
                    ? `${formValues.transmission}`
                    : "Transmission"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="border-0 p-0">
              <Command className="bg-white-200_gray-800">
                <CommandGroup>
                  {carTransmission.map((transmission) => {
                    return (
                      <CommandItem
                        key={transmission.id}
                        value={transmission.label}
                        onSelect={() =>
                          setValue("transmission", transmission.id)
                        }
                      >
                        <PopoverClose className="flex w-full">
                          {transmission.label}
                        </PopoverClose>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.transmission && (
            <span className={errorMessageStyles}>
              {errors.transmission.message}
            </span>
          )}
        </div>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>Location</label>
          <div className={inputStyles}>
            <input
              {...register("location")}
              autoComplete="off"
              type="text"
              className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
              value={formValues.location}
              placeholder="Location"
            />
          </div>
          {errors.location && (
            <span className={errorMessageStyles}>
              {errors.location.message}
            </span>
          )}
        </div>
      </div>
      <div className={rowStyles}>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>Fuel Capacity</label>
          <div className={inputStyles}>
            <input
              autoComplete="off"
              onChange={(e) => setValue("fuelCapacity", Number(e.target.value))}
              type="number"
              className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
              value={formValues.fuelCapacity}
              placeholder="Fuel Capacity"
            />
          </div>
          {errors.fuelCapacity && (
            <span className={errorMessageStyles}>
              {errors.fuelCapacity.message}
            </span>
          )}
        </div>
        <div className={labelInputContainerStyles}>
          <label className={labelStyles}>ShortDescription</label>
          <div className={inputStyles}>
            <input
              {...register("carDescription")}
              autoComplete="off"
              type="text"
              className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
              value={formValues.carDescription}
              placeholder="Short Description"
            />
          </div>
          {errors.carDescription && (
            <span className={errorMessageStyles}>
              {errors.carDescription.message}
            </span>
          )}
        </div>
      </div>
      <Button width="w-full md:w-32" height="h-12" className="mt-8" submit>
        Register Car
      </Button>
    </form>
  );
};

export default CreateCarForm;
