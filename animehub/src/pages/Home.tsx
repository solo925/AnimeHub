import { useCallback, useState } from "react";
import withLayout from "../hoc/withLayout";
import withAnimation from "../hoc/withAnimation";
import { fetchTrendingAnime } from "../api/jikan";
import { Grid } from "@mui/material";
import AnimeCard from "../components/AnimeCard";
import { useFetchAnime } from "../hooks/useFetchAnime";
import Search from "../components/Search";
import AnimeModal from "../components/AnimeModal";
import { Anime } from "../types/anime";

const Home = () => {
 
  const fetchAnime = useCallback(async () => {
    return await fetchTrendingAnime();
  }, []);

 
  const { data: trendingAnime } = useFetchAnime<Anime[]>(fetchAnime);

  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = useCallback((anime: Anime) => {
    setSelectedAnime(anime);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedAnime(null);
  }, []);

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12}>
        <Search />
      </Grid>

      {trendingAnime?.map((anime) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
          <AnimeCard anime={anime} onViewDetails={handleOpenModal} />
        </Grid>
      ))}

      <AnimeModal
        anime={selectedAnime}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Grid>
  );
};

export default withLayout(withAnimation(Home));