import { UseFormRegister } from "react-hook-form";
import { FormRowContainer } from ".";
import { CarTitleFieldProps } from "@/types/car.index";

const CarLocationField = ({
  errors,
  register,
  location,
}: {
  errors?: string;
  register: UseFormRegister<CarTitleFieldProps>;
  location?: string;
}) => {
  return (
    <FormRowContainer label="Location" errors={errors}>
      <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
        <input
          {...register("location")}
          autoComplete="off"
          type="text"
          className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
          value={location}
          placeholder="Location"
        />
      </div>
    </FormRowContainer>
  );
};

export default CarLocationField;
