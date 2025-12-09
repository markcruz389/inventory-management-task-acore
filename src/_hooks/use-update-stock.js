import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './query-keys';

const updateStock = async ({ id, ...stock }) => {
  const res = await fetch(`/api/stock/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stock),
  });
  if (!res.ok) throw new Error('Failed to update stock');
  return res.json();
};

export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStock,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stock.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.stock.detail(variables.id) });
    },
  });
};

