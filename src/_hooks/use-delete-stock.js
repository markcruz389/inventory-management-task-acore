import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const deleteStock = async (id) => {
  const res = await fetch(`/api/stock/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete stock");
  return res.json();
};

export const useDeleteStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stock.all });
    },
  });
};
