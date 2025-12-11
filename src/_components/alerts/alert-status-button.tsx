import { Button, CircularProgress } from "@mui/material";
import type { Alert } from "@/_schemas";

type AlertDismissButtonProps = {
  alert: Alert;
  onDismiss: (alert: Alert) => void;
  isLoading?: boolean;
};

export const AlertDismissButton = ({
  alert,
  onDismiss,
  isLoading = false,
}: AlertDismissButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      size="small"
      onClick={() => onDismiss(alert)}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={16} /> : "Dismiss"}
    </Button>
  );
};
