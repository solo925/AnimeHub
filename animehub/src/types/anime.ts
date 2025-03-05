export interface Anime {
    mal_id?: number;
    title?: string;
    synopsis?: string;
    score?: number;
    images?: {
      jpg?: {
        image_url?: string;
        large_image_url?: string;
      };
    };
    trailer?: {
      youtube_id?: string;
    };
  }
  