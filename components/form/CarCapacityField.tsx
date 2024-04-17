import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { PopoverClose } from "@radix-ui/react-popover";

import { FormRowContainer } from ".";
import { carCapacity } from "@/constants";
import { UseFormSetValue } from "react-hook-form";
import { CarFieldType } from "@/types/car.index";

const CarCapacityField = ({
  errors,
  capacity,
  setValue,
}: {
  errors?: string;
  capacity?: number;
  setValue: UseFormSetValue<CarFieldType>;
}) => {
  return (
    <FormRowContainer label="Capacity" errors={errors}>
      <Popover>
        <PopoverTrigger>
          <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
            <span className="flex w-full text-gray-400">
              {capacity ? `${capacity} Persons` : "Car Capacity"}
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
    </FormRowContainer>
  );
};

export default CarCapacityField;
