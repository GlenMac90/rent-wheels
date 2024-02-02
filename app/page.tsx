import Hero from "@/components/homepage/Hero";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center gap-6">
        <Hero />
        <SearchBar />
      </section>
    </main>
  );
}
