import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const fetchWarehouseById = async (id: string | number) => {
  const res = await fetch(`/api/warehouses/${id}`);
  if (!res.ok) throw new Error("Failed to fetch warehouse");
  return res.json();
};

export const useWarehouse = (id: string | number | undefined) => {
  return useQuery({
    queryKey: queryKeys.warehouses.detail(id!),
    queryFn: () => fetchWarehouseById(id!),
    enabled: !!id,
  });
};
