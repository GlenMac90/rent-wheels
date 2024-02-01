import Hero from "@/components/homepage/Hero";

export default function Home() {
  return (
    <main className="flex h-screen w-screen justify-center px-6">
      <section className="flex w-full max-w-[82rem] flex-col items-center">
        <Hero />
      </section>
    </main>
  );
}
