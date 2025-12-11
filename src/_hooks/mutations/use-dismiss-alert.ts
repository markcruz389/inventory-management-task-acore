import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../cache-keys";

const dismissAlert = async (productId: number) => {
  const res = await fetch(`/api/alerts/${productId}`, {
    method: "PUT",
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to dismiss alert");
  }
  return res.json();
};

export const useDismissAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dismissAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.alerts.all });
      // Also invalidate dismissed alerts so the modal updates
      queryClient.invalidateQueries({
        queryKey: [...queryKeys.alerts.all, "dismissed"],
      });
    },
  });
};
