import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/search-page/SearchResults";

const Search = () => {
  return (
    <main className="page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center gap-8 md:flex-row">
        <aside className="flex w-full max-w-[20rem]">content</aside>
        <main className="flex w-full flex-col gap-8">
          <SearchBar searchPage />
          <SearchResults />
        </main>
      </section>
    </main>
  );
};

export default Search;
