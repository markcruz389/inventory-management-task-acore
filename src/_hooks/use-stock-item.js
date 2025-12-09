import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './query-keys';

const fetchStockById = async (id) => {
  const res = await fetch(`/api/stock/${id}`);
  if (!res.ok) throw new Error('Failed to fetch stock item');
  return res.json();
};

export const useStockItem = (id) => {
  return useQuery({
    queryKey: queryKeys.stock.detail(id),
    queryFn: () => fetchStockById(id),
    enabled: !!id,
  });
};

