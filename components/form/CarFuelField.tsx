import { UseFormSetValue } from "react-hook-form";
import { FormRowContainer } from ".";
import { CarFieldType } from "./CarTypeField";

const CarFuelField = ({
  errors,
  fuelCapacity,
  setValue,
}: {
  errors?: string;
  fuelCapacity?: number;
  setValue: UseFormSetValue<CarFieldType>;
}) => {
  return (
    <FormRowContainer label="Fuel Capacity" errors={errors}>
      <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
        <input
          autoComplete="off"
          onChange={(e) => setValue("fuelCapacity", Number(e.target.value))}
          type="number"
          className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
          value={fuelCapacity}
          placeholder="Fuel Capacity"
        />
      </div>
    </FormRowContainer>
  );
};

export default CarFuelField;
