import { useState, useEffect } from "react";
import { useDebouncedSearch } from "../hooks/useDebouncedSearch";
import { searchAnime } from "../api/jikan";
import AnimeCard from "./AnimeCard";
import { Anime } from "../types/anime";
import { useFavorites } from "../contexts/FavoritesContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedSearch(query, 500);
  const { favorites, toggleFavorite } = useFavorites();

  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    searchAnime(debouncedQuery)
      .then((data) => setSearchResults(data))
      .catch((error) => console.error("Error fetching anime:", error))
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search anime..."
        value={query}
        onChange={(e) => setQuery(e.target.value.trim())}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />

      {isLoading && <p>Loading...</p>}
      
      {!isLoading && searchResults?.length === 0 && debouncedQuery && <p>No results found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {searchResults?.map(anime => (
          anime.mal_id && (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              onViewDetails={() => console.log(`View details for ${anime.title}`)}
              isFavorite={favorites.includes(anime.mal_id.toString())}
              onToggleFavorite={() => anime.mal_id && toggleFavorite(anime.mal_id.toString())}

            />
          )
        ))}
      </div>
    </div>
  );
};

export default Search;
