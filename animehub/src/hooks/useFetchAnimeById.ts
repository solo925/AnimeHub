import { useState, useEffect } from "react";
import { Anime } from "../types/anime";

export const useFetchAnimeById = (ids: string[]) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // ✅ Add loading state

  useEffect(() => {
    if (ids.length === 0) {
      setAnimeList([]);
      setIsLoading(false); // ✅ No anime to fetch, stop loading
      return;
    }

    const fetchData = async () => {
      setIsLoading(true); // ✅ Set loading to true before fetching

      try {
        const responses = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            return res.ok ? await res.json() : null;
          })
        );

        const fetchedAnime = responses
          .filter((data): data is { data: Anime } => data !== null && data.data)
          .map((data) => data.data);

        setAnimeList(fetchedAnime);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setIsLoading(false); // ✅ Stop loading after fetching
      }
    };

    fetchData();
  }, [ids]);

  return { animeList, isLoading }; // ✅ Return isLoading
};
