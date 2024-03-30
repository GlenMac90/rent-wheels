import { UseFormRegister } from "react-hook-form";
import { FormRowContainer } from ".";
import { CarTitleFieldProps } from "./CarTitleField";

const CarDescriptionField = ({
  errors,
  register,
  carDescription,
}: {
  errors?: string;
  register: UseFormRegister<CarTitleFieldProps>;
  carDescription?: string;
}) => {
  return (
    <FormRowContainer label="Short Description" errors={errors}>
      <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
        <input
          {...register("carDescription")}
          autoComplete="off"
          type="text"
          className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
          value={carDescription}
          placeholder="Short Description"
        />
      </div>
    </FormRowContainer>
  );
};

export default CarDescriptionField;
