import { motion } from "framer-motion";
import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Anime } from "../types/anime";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card sx={{ backgroundColor: "#1e293b", color: "white", borderRadius: 2 }}>
        <CardMedia
          component="img"
          height="250"
          image={anime.images?.jpg?.image_url ?? "https://random.imagecdn.app/500/250"}
          alt={anime.title ?? "Unknown Anime"}
        />
        <CardContent>
          <Typography variant="h6">{anime.title ?? "No Title Available"}</Typography>
          <Button variant="contained" color="secondary" fullWidth>
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimeCard;
