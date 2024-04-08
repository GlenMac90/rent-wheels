"use client";

import React from "react";
import CarCard from "@/components/homepage/CarCard";
import Button from "@/components/Button";
import { ICar } from "@/lib/models/car.model";
import { useURLQuery } from "@/lib/hooks/useURLQuery";

const SearchResults = ({
  cars,
  moreCars,
}: {
  cars: ICar[];
  moreCars: boolean;
}) => {
  const [page, setPage] = useURLQuery("page", "");

  const setChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = page ? parseInt(page) + 1 : 2;
    setPage(newPage.toString());
  };
  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-5 px-6 md:grid md:grid-cols-2 xl:grid-cols-3">
        {cars.map((car) => (
          <CarCard key={car.id} data={car} />
        ))}
      </div>
      {moreCars && (
        <Button
          height="h-9 md:h-14"
          width="w-[7.5rem] md:w-[14.25rem]"
          className="semibold-12 md:semibold-16 mt-8 self-center"
          // @ts-ignore
          handleClick={setChange}
        >
          Show More Cars
        </Button>
      )}
    </section>
  );
};

export default SearchResults;
