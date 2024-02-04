"use client";

import { MouseEvent } from "react";
import { MobileSearchFiltersProps } from "@/types/searchpage.index";
import OptionalSearchFilters from "./OptionalSearchFilters";

const MobileSearchFilters = ({
  form,
  currentPrice,
  handleClose,
}: MobileSearchFiltersProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed z-10 flex h-screen max-h-screen w-screen justify-center overflow-auto bg-black/40 px-3 pb-[5.5rem] pt-28 dark:bg-black/10"
      onClick={handleClose}
    >
      <div
        className="bg-white_gray-850 mb-4 flex h-fit w-full max-w-lg flex-col overflow-scroll rounded-ten bg-white p-6"
        onClick={handleClick}
      >
        <OptionalSearchFilters
          form={form}
          currentPrice={currentPrice}
          mobileFilters
        />
      </div>
    </div>
  );
};

export default MobileSearchFilters;
