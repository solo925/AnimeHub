import { useState, useEffect } from "react";
import { Anime } from "../types/anime";

export const useFetchAnimeById = (ids: string[]) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (ids.length === 0) return;

      try {
        const responses = await Promise.all(
          ids.map(async (id) => {
            const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
            return res.ok ? res.json() : null;
          })
        );

        const fetchedAnime = responses
          .map((data) => data.data as Anime);  

        setAnimeList(fetchedAnime);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchData();
  }, [ids]);

  return { animeList };
};
