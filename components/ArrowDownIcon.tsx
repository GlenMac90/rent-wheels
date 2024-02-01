import Image from "next/image";

const ArrowDownIcon = () => {
  return (
    <Image
      src="/arrow-down.svg"
      height={14}
      width={14}
      alt="arrow down icon for the date picker"
      className="dark:grayscale dark:invert"
    />
  );
};

export default ArrowDownIcon;
