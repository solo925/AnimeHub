import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Anime } from "../types/anime";

interface AnimeModalProps {
  anime: Anime | null; 
  open: boolean; 
  onClose: () => void; 
  
}

const AnimeModal: React.FC<AnimeModalProps> = ({ anime, open, onClose }) => {
  if (!anime) return null; 

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {/* Close Button */}
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle>{anime.title}</DialogTitle>

      <DialogContent>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Anime Image */}
          <img
            src={anime.images?.jpg?.large_image_url}
            alt={anime.title}
            className="w-48 h-auto rounded-lg shadow-lg"
          />

          <div>
            {/* Synopsis */}
            <p className="text-gray-700">{anime.synopsis}</p>

            {/* Rating */}
            <p className="mt-2 font-semibold">⭐ Rating: {anime.score || "N/A"}</p>

            {/* Trailer (if available) */}
            {anime.trailer?.youtube_id && (
              <div className="mt-4">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                  title="Anime Trailer"
                  allowFullScreen
                  className="rounded-lg shadow-lg"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimeModal;
