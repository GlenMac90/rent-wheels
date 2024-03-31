import { UseFormSetValue } from "react-hook-form";
import { FormRowContainer } from ".";
import { CarFieldType } from "./CarTypeField";

const CarRentField = ({
  errors,
  rentPrice,
  setValue,
}: {
  errors?: string;
  rentPrice?: number;
  setValue: UseFormSetValue<CarFieldType>;
}) => {
  return (
    <FormRowContainer label="Rent Price" errors={errors}>
      <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
        <input
          autoComplete="off"
          type="number"
          className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
          value={rentPrice}
          onChange={(e) => setValue("rentPrice", Number(e.target.value))}
          placeholder="Price in dollars"
        />
      </div>
    </FormRowContainer>
  );
};

export default CarRentField;
