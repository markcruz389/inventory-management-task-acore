import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { warehousesResponseSchema } from "@/_schemas";

const fetchWarehouses = async () => {
  const res = await fetch("/api/warehouses");
  if (!res.ok) throw new Error("Failed to fetch warehouses");
  const data = await res.json();
  const result = warehousesResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid warehouses data: ${result.error.message}`);
  }
  return result.data;
};

export const useWarehouses = () => {
  return useQuery({
    queryKey: queryKeys.warehouses.all,
    queryFn: fetchWarehouses,
  });
};
