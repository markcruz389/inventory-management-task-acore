import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  Chip,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import type { Alert as AlertType } from "@/_schemas";

type DismissConfirmationDialogProps = {
  open: boolean;
  alert: AlertType | null;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const getStockStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "error";
    case "low":
      return "warning";
    case "adequate":
      return "success";
    case "overstocked":
      return "info";
    default:
      return "default";
  }
};

export const DismissConfirmationDialog = ({
  open,
  alert,
  productName,
  onConfirm,
  onCancel,
}: DismissConfirmationDialogProps) => {
  if (!alert) return null;

  const isStillLowStock =
    alert.stockStatus === "critical" || alert.stockStatus === "low";

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isStillLowStock ? "Confirm Dismiss Alert" : "Dismiss Alert"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            Product: <strong>{productName}</strong>
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current Stock Status:
          </Typography>
          <Chip
            label={alert.stockStatus}
            color={getStockStatusColor(alert.stockStatus) as any}
            size="small"
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            Current Stock: <strong>{alert.currentStock}</strong>
          </Typography>
          <Typography variant="body2">
            Reorder Point: <strong>{alert.reorderPoint}</strong>
          </Typography>
          <Typography variant="body2">
            Recommended Quantity: <strong>{alert.recommendedQuantity}</strong>
          </Typography>
        </Box>

        {isStillLowStock && (
          <Alert severity="warning" icon={<WarningIcon />} sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="medium" gutterBottom>
              Warning: Stock is still {alert.stockStatus}
            </Typography>
            <Typography variant="body2">
              The stock level is still below the reorder point. Are you sure you
              want to dismiss this alert? Make sure stock has been replenished
              before dismissing.
            </Typography>
          </Alert>
        )}

        {!isStillLowStock && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Stock level is {alert.stockStatus}. It's safe to dismiss this
              alert.
            </Typography>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={isStillLowStock ? "warning" : "primary"}
        >
          {isStillLowStock ? "Dismiss Anyway" : "Dismiss Alert"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
