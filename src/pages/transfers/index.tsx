import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTransfers } from "@/_hooks/queries/use-transfers";
import { useProducts } from "@/_hooks/queries/use-products";
import { useWarehouses } from "@/_hooks/queries/use-warehouses";
import { useStock } from "@/_hooks/queries/use-stock";
import { TransferModal } from "@/_components/transfers/transfer-modal";
import { TransfersTable } from "@/_components/transfers/transfers-table";
import { TransfersTableSkeleton } from "@/_components/transfers/transfers-table-skeleton";
import { TransfersError } from "@/_components/transfers/transfers-error";

export default function Transfers() {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const {
    data: transfers = [],
    isLoading: transfersLoading,
    error: transfersError,
  } = useTransfers();
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();
  const {
    data: warehouses = [],
    isLoading: warehousesLoading,
    error: warehousesError,
  } = useWarehouses();
  const {
    data: stock = [],
    isLoading: stockLoading,
    error: stockError,
  } = useStock();

  const isLoading = productsLoading || warehousesLoading || stockLoading;
  const hasError =
    transfersError || productsError || warehousesError || stockError;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSuccess = () => {
    setSnackbarMessage("Transfer created successfully!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleError = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  const getProductName = (productId: number) => {
    const product = products.find((p: any) => p.id === productId);
    return product ? `${product.name} (${product.sku})` : "Unknown";
  };

  const getWarehouseName = (warehouseId: number) => {
    const warehouse = warehouses.find((w: any) => w.id === warehouseId);
    return warehouse ? `${warehouse.name} (${warehouse.code})` : "Unknown";
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Stock Transfers
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Initiate Transfer
        </Button>
      </Box>

      {transfersLoading ? (
        <TransfersTableSkeleton />
      ) : hasError ? (
        <TransfersError
          message={
            transfersError
              ? `Unable to load transfers: ${transfersError.message}`
              : productsError
              ? `Unable to load products: ${productsError.message}`
              : warehousesError
              ? `Unable to load warehouses: ${warehousesError.message}`
              : stockError
              ? `Unable to load stock: ${stockError.message}`
              : "Unable to load transfers data"
          }
        />
      ) : (
        <TransfersTable
          transfers={transfers}
          getProductName={getProductName}
          getWarehouseName={getWarehouseName}
        />
      )}

      <TransferModal
        open={open}
        onClose={handleClose}
        products={products}
        warehouses={warehouses}
        stock={stock}
        isLoading={isLoading}
        onSuccess={handleSuccess}
        onError={handleError}
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
