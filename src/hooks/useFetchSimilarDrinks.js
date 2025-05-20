import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchSimilarDrinks = async ({ category, excludeId }) => {
  if (!category) return [];
  const res = await api.get(`filter.php?c=${encodeURIComponent(category)}`);
  return res.data.drinks
    ? res.data.drinks.filter((d) => d.idDrink !== excludeId).slice(0, 6)
    : [];
};

const useFetchSimilarDrinks = (category, excludeId) => {
  return useQuery({
    queryKey: ["similarDrinks", category, excludeId],
    queryFn: () => fetchSimilarDrinks({ category, excludeId }),
    enabled: !!category, // Only fetch if category is available
  });
};

export default useFetchSimilarDrinks;
