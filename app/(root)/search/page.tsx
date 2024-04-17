import { Suspense } from "react";

import SearchBar from "@/components/searchbar/SearchBar";
import { SearchPageFilters, SearchResults } from "@/components/search-page";
import { SearchParams, fetchSearchResults } from "@/lib/actions/car.actions";

const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { cars, moreCars } = await fetchSearchResults({
    searchQuery: searchParams,
  });
  return (
    <main className="search-page-styles">
      <section className="flex w-full max-w-[85rem] flex-col lg:flex-row">
        <SearchPageFilters />
        <main className="bg-white-200_gray-950 no-scrollbar flex w-full flex-col overflow-scroll py-6">
          <div className="flex w-full px-6 pb-8">
            <SearchBar searchPage />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResults cars={cars} moreCars={moreCars} />
          </Suspense>
        </main>
      </section>
    </main>
  );
};

export default Search;
