import { useMutation } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchFilteredDrink = async ({ ingredients, category }) => {
  let res = null;
  if (ingredients && ingredients.length > 0) {
    res = await api.get(`filter.php?i=${ingredients[0]}`);
  } else if (category) {
    res = await api.get(`filter.php?c=${category}`);
  }
  return res?.data?.drinks || [];
};

const useFetchFilteredDrink = () => {
  return useMutation({
    mutationFn: fetchFilteredDrink,
  });
};

export default useFetchFilteredDrink;
