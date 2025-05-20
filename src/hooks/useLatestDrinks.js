import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchLatestDrinks = async () => {
  const res = await api.get("search.php?f=a");
  return res.data.drinks || [];
};

const useLatestDrinks = () => {
  return useQuery({
    queryKey: ["latestDrinks"],
    queryFn: fetchLatestDrinks,
  });
};

export default useLatestDrinks;
