"use client";

import { useState } from "react";

import CarCard from "@/components/homepage/CarCard";
import Button from "@/components/Button";

const SearchResults = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 16 }, (_, index) => (
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

export default SearchResults;
