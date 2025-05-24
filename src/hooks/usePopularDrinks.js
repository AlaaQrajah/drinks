import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchPopularDrinks = async () => {
  try {
    // Fetch popular cocktails - using the Cocktail category as a proxy for popular drinks
    const res = await api.get("filter.php?c=Cocktail");
    
    // Get a random selection of drinks to simulate "popular" drinks
    // since the API doesn't have a true popularity metric
    const drinks = res.data.drinks || [];
    
    if (drinks.length > 0) {
      // Shuffle the array to get a random selection
      const shuffled = [...drinks].sort(() => 0.5 - Math.random());
      // Return the first 10 drinks
      return shuffled.slice(0, 10);
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching popular drinks:", error);
    return [];
  }
};

const usePopularDrinks = () => {
  return useQuery({
    queryKey: ["popularDrinks"],
    queryFn: fetchPopularDrinks,
    staleTime: 3 * 60 * 60 * 1000, // 3 hours
    cacheTime: 6 * 60 * 60 * 1000, // 6 hours
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default usePopularDrinks;