import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import CategoryIcon from "@mui/icons-material/Category";
import { formatNumber, formatCurrency } from "@/_utils";

export const InventoryOverview = ({
  products,
  warehouses,
  stock,
  inventoryOverview,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Calculate total inventory value
  const totalValue = stock.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    return sum + (product ? product.unitCost * item.quantity : 0);
  }, 0);

  return (
    <>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 0.5, sm: 1 },
                }}
              >
                <CategoryIcon
                  sx={{
                    mr: 1,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    color: "primary.main",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}
                >
                  Total Products
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "3rem" },
                  fontWeight: "bold",
                }}
              >
                {formatNumber(products.length)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 0.5, sm: 1 },
                }}
              >
                <WarehouseIcon
                  sx={{
                    mr: 1,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    color: "primary.main",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}
                >
                  Warehouses
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "3rem" },
                  fontWeight: "bold",
                }}
              >
                {formatNumber(warehouses.length)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: { xs: 0.5, sm: 1 },
                }}
              >
                <InventoryIcon
                  sx={{
                    mr: 1,
                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    color: "primary.main",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontSize: { xs: "0.875rem", sm: "1.25rem" } }}
                >
                  Total Inventory Value
                </Typography>
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "3rem" },
                  fontWeight: "bold",
                }}
              >
                {formatCurrency(totalValue)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Inventory Overview Table */}
      <TableContainer
        component={Paper}
        sx={{
          mb: 4,
          maxWidth: "100%",
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        <Table sx={{ minWidth: isMobile ? 800 : "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                SKU
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: "bold",
                  minWidth: { xs: 150, sm: "auto" },
                }}
              >
                Product Name
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: "bold",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Category
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                Total Stock
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: "bold",
                  display: { xs: "none", sm: "table-cell" },
                  whiteSpace: "nowrap",
                }}
              >
                Reorder Point
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryOverview.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: item.isLowStock ? "#fff3e0" : "inherit",
                }}
              >
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.sku}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    minWidth: { xs: 150, sm: "auto" },
                  }}
                >
                  {item.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  {item.category}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatNumber(item.totalQuantity)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    display: { xs: "none", sm: "table-cell" },
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatNumber(item.reorderPoint)}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.isLowStock ? (
                    <Typography
                      color="warning.main"
                      fontWeight="bold"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      Low Stock
                    </Typography>
                  ) : (
                    <Typography
                      color="success.main"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      In Stock
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
