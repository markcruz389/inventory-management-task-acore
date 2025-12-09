import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './query-keys';

const updateWarehouse = async ({ id, ...warehouse }) => {
  const res = await fetch(`/api/warehouses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(warehouse),
  });
  if (!res.ok) throw new Error('Failed to update warehouse');
  return res.json();
};

export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWarehouse,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.warehouses.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.warehouses.detail(variables.id) });
    },
  });
};

