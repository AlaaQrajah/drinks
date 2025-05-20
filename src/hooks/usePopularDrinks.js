import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchPopularDrinks = async () => {
  const res = await api.get("filter.php?c=Cocktail");
  return res.data.drinks || [];
};

const usePopularDrinks = () => {
  return useQuery({
    queryKey: ["popularDrinks"],
    queryFn: fetchPopularDrinks,
  });
};

export default usePopularDrinks;
