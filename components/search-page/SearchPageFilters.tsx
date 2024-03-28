"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

import OptionalSearchFilters from "./OptionalSearchFilters";
import MobileSearchFilters from "./MobileSearchFilters";
import CarNameFilter from "./CarNameFilter";

const SearchPageFilters = () => {
  const searchParams = useSearchParams();
  const maxPrice = searchParams.get("maxPrice");
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const capacity = searchParams.get("capacity");

  const [displayPrice, setDisplayPrice] = useState<string>(maxPrice || "250");

  const urlValues = {
    maxPrice,
    name,
    type,
    capacity,
  };

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setShowMobileFilters(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setShowMobileFilters(false);
  };

  return (
    <>
      <form className="bg-white_gray-900 sticky top-[5.75rem] z-20 flex w-full flex-col border-b border-r border-b-blue-50/40 border-r-white-100 p-6 dark:border-b-gray-850 dark:border-r-gray-850 sm:top-[6.25rem] lg:max-w-[20rem] lg:overflow-scroll">
        <h3 className="semibold-12 hidden text-blue-100 lg:block">SEARCH</h3>
        <div className="flex gap-4 lg:pt-7">
          <CarNameFilter />
          <button
            type="button"
            className="flex-center size-12 shrink-0 rounded-ten border border-blue-500 lg:hidden"
            onClick={() => setShowMobileFilters((prev) => !prev)}
          >
            <Image
              src="/icons/filter.svg"
              height={24}
              width={24}
              alt="Image for the filter button"
              className="dark:grayscale dark:invert"
            />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-col">
          <OptionalSearchFilters
            mobileFilters={showMobileFilters}
            displayPrice={displayPrice}
            setDisplayPrice={setDisplayPrice}
            urlValues={urlValues}
          />
        </div>
      </form>
      {showMobileFilters && (
        <MobileSearchFilters
          mobileFilters={showMobileFilters}
          handleClose={handleClose}
          displayPrice={displayPrice}
          setDisplayPrice={setDisplayPrice}
          urlValues={urlValues}
        />
      )}
    </>
  );
};

export default SearchPageFilters;
