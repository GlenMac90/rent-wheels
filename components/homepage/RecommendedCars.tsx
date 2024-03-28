"use client";

import { useState } from "react";

import CarCard from "./CarCard";
import Button from "../Button";
import { ICar } from "@/lib/models/car.model";

const RecommendedCars = ({ cars }: { cars: ICar[] }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="flex w-full flex-col gap-5 pb-6">
      <h3 className="semibold-14 md:semibold-16 text-gray-400">
        Recommended Cars
      </h3>
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} data={car} />
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
