import { ReactNode } from "react";

const FormRowContainer = ({
  children,
  label,
  errors,
}: {
  children: ReactNode;
  label: string;
  errors?: string;
}) => {
  return (
    <div className="relative flex w-full flex-col gap-2.5 md:gap-4">
      <label className="semibold-14 md:semibold-16 text-gray-900_white">
        {label}
      </label>
      {children}
      {errors && (
        <span className="light-14 absolute -bottom-5 text-red-500">
          {errors}
        </span>
      )}
    </div>
  );
};

export default FormRowContainer;
