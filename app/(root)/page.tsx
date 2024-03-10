import SearchBar from "@/components/SearchBar";
import Hero from "@/components/homepage/Hero";
import PopularCars from "@/components/homepage/PopularCars";
import RecommendedCars from "@/components/homepage/RecommendedCars";
import { getUserByEmail } from "@/lib/actions/user.actions";

export default async function Home() {
  const user = await getUserByEmail("glen.mccallum@live.co.uk");
  console.log(user);

  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center gap-6">
        <Hero />
        <SearchBar />
        <PopularCars />
        <RecommendedCars />
      </section>
    </main>
  );
}
