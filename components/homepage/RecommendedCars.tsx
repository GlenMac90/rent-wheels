"use client";

import { useState } from "react";

import CarCard from "./CarCard";
import Button from "../Button";

const RecommendedCars = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="flex w-full flex-col gap-5">
      <h3 className="semibold-14 md:semibold-16 text-gray-400">
        Recommended Cars
      </h3>
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: showMore ? 12 : 4 }, (_, index) => (
          <CarCard key={index} />
        ))}
      </div>
      <Button
        height="h-9 md:h-14"
        width="w-[7.5rem] md:w-[14.25rem]"
        className="semibold-12 md:semibold-16 mt-8 self-center"
        handleClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show Fewer Cars" : "Show More Cars"}
      </Button>
    </section>
  );
};

export default RecommendedCars;
