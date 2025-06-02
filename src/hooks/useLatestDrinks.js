import { useQuery } from '@tanstack/react-query';
import api from '../services/api-client';

const fetchLatestDrinks = async () => {
  try {
    // Note: The API doesn't have a true "latest" endpoint, so we're using a workaround
    // This gets drinks starting with 'a' as a sample set
    const res = await api.get('search.php?f=a');

    // Sort by ID in descending order to simulate "latest" drinks
    // Higher IDs are typically newer entries in the database
    const drinks = res.data.drinks || [];
    return drinks
      .sort((a, b) => parseInt(b.idDrink) - parseInt(a.idDrink))
      .slice(0, 10); // Limit to 10 drinks
  } catch (error) {
    console.error('Error fetching latest drinks:', error);
    return [];
  }
};

const useLatestDrinks = () => {
  return useQuery({
    queryKey: ['latestDrinks'],
    queryFn: fetchLatestDrinks,
    // staleTime: 60 * 60 * 1000, // 1 hour
    // cacheTime: 3 * 60 * 60 * 1000, // 3 hours
    // retry: 2,
    // refetchOnWindowFocus: false,
  });
};

export default useLatestDrinks;
