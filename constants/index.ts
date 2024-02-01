export const navBarLinks = [
  {
    name: "Home",
    icon: "/home-page.svg",
    path: "/",
  },
  {
    name: "Search",
    icon: "/search-page.svg",
    path: "/search",
  },
  {
    name: "Add Car",
    icon: "/add-car-page.svg",
    path: "/cars/new",
  },
];

export const searchBarStyles = {
  outerDivStyles: "flex w-full flex-col gap-3 relative",
  innerDivStyles: "flex w-full gap-2",
  inputDivStyles:
    "bg-white-200_gray-800 flex-between h-14 w-full rounded-md px-2.5",
  labelStyles: "semibold-14 md:semibold-16 text-gray-900_white",
  inputStyles:
    "bg-white-200_gray-800 outline-none w-full text-gray-400_white-200",
  placeholderStyles: "base-12 md:base-14 text-gray-400_white-200",
  errorMessageStyles:
    "base-12 text-red-500 md:absolute md:bottom-0 md:translate-y-5",
  calendarStyles:
    "bg-white_gray-900 m-[-2px] rounded-md border border-white-200 dark:border-gray-850",
};
