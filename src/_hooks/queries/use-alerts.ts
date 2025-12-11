import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../cache-keys";
import { alertsResponseSchema } from "@/_schemas";

const fetchAlerts = async () => {
  const res = await fetch("/api/alerts");
  if (!res.ok) throw new Error("Failed to fetch alerts");
  const data = await res.json();
  const result = alertsResponseSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid alerts data: ${result.error.message}`);
  }
  return result.data;
};

export const useAlerts = () => {
  return useQuery({
    queryKey: queryKeys.alerts.all,
    queryFn: fetchAlerts,
  });
};

