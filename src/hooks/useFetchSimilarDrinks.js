import { useQuery } from '@tanstack/react-query';
import api from '../services/api-client';

const fetchSimilarDrinks = async ({ category, excludeId }) => {
  try {
    if (!category) return [];

    const res = await api.get(`filter.php?c=${encodeURIComponent(category)}`);

    if (!res.data.drinks) {
      return [];
    }

    // Filter out the current drink and get up to 6 similar drinks
    return res.data.drinks
      .filter((drink) => drink.idDrink !== excludeId)
      .slice(0, 6);
  } catch (error) {
    console.error('Error fetching similar drinks:', error);
    return [];
  }
};

const useFetchSimilarDrinks = (category, excludeId) => {
  return useQuery({
    queryKey: ['similarDrinks', category, excludeId],
    queryFn: () => fetchSimilarDrinks({ category, excludeId }),
    enabled: !!category && !!excludeId, // Only fetch if both category and excludeId are available
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 30 * 60 * 1000, // 30 minutes
    // retry: 1,
    // refetchOnWindowFocus: false,
  });
};

export default useFetchSimilarDrinks;
