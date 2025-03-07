import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import withLayout from "../hoc/withLayout";
import withAnimation from "../hoc/withAnimation";
import { fetchTrendingAnime } from "../api/jikan";
import { Grid, Container, Button } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import { useFetchAnime } from "../hooks/useFetchAnime";
import Search from "../components/Search";
import AnimeModal from "../components/AnimeModal";
import { Anime } from "../types/anime";
import { useFavorites } from "../contexts/FavoritesContext";
import CanvasLoader from "../components/Loader";

const Home = () => {
  const fetchAnime = useCallback(fetchTrendingAnime, []);
  const { data: trendingAnime, isLoading } = useFetchAnime<Anime[]>(fetchAnime);

  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  const handleOpenModal = useCallback((anime: Anime) => {
    setSelectedAnime(anime);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedAnime(null);
  }, []);

  if (isLoading) {
    return <CanvasLoader />;
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ paddingY: 3 }}>
      <Grid container spacing={3} sx={{ height: "100%" }}>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Search />
          <Button component={Link} to="/favorites" variant="contained" color="secondary">
            View Favorites
          </Button>
        </Grid>

        {trendingAnime?.map(
          (anime) =>
            anime.mal_id && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={anime.mal_id}
                sx={{ display: "flex" }}
              >
                <AnimeCard
                  anime={anime}
                  onViewDetails={handleOpenModal}
                  isFavorite={favorites.includes(anime.mal_id.toString())}
                  onToggleFavorite={() => anime.mal_id && toggleFavorite(anime.mal_id.toString())
}
                  sx={{ height: "100%", flex: 1 }}
                />
              </Grid>
            )
        )}
      </Grid>

      <AnimeModal anime={selectedAnime} open={modalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default withLayout(withAnimation(Home));
