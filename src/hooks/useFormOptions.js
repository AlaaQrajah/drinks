import { useQuery } from "@tanstack/react-query";
import api from "../services/api-client";

const fetchCategories = async () => {
  try {
    const res = await api.get("list.php?c=list");
    return (
      res.data.drinks?.map((drink) => ({
        value: drink.strCategory,
        label: drink.strCategory,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const fetchAlcoholicTypes = async () => {
  try {
    const res = await api.get("list.php?a=list");
    return (
      res.data.drinks?.map((drink) => ({
        value: drink.strAlcoholic,
        label: drink.strAlcoholic,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching alcoholic types:", error);
    return [];
  }
};

const fetchGlasses = async () => {
  try {
    const res = await api.get("list.php?g=list");
    return (
      res.data.drinks?.map((drink) => ({
        value: drink.strGlass,
        label: drink.strGlass,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching glasses:", error);
    return [];
  }
};

const fetchIngredients = async () => {
  try {
    const res = await api.get("list.php?i=list");
    return (
      res.data.drinks?.map((drink) => ({
        value: drink.strIngredient1,
        label: drink.strIngredient1,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

const useFormOptions = () => {
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const { data: alcoholics = [], isLoading: loadingAlcoholics } = useQuery({
    queryKey: ["alcoholics"],
    queryFn: fetchAlcoholicTypes,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const { data: glasses = [], isLoading: loadingGlasses } = useQuery({
    queryKey: ["glasses"],
    queryFn: fetchGlasses,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  const { data: ingredients = [], isLoading: loadingIngredients } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredients,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  return {
    data: {
      categories,
      alcoholics,
      glasses,
      ingredients,
    },
    isLoading:
      loadingCategories ||
      loadingAlcoholics ||
      loadingGlasses ||
      loadingIngredients,
    isError: false, // You might want to add error handling if needed
  };
};

export default useFormOptions;
