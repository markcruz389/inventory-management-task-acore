import { useState } from "react";
import Link from "next/link";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useWarehouses } from "@/_hooks/queries/use-warehouses";
import { useDeleteWarehouse } from "@/_hooks/mutations/use-delete-warehouse";

export default function Warehouses() {
  const [open, setOpen] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<number | null>(
    null
  );

  const { data: warehouses = [], isLoading, error } = useWarehouses();
  const deleteWarehouse = useDeleteWarehouse();

  const handleClickOpen = (id: number) => {
    setSelectedWarehouseId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWarehouseId(null);
  };

  const handleDelete = async () => {
    if (selectedWarehouseId !== null) {
      deleteWarehouse.mutate(selectedWarehouseId, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
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
        <Alert severity="error">
          Error loading warehouses: {error.message}
        </Alert>
      </Container>
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
          Warehouses
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/warehouses/add"
        >
          Add Warehouse
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Code</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Location</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses.map((warehouse: any) => (
              <TableRow key={warehouse.id}>
                <TableCell>{warehouse.code}</TableCell>
                <TableCell>{warehouse.name}</TableCell>
                <TableCell>{warehouse.location}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    component={Link}
                    href={`/warehouses/edit/${warehouse.id}`}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleClickOpen(warehouse.id)}
                    size="small"
                    disabled={deleteWarehouse.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {warehouses.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No warehouses available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Warehouse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this warehouse? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            autoFocus
            disabled={deleteWarehouse.isPending}
          >
            {deleteWarehouse.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
