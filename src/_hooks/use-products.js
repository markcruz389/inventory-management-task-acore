import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";

const fetchProducts = async () => {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: fetchProducts,
  });
};
