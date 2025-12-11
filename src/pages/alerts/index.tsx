import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { useAlerts } from "@/_hooks/queries/use-alerts";
import { useProducts } from "@/_hooks/queries/use-products";
import { useDismissAlert } from "@/_hooks/mutations/use-dismiss-alert";
import {
  AlertsTable,
  AlertsTableSkeleton,
  AlertsPageSkeleton,
  AlertsError,
  DismissedAlertsModal,
  DismissConfirmationDialog,
} from "@/_components/alerts";
import type { Alert as AlertType } from "@/_schemas";

export default function AlertsPage() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [dismissedModalOpen, setDismissedModalOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [alertToDismiss, setAlertToDismiss] = useState<AlertType | null>(null);

  const {
    data: alerts = [],
    isLoading: alertsLoading,
    error: alertsError,
  } = useAlerts();
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  const dismissAlertMutation = useDismissAlert();

  const isLoading = alertsLoading || productsLoading;
  const hasError = alertsError || productsError;

  const handleDismissClick = (alert: AlertType) => {
    setAlertToDismiss(alert);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDismiss = async () => {
    if (!alertToDismiss) return;

    try {
      await dismissAlertMutation.mutateAsync(alertToDismiss.productId);
      setSnackbarMessage("Alert dismissed successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setConfirmDialogOpen(false);
      setAlertToDismiss(null);
    } catch (error: any) {
      setSnackbarMessage(error.message || "Failed to dismiss alert");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCancelDismiss = () => {
    setConfirmDialogOpen(false);
    setAlertToDismiss(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Calculate alert counts by stock status
  const criticalCount = alerts.filter(
    (a) => a.stockStatus === "critical"
  ).length;
  const lowCount = alerts.filter((a) => a.stockStatus === "low").length;

  if (isLoading) {
    return <AlertsPageSkeleton />;
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Low Stock Alerts
        </Typography>
        <Button
          variant="outlined"
          startIcon={<HistoryIcon />}
          onClick={() => setDismissedModalOpen(true)}
        >
          View Dismissed Alerts
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={6} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Critical
              </Typography>
              <Typography variant="h5" color="error.main">
                {criticalCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Low Stock
              </Typography>
              <Typography variant="h5" color="warning.main">
                {lowCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {hasError ? (
        <AlertsError
          message={
            alertsError
              ? `Unable to load alerts: ${alertsError.message}`
              : productsError
              ? `Unable to load products: ${productsError.message}`
              : "Unable to load alerts data"
          }
        />
      ) : alertsLoading ? (
        <AlertsTableSkeleton />
      ) : (
        <AlertsTable
          alerts={alerts}
          products={products}
          onDismiss={handleDismissClick}
          isLoading={dismissAlertMutation.isPending}
        />
      )}

      <DismissedAlertsModal
        open={dismissedModalOpen}
        onClose={() => setDismissedModalOpen(false)}
      />

      <DismissConfirmationDialog
        open={confirmDialogOpen}
        alert={alertToDismiss}
        productName={
          alertToDismiss
            ? products.find((p) => p.id === alertToDismiss.productId)?.name ||
              "Unknown Product"
            : ""
        }
        onConfirm={handleConfirmDismiss}
        onCancel={handleCancelDismiss}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
