import { useEffect, useState } from "react";

export const useFetchAnime = <T>(fetchFunction: () => Promise<T>, dependencies: unknown[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(null);

    fetchFunction()
      .then((response) => {
        if (isMounted) setData(response);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch anime data.");
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, isLoading, error };
};
