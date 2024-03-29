"use client";

import { useState } from "react";
import CarCard from "./CarCard";
import { ICar } from "@/lib/models/car.model";

const PopularCars = ({ cars }: { cars: ICar[] }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex-between w-full">
        <h3 className="semibold-14 md:semibold-16 text-gray-400">
          Popular Cars
        </h3>
        <button
          className="text-blue-500_blue-300 hover:text-blue-300_blue-500 semibold-12 md:semibold-16"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "View Less" : "View All"}
        </button>
      </div>
      <div className="relative flex gap-5 overflow-auto lg:grid lg:grid-cols-3 xl:grid-cols-4">
        {/* {cars.map((car) => (
          <CarCard key={car.id} data={car} />
        ))} */}
      </div>
    </section>
  );
};

export default PopularCars;
