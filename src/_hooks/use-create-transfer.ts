import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const createTransfer = async (transfer: {
  productId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
  quantity: number;
}) => {
  const res = await fetch("/api/transfers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transfer),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create transfer");
  }
  return res.json();
};

export const useCreateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.transfers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.stock.all });
    },
  });
};
