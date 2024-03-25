import SearchBar from "@/components/searchbar/SearchBar";
import Hero from "@/components/homepage/Hero";
import PopularCars from "@/components/homepage/PopularCars";
import RecommendedCars from "@/components/homepage/RecommendedCars";
import { validateUserEmail } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);

  if (session && session.user && session.user.email) {
    await validateUserEmail(session.user.email);
  }

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
