import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchOptions = async () => {
  const [cat, alc, glass, ing] = await Promise.all([
    api.get("list.php?c=list"),
    api.get("list.php?a=list"),
    api.get("list.php?g=list"),
    api.get("list.php?i=list"),
  ]);
  return {
    categories: cat.data.drinks.map((d) => ({
      value: d.strCategory,
      label: d.strCategory,
    })),
    alcoholics: alc.data.drinks.map((d) => ({
      value: d.strAlcoholic,
      label: d.strAlcoholic,
    })),
    glasses: glass.data.drinks.map((d) => ({
      value: d.strGlass,
      label: d.strGlass,
    })),
    ingredients: ing.data.drinks.map((d) => ({
      value: d.strIngredient1,
      label: d.strIngredient1,
    })),
  };
};

const useFormOptions = () => {
  return useQuery({
    queryKey: ["formOptions"],
    queryFn: fetchOptions,
  });
};

export default useFormOptions;
