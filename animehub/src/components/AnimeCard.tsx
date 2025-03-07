import { motion } from "framer-motion";
import { Tilt } from "react-tilt";
import { Card, CardMedia, CardContent, Typography, IconButton, SxProps } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Anime } from "../types/anime";

interface AnimeCardProps {
  anime: Anime;
  onViewDetails: (anime: Anime) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  sx?: SxProps;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onViewDetails, isFavorite, onToggleFavorite }) => {
  const imageUrl = anime.images?.jpg?.image_url || "/placeholder-image.jpg";

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Tilt
        options={{
          max: 40,
          scale: 1.05,
          speed: 400,
        }}
        className="w-full"
      >
        <Card
          className="cursor-pointer bg-gray-800 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out relative"
        >
          <CardMedia
            component="img"
            height="250"
            image={imageUrl}
            alt={anime.title || "Anime Image"}
            className="object-cover"
            onClick={() => onViewDetails(anime)}
          />
          <CardContent>
            <Typography variant="h6" className="font-bold">
              {anime.title}
            </Typography>
            <Typography variant="body2" className="text-gray-400">
              {anime.synopsis?.substring(0, 100) || "No description available"}...
            </Typography>
          </CardContent>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: isFavorite ? "red" : "white",
              border: "2px solid red",
              backgroundColor: isFavorite ? "rgba(255, 0, 0, 0.2)" : "transparent",
              transition: "all 0.3s ease",
              '&:hover': {
                backgroundColor: "rgba(255, 0, 0, 0.4)",
              }
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Card>
      </Tilt>
    </motion.div>
  );
};

export default AnimeCard;
