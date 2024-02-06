import React from "react";
import Image from "next/image";

const Stars = ({ rating }: { rating: number }) => {
  const blankStars = 5 - rating;
  return (
    <div className="flex gap-1">
      {Array.from({ length: rating }).map((_, index) => (
        <div key={index} className="flex size-2.5 shrink-0 lg:size-4">
          <Image
            src="/gold-star.svg"
            height={16}
            width={16}
            alt="Star icon"
            className="size-full shrink-0"
          />
        </div>
      ))}
      {Array.from({ length: blankStars }).map((_, index) => (
        <div key={index} className="flex size-2.5 shrink-0 lg:size-4">
          <Image
            src="/blank-star.svg"
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
