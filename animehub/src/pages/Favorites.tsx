import { Grid, Typography } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import { useFetchAnimeById } from "../hooks/useFetchAnimeById";
import { useFavorites } from "../contexts/FavoritesContext";
import CanvasLoader from "../components/Loader";


const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { animeList, isLoading } = useFetchAnimeById(favorites);

  if (isLoading) {
    return <CanvasLoader />;
  }

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
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
              onToggleFavorite={() => toggleFavorite(String(anime.mal_id))}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Favorites;
