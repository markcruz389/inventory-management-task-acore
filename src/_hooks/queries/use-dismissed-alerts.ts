import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../cache-keys";

type DismissedAlert = {
  productId: number;
  productName: string;
  sku: string;
  stockStatus: "critical" | "low" | "adequate" | "overstocked";
  currentStock: number;
  reorderPoint: number;
  recommendedQuantity: number;
};

const fetchDismissedAlerts = async (): Promise<DismissedAlert[]> => {
  const res = await fetch("/api/alerts/dismissed");
  if (!res.ok) throw new Error("Failed to fetch dismissed alerts");
  return res.json();
};

export const useDismissedAlerts = () => {
  return useQuery({
    queryKey: [...queryKeys.alerts.all, "dismissed"],
    queryFn: fetchDismissedAlerts,
  });
};

export type { DismissedAlert };
