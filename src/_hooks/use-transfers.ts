import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query-keys";
import { transfersResponseSchema } from "@/_schemas";

const fetchTransfers = async () => {
  const res = await fetch("/api/transfers");
  if (!res.ok) throw new Error("Failed to fetch transfers");
  const data = await res.json();
  const result = transfersResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid transfers data: ${result.error.message}`);
  }
  return result.data;
};

export const useTransfers = () => {
  return useQuery({
    queryKey: queryKeys.transfers.all,
    queryFn: fetchTransfers,
  });
};
