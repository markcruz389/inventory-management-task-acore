import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../cache-keys";

const fetchStockById = async (id: string | number) => {
  const res = await fetch(`/api/stock/${id}`);
  if (!res.ok) throw new Error("Failed to fetch stock item");
  return res.json();
};

export const useStockItem = (id: string | number | undefined) => {
  return useQuery({
    queryKey: queryKeys.stock.detail(id!),
    queryFn: () => fetchStockById(id!),
    enabled: !!id,
  });
};
