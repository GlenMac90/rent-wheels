import { UseFormRegister } from "react-hook-form";
import { FormRowContainer } from ".";

export type CarTitleFieldProps = {
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

const CarTitleField = ({
  errors,
  register,
  carTitle,
}: {
  errors?: string;
  register: UseFormRegister<CarTitleFieldProps>;
  carTitle?: string;
}) => {
  return (
    <FormRowContainer label="Car Title" errors={errors}>
      <div className="bg-white-200_gray-800 flex h-12 w-full items-center rounded-md px-4 md:h-14 md:px-6">
        <input
          {...register("carTitle")}
          autoComplete="off"
          type="text"
          className="bg-white-200_gray-800 flex w-full text-gray-400 outline-none"
          value={carTitle}
          placeholder="Car Title"
        />
      </div>
    </FormRowContainer>
  );
};

export default CarTitleField;
