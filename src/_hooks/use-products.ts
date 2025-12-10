import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { productsResponseSchema } from "@/_schemas";

const fetchProducts = async () => {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  const result = productsResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid products data: ${result.error.message}`);
  }
  return result.data;
};

export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: fetchProducts,
  });
};
