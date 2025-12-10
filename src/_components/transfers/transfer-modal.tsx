import { useForm, Controller } from "react-hook-form";
import {
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
} from "@mui/material";
import { useCreateTransfer } from "@/_hooks/use-create-transfer";

type TransferFormData = {
  productId: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  quantity: string;
};

type TransferModalProps = {
  open: boolean;
  onClose: () => void;
  products: any[];
  warehouses: any[];
  stock: any[];
  isLoading: boolean;
  onSuccess: () => void;
  onError: (message: string) => void;
};

export const TransferModal = ({
  open,
  onClose,
  products,
  warehouses,
  stock,
  isLoading,
  onSuccess,
  onError,
}: TransferModalProps) => {
  const createTransfer = useCreateTransfer();

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

  const handleClose = (event?: {}, reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }
    onClose();
    reset();
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
          onSuccess();
          handleClose();
        },
        onError: () => {
          onError(createTransfer.error?.message || "Failed to create transfer");
        },
      }
    );
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

  return (
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
  );
};
