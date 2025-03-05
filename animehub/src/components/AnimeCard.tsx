import { motion } from "framer-motion";
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Anime } from "../types/anime";
import { useFavorites } from "../contexts/FavoritesContext";

interface AnimeCardProps {
  anime: Anime;
  onViewDetails: (anime: Anime) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onViewDetails }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  
  const animeId = anime.mal_id ? anime.mal_id.toString() : "";

  const isFavorite = animeId && favorites.includes(animeId);

  const toggleFavorite = () => {
    if (!animeId) return; 
  
    if (isFavorite) {
      removeFavorite(animeId);
    } else {
      addFavorite(animeId);
    }
  };
  
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card sx={{ backgroundColor: "#1e293b", color: "white", borderRadius: 2, position: "relative" }}>
        <IconButton 
          onClick={toggleFavorite} 
          sx={{ position: "absolute", top: 8, right: 8, color: "red" }}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <CardMedia
          component="img"
          height="250"
          image={anime.images?.jpg?.image_url ?? "https://random.imagecdn.app/500/250"}
          alt={anime.title ?? "Unknown Anime"}
        />
        <CardContent>
          <Typography variant="h6">{anime.title ?? "No Title Available"}</Typography>
          <Button variant="contained" color="secondary" fullWidth onClick={() => onViewDetails(anime)}>
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimeCard;
