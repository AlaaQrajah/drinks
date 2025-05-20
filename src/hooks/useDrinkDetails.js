import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchDrink = async (id) => {
  if (!id) return null; // Handle case where id is not available
  const res = await api.get(`lookup.php?i=${id}`);
  return res.data.drinks && res.data.drinks.length > 0
    ? res.data.drinks[0]
    : null;
};

const useDrinkDetails = (id) => {
  return useQuery({
    queryKey: ["drink", id],
    queryFn: () => fetchDrink(id),
    enabled: !!id, // Only fetch if id is available
  });
};

export default useDrinkDetails;
