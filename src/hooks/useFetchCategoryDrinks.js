 import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchCategoryDrinks = async (category) => {
  if (!category) return [];
  
  try {
    const res = await api.get(`filter.php?c=${category}`);
    return res.data.drinks || [];
  } catch (error) {
    console.error("Error fetching drinks by category:", error);
    throw new Error("Failed to fetch drinks by category. Please try again later.");
  }
};

const useFetchCategoryDrinks = (category, options = {}) => {
  return useQuery({
    queryKey: ["drinks", "category", category],
    queryFn: () => fetchCategoryDrinks(category),
    enabled: !!category, // Only fetch if category is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    refetchOnWindowFocus: false,
    ...options, // Allow overriding default options
  });
};

export default useFetchCategoryDrinks;