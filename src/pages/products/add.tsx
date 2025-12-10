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
  Alert,
} from "@mui/material";
import { useCreateProduct } from "@/_hooks/use-create-product";

export default function AddProduct() {
  const [product, setProduct] = useState({
    sku: "",
    name: "",
    category: "",
    unitCost: "",
    reorderPoint: "",
  });

  const router = useRouter();
  const createProduct = useCreateProduct();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createProduct.mutate(
      {
        ...product,
        unitCost: parseFloat(product.unitCost),
        reorderPoint: parseInt(product.reorderPoint),
      },
      {
        onSuccess: () => {
          router.push("/products");
        },
      }
    );
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Product
        </Typography>

        {createProduct.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {createProduct.error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="SKU"
            name="sku"
            value={product.sku}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Category"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Unit Cost"
            name="unitCost"
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            value={product.unitCost}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Reorder Point"
            name="reorderPoint"
            type="number"
            inputProps={{ min: "0" }}
            value={product.reorderPoint}
            onChange={handleChange}
          />
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? "Adding..." : "Add Product"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              href="/products"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
