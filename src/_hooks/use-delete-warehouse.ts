import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const deleteWarehouse = async (id: number) => {
  const res = await fetch(`/api/warehouses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete warehouse");
  return res.json();
};

export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.warehouses.all });
    },
  });
};
