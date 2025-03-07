export interface Anime {
    isLoading?:boolean;
    mal_id?: number;
    title?: string;
    synopsis?: string;
    score?: number;
    images?: {
      jpg?: {
        image_url?: string | undefined;
        large_image_url?: string | undefined;
      };
    };
    trailer?: {
      youtube_id?: string;
    };
  }
  