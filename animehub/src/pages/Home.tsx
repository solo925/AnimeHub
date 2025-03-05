import { useState } from "react";
import withLayout from "../hoc/withLayout";
import withAnimation from "../hoc/withAnimation";
import { fetchTrendingAnime } from "../api/jikan";
import { Grid } from "@mui/material"; // ✅ Use Grid instead of Grid2
import AnimeCard from "../components/AnimeCard";
import { useFetchAnime } from "../hooks/useFetchAnime";
import Search from "../components/Search";
import AnimeModal from "../components/AnimeModal";
import { Anime } from "../types/anime";


const Home = () => {
  const { data: trendingAnime } = useFetchAnime<Anime[]>(fetchTrendingAnime);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Explicitly type `anime`
  const handleOpenModal = (anime: Anime) => {
    setSelectedAnime(anime);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAnime(null);
  };

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}> {/* ✅ Use Grid (not Grid2) */}
      {/* Search Bar */}
      <Grid item xs={12}> {/* ✅ xs works here */}
        <Search />
      </Grid>

      {/* Trending Anime Grid */}
      {trendingAnime?.map((anime) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
          {/* Clicking an Anime Card Opens Modal */}
          <div onClick={() => handleOpenModal(anime)}>
            <AnimeCard anime={anime} />
          </div>
        </Grid>
      ))}

      {/* Anime Modal */}
      <AnimeModal anime={selectedAnime} open={modalOpen} onClose={handleCloseModal} />
    </Grid>
  );
};

export default withLayout(withAnimation(Home));
