import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { stockResponseSchema } from "@/_schemas";

const fetchStock = async () => {
  const res = await fetch("/api/stock");
  if (!res.ok) throw new Error("Failed to fetch stock");
  const data = await res.json();
  const result = stockResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid stock data: ${result.error.message}`);
  }
  return result.data;
};

export const useStock = () => {
  return useQuery({
    queryKey: queryKeys.stock.all,
    queryFn: fetchStock,
  });
};
