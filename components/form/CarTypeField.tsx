import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

import { FormRowContainer } from ".";
import { carTypes } from "@/constants";
import { UseFormSetValue } from "react-hook-form";

export type CarFieldType = {
  carTitle: string;
  carType: string;
  rentPrice: number;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  carDescription: string;
  images?: string[] | undefined;
};

const CarTypeField = ({
  errors,
  carType,
  setValue,
}: {
  errors?: string;
  carType?: string;
  setValue: UseFormSetValue<CarFieldType>;
}) => {
  return (
    <FormRowContainer label="Car Type" errors={errors}>
      <Popover>
        <PopoverTrigger>
          <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
            <span className="flex w-full text-gray-400">
              {carType ?? "Car Type"}
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
    </FormRowContainer>
  );
};

export default CarTypeField;
