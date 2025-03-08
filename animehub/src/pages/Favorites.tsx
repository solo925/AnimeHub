import { Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import throttle from "lodash/throttle";
import AnimeCard from "../components/AnimeCard";
import { useFetchAnimeById } from "../hooks/useFetchAnimeById";
import { useFavorites } from "../contexts/FavoritesContext";
import CanvasLoader from "../components/Loader";

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { animeList, isLoading } = useFetchAnimeById(favorites);

  // Throttled function to prevent excessive toggling
  const throttledToggleFavorite = useCallback(
    throttle((id: string) => toggleFavorite(id), 1000),
    [toggleFavorite]
  );

  if (isLoading) {
    return <CanvasLoader />;
  }
    // Event delegation for favorite toggling
    const handleFavoriteClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const button = target.closest("[data-favorite-id]") as HTMLElement | null;
  
      if (button) {
        const animeId = button.getAttribute("data-favorite-id");
        if (animeId) throttledToggleFavorite(animeId);
      }
    };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }} onClick={handleFavoriteClick}>
      <Grid item xs={12}>
        <Typography variant="h4">Your Favorites</Typography>
      </Grid>

      {animeList.length === 0 ? (
        <Typography sx={{ padding: 3 }}>No favorites added yet.</Typography>
      ) : (
        animeList.map((anime) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
            <AnimeCard
              anime={anime}
              onViewDetails={() => {}}
              isFavorite={favorites.includes(String(anime.mal_id))}
              onToggleFavorite={() => throttledToggleFavorite(String(anime.mal_id))}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Favorites;
