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
import { useCreateWarehouse } from "@/_hooks/use-create-warehouse";

export default function AddWarehouse() {
  const [warehouse, setWarehouse] = useState({
    name: "",
    location: "",
    code: "",
  });

  const router = useRouter();
  const createWarehouse = useCreateWarehouse();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWarehouse({ ...warehouse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createWarehouse.mutate(warehouse, {
      onSuccess: () => {
        router.push("/warehouses");
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Warehouse
        </Typography>

        {createWarehouse.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {createWarehouse.error.message}
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
              disabled={createWarehouse.isPending}
            >
              {createWarehouse.isPending ? "Adding..." : "Add Warehouse"}
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
