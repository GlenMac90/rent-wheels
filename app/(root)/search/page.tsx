import SearchBar from "@/components/searchbar/SearchBar";
import SearchPageFilters from "@/components/search-page/SearchPageFilters";
import SearchResults from "@/components/search-page/SearchResults";
import { validateUserSession } from "@/lib/actions/user.actions";
import { fetchSearchResults } from "@/lib/actions/car.actions";

const Search = async ({ searchParams }: { searchParams: any }) => {
  const searchResults = await fetchSearchResults(searchParams);
  console.log(searchResults);
  await validateUserSession();
  return (
    <main className="search-page-styles">
      <section className="flex w-full max-w-[82rem] flex-col lg:flex-row">
        <SearchPageFilters />
        <main className="flex w-full flex-col gap-8 overflow-scroll p-6 lg:pr-0">
          <SearchBar searchPage />
          {/* <SearchResults /> */}
        </main>
      </section>
    </main>
  );
};

export default Search;
