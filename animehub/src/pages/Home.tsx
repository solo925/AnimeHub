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
// import CanvasLoader, { UILoader } from "../components/Loader";
import { throttle } from "lodash";
import { UILoader } from "../components/Loader";


const Home = () => {
  const fetchAnime = useCallback(fetchTrendingAnime, []);
  const { data: trendingAnime, isLoading } = useFetchAnime<Anime[]>(fetchAnime);

  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  // Throttle the modal opening function to limit rapid clicks
  const handleOpenModal = useCallback(
    throttle((anime: Anime) => {
      setSelectedAnime(anime);
      setModalOpen(true);
    }, 500),
    []
  );

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedAnime(null);
  }, []);

  // Throttle the favorite toggle function to prevent rapid clicks
  const handleToggleFavorite = useCallback(
    throttle((animeId: string) => {
      toggleFavorite(animeId);
    }, 300), 
    [toggleFavorite]
  );

  // event delegation
  const handleFavoriteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const button = target.closest("[data-favorite-id]") as HTMLElement | null;

    if (button) {
      const animeId = button.getAttribute("data-favorite-id");
      if (animeId) handleToggleFavorite(animeId);
    }
  };

  if (isLoading) {
    // return <CanvasLoader />;
    return <UILoader/>
  }

  return (
    <Container maxWidth={false} disableGutters   sx={{
      paddingY: 3,
      marginX:12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
       <Grid container spacing={3} sx={{ height: "100%" }} onClick={handleFavoriteClick}>
        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Search />
          <Button component={Link} to="/favorites" variant="contained" color="secondary" 
          >
            View Favorites
          </Button>
        </Grid>

        {trendingAnime?.map(
          (anime) =>
            anime.mal_id && (
              <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id} sx={{ display: "flex" }}>
                <AnimeCard
                  anime={anime}
                  onViewDetails={() => handleOpenModal(anime)}
                  isFavorite={favorites.includes(anime.mal_id.toString())}
                  onToggleFavorite={() => anime.mal_id && handleToggleFavorite(anime.mal_id.toString())}
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
