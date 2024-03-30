import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { PopoverClose } from "@radix-ui/react-popover";

import { FormRowContainer } from ".";
import { carTransmission } from "@/constants";
import { UseFormSetValue } from "react-hook-form";
import { CarFieldType } from "./CarTypeField";

const CarTransmissionField = ({
  errors,
  transmission,
  setValue,
}: {
  errors?: string;
  transmission?: string;
  setValue: UseFormSetValue<CarFieldType>;
}) => {
  return (
    <FormRowContainer label="Transmission" errors={errors}>
      <Popover>
        <PopoverTrigger>
          <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
            <span className="flex w-full text-gray-400">
              {transmission ? `${transmission}` : "Transmission"}
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
                    onSelect={() => setValue("transmission", transmission.id)}
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
    </FormRowContainer>
  );
};

export default CarTransmissionField;
