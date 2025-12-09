import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const fetchStock = async () => {
  const res = await fetch("/api/stock");
  if (!res.ok) throw new Error("Failed to fetch stock");
  return res.json();
};

export const useStock = () => {
  return useQuery({
    queryKey: queryKeys.stock.all,
    queryFn: fetchStock,
  });
};
