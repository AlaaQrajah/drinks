import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchFilteredDrink = async ({ ingredients, category }) => {
  try {
    let res = null;
    
    if (ingredients && ingredients.length > 0) {
      // Add a small delay to prevent rapid successive requests
      res = await api.get(`filter.php?i=${encodeURIComponent(ingredients[0])}`);
    } else if (category) {
      res = await api.get(`filter.php?c=${encodeURIComponent(category)}`);
    } else {
      return []; // Return empty array if no criteria provided
    }
    
    // Check if we got valid data back
    if (!res.data || !res.data.drinks) {
      console.warn("API returned no drinks data");
      return [];
    }
    
    return res.data.drinks;
  } catch (error) {
    console.error("Error fetching filtered drinks:", error);
    throw new Error("Failed to fetch drinks. Please try again.");
  }
};

const useFetchFilteredDrink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: fetchFilteredDrink,
    onError: (error) => {
      console.error("Mutation error:", error);
    },
    // Add caching to prevent repeated requests for the same data
    onSuccess: (data, variables) => {
      // Cache the results
      if (variables.ingredients && variables.ingredients.length > 0) {
        queryClient.setQueryData(['drinks', 'ingredient', variables.ingredients[0]], data);
      } else if (variables.category) {
        queryClient.setQueryData(['drinks', 'category', variables.category], data);
      }
    }
  });
};

export default useFetchFilteredDrink;