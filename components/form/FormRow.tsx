import { ReactNode } from "react";

const FormRow = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-6 flex flex-col gap-6 md:flex-row md:gap-8">
      {children}
    </div>
  );
};

export default FormRow;
