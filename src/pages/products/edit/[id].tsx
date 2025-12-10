import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useProduct } from "@/_hooks/use-product";
import { useUpdateProduct } from "@/_hooks/use-update-product";

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  const { data: productData, isLoading, error } = useProduct(id as string);
  const updateProduct = useUpdateProduct();

  const [product, setProduct] = useState({
    sku: "",
    name: "",
    category: "",
    unitCost: "",
    reorderPoint: "",
  });

  useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct.mutate(
      {
        id: id as string,
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

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">Error loading product: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
        </Typography>

        {updateProduct.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {updateProduct.error.message}
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
              disabled={updateProduct.isPending}
            >
              {updateProduct.isPending ? "Updating..." : "Update Product"}
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
