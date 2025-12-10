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
import { useWarehouse } from "@/_hooks/use-warehouse";
import { useUpdateWarehouse } from "@/_hooks/use-update-warehouse";

export default function EditWarehouse() {
  const router = useRouter();
  const { id } = router.query;

  const { data: warehouseData, isLoading, error } = useWarehouse(id as string);
  const updateWarehouse = useUpdateWarehouse();

  const [warehouse, setWarehouse] = useState({
    name: "",
    location: "",
    code: "",
  });

  useEffect(() => {
    if (warehouseData) {
      setWarehouse(warehouseData);
    }
  }, [warehouseData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarehouse({ ...warehouse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateWarehouse.mutate(
      { id: id as string, ...warehouse },
      {
        onSuccess: () => {
          router.push("/warehouses");
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
        <Alert severity="error">Error loading warehouse: {error.message}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Warehouse
        </Typography>

        {updateWarehouse.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {updateWarehouse.error.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Warehouse Code"
            name="code"
            value={warehouse.code}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Warehouse Name"
            name="name"
            value={warehouse.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Location"
            name="location"
            value={warehouse.location}
            onChange={handleChange}
          />
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={updateWarehouse.isPending}
            >
              {updateWarehouse.isPending ? "Updating..." : "Update Warehouse"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              component={Link}
              href="/warehouses"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
