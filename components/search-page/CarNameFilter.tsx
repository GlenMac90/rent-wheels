"use client";

import { useURLQuery } from "@/lib/hooks/useURLQuery";
import Image from "next/image";

const CarNameFilter = () => {
  const [searchValue, setSearchValue] = useURLQuery("name", "", 500);

  return (
    <div className="flex-center bg-white_gray-850 flex h-12 w-full gap-4 rounded-ten border border-blue-50 px-3 dark:border-gray-800">
      <Image
        src="/icons/search-large.svg"
        height={24}
        width={24}
        alt="Search icon"
        className="dark:grayscale dark:invert"
      />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        autoComplete="off"
        placeholder="Search by brand or title"
        className="bg-white_gray-850 text-gray-blue-100 w-full outline-none"
      />
    </div>
  );
};

export default CarNameFilter;
