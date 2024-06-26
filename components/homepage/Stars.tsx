import Image from "next/image";

const Stars = ({ rating }: { rating: number }) => {
  // display gold stars for rating and blank stars for the rest
  const blankStars = 5 - rating;
  return (
    <div className="flex gap-1">
      {/* Displaying gold stars in accordance to rating */}
      {Array.from({ length: rating }).map((_, index) => (
        <div key={index} className="flex size-2.5 shrink-0 lg:size-4">
          <Image
            src="/icons/gold-star.svg"
            height={16}
            width={16}
            alt="Star icon"
            className="size-full shrink-0"
          />
        </div>
      ))}
      {/* Displaying blank stars for the rest */}
      {Array.from({ length: blankStars }).map((_, index) => (
        <div key={index} className="flex size-2.5 shrink-0 lg:size-4">
          <Image
            src="/icons/blank-star.svg"
            height={16}
            width={16}
            alt="Star icon"
            className="size-full shrink-0"
          />
        </div>
      ))}
    </div>
  );
};

export default Stars;
