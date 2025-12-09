import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const fetchWarehouses = async () => {
  const res = await fetch("/api/warehouses");
  if (!res.ok) throw new Error("Failed to fetch warehouses");
  return res.json();
};

export const useWarehouses = () => {
  return useQuery({
    queryKey: queryKeys.warehouses.all,
    queryFn: fetchWarehouses,
  });
};
