import SearchBar from "@/components/searchbar/SearchBar";
import Hero from "@/components/homepage/Hero";
import PopularCars from "@/components/homepage/PopularCars";
import RecommendedCars from "@/components/homepage/RecommendedCars";
import { getAllCars } from "@/lib/actions/car.actions";

export default async function Home() {
  const cars = await getAllCars();
  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center gap-6">
        <Hero />
        <SearchBar />
        <PopularCars cars={cars} />
        <RecommendedCars cars={cars} />
      </section>
    </main>
  );
}
