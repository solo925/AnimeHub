const API_BASE_URL = "https://api.jikan.moe/v4";

export const fetchTrendingAnime = async () => {
  const response = await fetch(`${API_BASE_URL}/top/anime`);
  const data = await response.json();
  return data.data;
};

export const searchAnime = async (query: string) => {
  if (!query) return []; // Avoid unnecessary API calls
  const response = await fetch(`${API_BASE_URL}/anime?q=${query}&limit=10`);
  const data = await response.json();
  return data.data;
};
