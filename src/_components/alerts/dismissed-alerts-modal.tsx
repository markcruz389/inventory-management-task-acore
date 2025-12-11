import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  useDismissedAlerts,
  type DismissedAlert,
} from "@/_hooks/queries/use-dismissed-alerts";

type DismissedAlertsModalProps = {
  open: boolean;
  onClose: () => void;
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

export const DismissedAlertsModal = ({
  open,
  onClose,
}: DismissedAlertsModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: dismissedAlerts = [], isLoading, error } = useDismissedAlerts();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle>Dismissed Alerts History</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ py: 2 }}>
            <Typography color="error">
              Failed to load dismissed alerts. Please try again.
            </Typography>
          </Box>
        ) : dismissedAlerts.length === 0 ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography variant="body1" color="text.secondary">
              No dismissed alerts found.
            </Typography>
          </Box>
        ) : isMobile ? (
          <Box sx={{ mt: 2 }}>
            {dismissedAlerts.map((alert) => (
              <Paper key={alert.productId} sx={{ mb: 2, p: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {alert.productName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {alert.sku}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                  <Chip
                    label={alert.stockStatus}
                    color={getStockStatusColor(alert.stockStatus) as any}
                    size="small"
                  />
                </Box>
                <Box>
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
              </Paper>
            ))}
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Stock Status</TableCell>
                  <TableCell align="right">Current Stock</TableCell>
                  <TableCell align="right">Reorder Point</TableCell>
                  <TableCell align="right">Recommended</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dismissedAlerts.map((alert) => (
                  <TableRow key={alert.productId}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {alert.productName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {alert.sku}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
