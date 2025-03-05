import { useState, useEffect } from "react";

export const useDebouncedSearch = (searchQuery: string, delay: number = 500) => {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchQuery, delay]);

  return debouncedQuery;
};
