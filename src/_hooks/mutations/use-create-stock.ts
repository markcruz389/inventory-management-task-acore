import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../cache-keys";

const createStock = async (stock: {
  productId: number;
  warehouseId: number;
  quantity: number;
}) => {
  const res = await fetch("/api/stock", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
  if (!res.ok) throw new Error("Failed to create stock");
  return res.json();
};

export const useCreateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.stock.all });
    },
  });
};
