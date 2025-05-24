import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchIngredients = async () => {
  try {
    const res = await api.get("list.php?i=list");

    // Process the ingredients to have a consistent format
    return (
      res.data.drinks?.map((drink) => ({
        id: drink.strIngredient1.toLowerCase().replace(/\s+/g, "-"),
        name: drink.strIngredient1,
        // Add thumbnail URL using the API's ingredient image endpoint
        thumbnail: `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
          drink.strIngredient1
        )}-Small.png`,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - ingredients rarely change
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export default useIngredients;
