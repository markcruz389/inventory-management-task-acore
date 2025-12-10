import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../cache-keys";

const createWarehouse = async (warehouse: {
  name: string;
  location: string;
  code: string;
}) => {
  const res = await fetch("/api/warehouses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(warehouse),
  });
  if (!res.ok) throw new Error("Failed to create warehouse");
  return res.json();
};

export const useCreateWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.warehouses.all });
    },
  });
};
