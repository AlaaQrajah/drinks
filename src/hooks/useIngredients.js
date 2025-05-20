import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchIngredients = async () => {
  const res = await api.get("list.php?i=list");
  return res.data.drinks || [];
};

const useIngredients = () => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
  });
};

export default useIngredients;
