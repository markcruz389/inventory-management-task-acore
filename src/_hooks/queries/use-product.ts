import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../cache-keys";

const fetchProductById = async (id: string | number) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

export const useProduct = (id: string | number | undefined) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id!),
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
};
