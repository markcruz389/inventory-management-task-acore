import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCreateStock } from "@/_hooks/use-create-stock";
import { useProducts } from "@/_hooks/use-products";
import { useWarehouses } from "@/_hooks/use-warehouses";

export default function AddStock() {
  const [stock, setStock] = useState({
    productId: "",
    warehouseId: "",
    quantity: "",
  });

  const router = useRouter();
  const createStock = useCreateStock();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: warehouses = [], isLoading: warehousesLoading } =
    useWarehouses();

  const isLoading = productsLoading || warehousesLoading;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createStock.mutate(
      {
        productId: parseInt(stock.productId),
        warehouseId: parseInt(stock.warehouseId),
        quantity: parseInt(stock.quantity),
      },
      {
        onSuccess: () => {
          router.push("/stock");
        },
      }
    );
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
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Stock Record
        </Typography>

        {createStock.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {createStock.error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Product"
            name="productId"
            value={stock.productId}
            onChange={handleChange}
          >
            {products.map((product: any) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name} ({product.sku})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            select
            label="Warehouse"
            name="warehouseId"
            value={stock.warehouseId}
            onChange={handleChange}
          >
            {warehouses.map((warehouse: any) => (
              <MenuItem key={warehouse.id} value={warehouse.id}>
                {warehouse.name} ({warehouse.code})
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            inputProps={{ min: "0" }}
            value={stock.quantity}
            onChange={handleChange}
          />
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={createStock.isPending}
            >
              {createStock.isPending ? "Adding..." : "Add Stock"}
            </Button>
            <Button fullWidth variant="outlined" component={Link} href="/stock">
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
