import SearchBar from "@/components/searchbar/SearchBar";
import { Hero, PopularCars, RecommendedCars } from "@/components/homepage";
import { getAllCars, getCarsWithMostLikes } from "@/lib/actions/car.actions";

export default async function Home() {
  const cars = await getAllCars();
  const popularCars = await getCarsWithMostLikes();
  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[85rem] flex-col items-center">
        <Hero />
        <SearchBar />
        <PopularCars cars={popularCars} />
        <RecommendedCars cars={cars} />
      </section>
    </main>
  );
}
