import { useState } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { useFetchAnime } from "../hooks/useFetchAnime";
import { searchAnime } from "../api/jikan";
import AnimeCard from "./AnimeCard";
import { Anime } from "../types/anime";

const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedSearch(query, 500);
  const { data: searchResults, loading } = useFetchAnime<Anime[]>(() => searchAnime(debouncedQuery));

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {searchResults?.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default Search;
