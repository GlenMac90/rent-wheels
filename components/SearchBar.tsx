import Image from "next/image";

import Button from "./Button";

const styles = {
  outerDivStyles: "flex w-full flex-col gap-3",
  innerDivStyles: "flex w-full gap-2",
  inputDivStyles: "bg-white-200_gray-800 flex h-14 w-full rounded-md px-2.5",
  labelStyles: "semibold-14 md:semibold-16 text-gray-900_white",
  inputStyles: "bg-white-200_gray-800 outline-none",
};

const SearchBar = () => {
  return (
    <form className="bg-white-200_gray-900 md:bg-white_gray-850 flex w-full flex-col rounded-ten md:flex-row md:px-4 md:py-6">
      <div className="flex w-full flex-col gap-5 md:flex-row md:gap-4">
        <div className="bg-white_gray-850 flex w-full flex-col gap-5 rounded-ten px-3 py-5 md:flex-row md:gap-4 md:p-0">
          <div className={styles.outerDivStyles}>
            <div className={styles.innerDivStyles}>
              <Image
                src="/mark.svg"
                height={16}
                width={16}
                alt="Icon displaying the location input on the form"
              />
              <label className={styles.labelStyles}>Location</label>
            </div>
            <div className={styles.inputDivStyles}>
              <input
                placeholder="Select your location"
                className={styles.inputStyles}
              />
            </div>
          </div>
          <div className={styles.outerDivStyles}>
            <div className={styles.innerDivStyles}>
              <Image
                src="/calendar.svg"
                height={16}
                width={16}
                alt="Icon displaying the location input on the form"
              />
              <label className={styles.labelStyles}>Available From</label>
            </div>
            <div className={styles.inputDivStyles}>
              <input
                placeholder="Select your date"
                className={styles.inputStyles}
              />
            </div>
          </div>
          <div className={styles.outerDivStyles}>
            <div className={styles.innerDivStyles}>
              <Image
                src="/calendar.svg"
                height={16}
                width={16}
                alt="Icon displaying the location input on the form"
              />
              <label className={styles.labelStyles}>Available To</label>
            </div>
            <div className={styles.inputDivStyles}>
              <input
                placeholder="Select your date"
                className={styles.inputStyles}
              />
            </div>
          </div>
        </div>

        <Button
          width="w-full md:w-[4.625rem] lg:w-[10rem]"
          height="h-[3rem] md:h-[3.5rem]"
          className="gap-1.5 self-end"
        >
          <Image
            src="/search-icon.svg"
            height={14}
            width={14}
            alt="Search icon for search bar"
          />
          <span className="semibold-14 lg:medium-16 text-white md:hidden lg:flex">
            Search
          </span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
