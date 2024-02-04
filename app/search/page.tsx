import SearchBar from "@/components/SearchBar";
import SearchPageFilters from "@/components/search-page/SearchPageFilters";
import SearchResults from "@/components/search-page/SearchResults";

const Search = () => {
  return (
    <main className="search-page-styles">
      <section className="flex w-full max-w-[82rem] flex-col items-center lg:flex-row">
        <SearchPageFilters />
        <main className="flex w-full flex-col gap-8 p-6 lg:overflow-auto lg:pl-6">
          <SearchBar searchPage />
          <SearchResults />
        </main>
      </section>
    </main>
  );
};

export default Search;
