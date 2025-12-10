import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCreateTransfer } from "@/_hooks/use-create-transfer";
import { useTransfers } from "@/_hooks/use-transfers";
import { useProducts } from "@/_hooks/use-products";
import { useWarehouses } from "@/_hooks/use-warehouses";
import { useStock } from "@/_hooks/use-stock";

type TransferFormData = {
  productId: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  quantity: string;
};

export default function Transfers() {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const createTransfer = useCreateTransfer();
  const {
    data: transfers = [],
    isLoading: transfersLoading,
    error: transfersError,
  } = useTransfers();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: warehouses = [], isLoading: warehousesLoading } =
    useWarehouses();
  const { data: stock = [], isLoading: stockLoading } = useStock();

  const isLoading = productsLoading || warehousesLoading || stockLoading;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransferFormData>({
    defaultValues: {
      productId: "",
      fromWarehouseId: "",
      toWarehouseId: "",
      quantity: "",
    },
  });

  const watchedProductId = watch("productId");
  const watchedFromWarehouseId = watch("fromWarehouseId");
  const watchedQuantity = watch("quantity");

  const handleOpen = () => {
    setOpen(true);
    reset();
  };

  const handleClose = (event?: {}, reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }
    setOpen(false);
    reset();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (data: TransferFormData) => {
    createTransfer.mutate(
      {
        productId: parseInt(data.productId),
        fromWarehouseId: parseInt(data.fromWarehouseId),
        toWarehouseId: parseInt(data.toWarehouseId),
        quantity: parseInt(data.quantity),
      },
      {
        onSuccess: () => {
          setSnackbarMessage("Transfer created successfully!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          handleClose();
        },
        onError: () => {
          setSnackbarMessage(
            createTransfer.error?.message || "Failed to create transfer"
          );
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        },
      }
    );
  };

  const getProductName = (productId: number) => {
    const product = products.find((p: any) => p.id === productId);
    return product ? `${product.name} (${product.sku})` : "Unknown";
  };

  const getWarehouseName = (warehouseId: number) => {
    const warehouse = warehouses.find((w: any) => w.id === warehouseId);
    return warehouse ? `${warehouse.name} (${warehouse.code})` : "Unknown";
  };

  const getAvailableStock = () => {
    if (!watchedProductId || !watchedFromWarehouseId) return null;
    const stockItem = stock.find(
      (s: any) =>
        s.productId === parseInt(watchedProductId) &&
        s.warehouseId === parseInt(watchedFromWarehouseId)
    );
    return stockItem ? stockItem.quantity : 0;
  };

  const availableStock = getAvailableStock();
  const availableWarehouses = warehouses.filter(
    (w: any) => w.id !== parseInt(watchedFromWarehouseId || "0")
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        if (!params.value) return <Box />;
        return <Box>{formatDate(params.value)}</Box>;
      },
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1.5,
      minWidth: 200,
    },
    {
      field: "from",
      headerName: "From",
      flex: 1.2,
      minWidth: 180,
    },
    {
      field: "to",
      headerName: "To",
      flex: 1.2,
      minWidth: 180,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.8,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
    },
  ];

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
          Stock Transfers
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Initiate Transfer
        </Button>
      </Box>

      {transfersLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : transfersError ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error loading transfers: {transfersError.message}
        </Alert>
      ) : (
        <Box sx={{ width: "100%", mt: 2 }}>
          <DataGrid
            rows={transfers
              .slice()
              .sort((a: any, b: any) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
              .map((t: any) => ({
                id: t.id,
                date: t.date,
                product: getProductName(t.productId),
                from: getWarehouseName(t.fromWarehouseId),
                to: getWarehouseName(t.toWarehouseId),
                quantity: t.quantity,
              }))}
            columns={columns}
            pageSizeOptions={[5, 10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            pagination
            autoHeight={false}
            disableRowSelectionOnClick
            getRowHeight={() => 52}
            sx={{
              width: "100%",
              height: 628,
              "& .MuiDataGrid-main": {
                overflow: "hidden",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflow: "hidden !important",
              },
              "& .MuiDataGrid-virtualScrollerContent": {
                height: "520px !important",
                overflow: "hidden !important",
              },
            }}
          />
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Initiate Stock Transfer</DialogTitle>
          <DialogContent>
            <Controller
              name="productId"
              control={control}
              rules={{ required: "Product is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  select
                  label="Product"
                  error={!!errors.productId}
                  helperText={errors.productId?.message}
                  disabled={createTransfer.isPending || isLoading}
                >
                  {products.map((product: any) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} ({product.sku})
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="fromWarehouseId"
              control={control}
              rules={{ required: "From warehouse is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  select
                  label="From Warehouse"
                  error={!!errors.fromWarehouseId}
                  helperText={errors.fromWarehouseId?.message}
                  disabled={createTransfer.isPending || isLoading}
                >
                  {warehouses.map((warehouse: any) => (
                    <MenuItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name} ({warehouse.code})
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {availableStock !== null && (
              <Alert severity="info" sx={{ mb: 1, mt: 1 }}>
                Available stock: {availableStock} units
              </Alert>
            )}

            <Controller
              name="toWarehouseId"
              control={control}
              rules={{
                required: "To warehouse is required",
                validate: (value) => {
                  if (value === watchedFromWarehouseId) {
                    return "Cannot transfer to the same warehouse";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  select
                  label="To Warehouse"
                  disabled={
                    !watchedFromWarehouseId ||
                    createTransfer.isPending ||
                    isLoading
                  }
                  error={!!errors.toWarehouseId}
                  helperText={errors.toWarehouseId?.message}
                >
                  {availableWarehouses.map((warehouse: any) => (
                    <MenuItem key={warehouse.id} value={warehouse.id}>
                      {warehouse.name} ({warehouse.code})
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="quantity"
              control={control}
              rules={{
                required: "Quantity is required",
                validate: (value) => {
                  const numValue = parseInt(value);
                  if (isNaN(numValue) || numValue < 1) {
                    return "Quantity must be at least 1";
                  }
                  if (availableStock !== null && numValue > availableStock) {
                    return `Quantity cannot exceed available stock (${availableStock})`;
                  }
                  if (!/^\d+$/.test(value)) {
                    return "Quantity must be a whole number";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Quantity"
                  type="number"
                  inputProps={{
                    min: "1",
                    max: availableStock || undefined,
                    step: "1",
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d+$/.test(value)) {
                      field.onChange(e);
                    }
                  }}
                  error={!!errors.quantity}
                  disabled={createTransfer.isPending || isLoading}
                  helperText={
                    errors.quantity?.message ||
                    (availableStock !== null
                      ? `Maximum: ${availableStock} units`
                      : "Select product and source warehouse first")
                  }
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              disabled={createTransfer.isPending || isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                createTransfer.isPending ||
                !watchedProductId ||
                !watchedFromWarehouseId ||
                !watchedQuantity ||
                !watch("toWarehouseId")
              }
              startIcon={
                createTransfer.isPending ? (
                  <CircularProgress size={16} color="inherit" />
                ) : null
              }
            >
              {createTransfer.isPending ? "Transferring..." : "Transfer Stock"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

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
