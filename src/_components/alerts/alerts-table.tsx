import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { Alert } from "@/_schemas";
import { AlertDismissButton } from "./alert-status-button";

type AlertsTableProps = {
  alerts: Alert[];
  products: Array<{ id: number; name: string; sku: string }>;
  onDismiss: (alert: Alert) => void;
  isLoading?: boolean;
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

export const AlertsTable = ({
  alerts,
  products,
  onDismiss,
  isLoading = false,
}: AlertsTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (alerts.length === 0) {
    return (
      <Box sx={{ mt: 3, textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No alerts requiring attention at this time.
        </Typography>
      </Box>
    );
  }

  if (isMobile) {
    return (
      <Box sx={{ mt: 2 }}>
        {alerts.map((alert) => {
          const product = products.find((p) => p.id === alert.productId);
          return (
            <Paper key={alert.productId} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {product?.name || "Unknown"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {product?.sku || ""}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                <Chip
                  label={alert.stockStatus}
                  color={getStockStatusColor(alert.stockStatus) as any}
                  size="small"
                />
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">
                  Current Stock: <strong>{alert.currentStock}</strong>
                </Typography>
                <Typography variant="body2">
                  Reorder Point: <strong>{alert.reorderPoint}</strong>
                </Typography>
                <Typography variant="body2">
                  Recommended: <strong>{alert.recommendedQuantity}</strong>
                </Typography>
              </Box>
              <AlertDismissButton
                alert={alert}
                onDismiss={() => onDismiss(alert)}
                isLoading={isLoading}
              />
            </Paper>
          );
        })}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Stock Status</TableCell>
            <TableCell align="right">Current Stock</TableCell>
            <TableCell align="right">Reorder Point</TableCell>
            <TableCell align="right">Recommended</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => {
            const product = products.find((p) => p.id === alert.productId);
            return (
              <TableRow key={alert.productId}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {product?.name || "Unknown"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product?.sku || ""}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={alert.stockStatus}
                    color={getStockStatusColor(alert.stockStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">{alert.currentStock}</TableCell>
                <TableCell align="right">{alert.reorderPoint}</TableCell>
                <TableCell align="right">
                  <strong>{alert.recommendedQuantity}</strong>
                </TableCell>
                <TableCell align="center">
                  <AlertDismissButton
                    alert={alert}
                    onDismiss={onDismiss}
                    isLoading={isLoading}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
