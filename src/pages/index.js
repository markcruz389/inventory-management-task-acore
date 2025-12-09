import { useState } from "react";
import Link from "next/link";
import {
  Typography,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Alert,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import { useProducts } from "@/_hooks/use-products";
import { useWarehouses } from "@/_hooks/use-warehouses";
import { useStock } from "@/_hooks/use-stock";
import {
  DashboardSkeleton,
  CategoryValueChart,
  WarehouseStockChart,
  StockHealthChart,
  ProductDistributionChart,
  CostQuantityChart,
  InventoryOverview,
} from "@/_components/dashboard";

export default function Home() {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
  const error = productsError || warehousesError || stockError;

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  // Get products with stock across all warehouses
  const inventoryOverview = products.map((product) => {
    const productStock = stock.filter((s) => s.productId === product.id);
    const totalQuantity = productStock.reduce((sum, s) => sum + s.quantity, 0);
    return {
      ...product,
      totalQuantity,
      isLowStock: totalQuantity < product.reorderPoint,
    };
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <InventoryIcon sx={{ mr: { xs: 1, sm: 2 } }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            Inventory Management System
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "block", sm: "none" },
            }}
          >
            Inventory
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button color="inherit" component={Link} href="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} href="/warehouses">
              Warehouses
            </Button>
            <Button color="inherit" component={Link} href="/stock">
              Stock Levels
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="menu"
            aria-controls="mobile-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-menu"
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              component={Link}
              href="/products"
              onClick={handleMobileMenuClose}
            >
              Products
            </MenuItem>
            <MenuItem
              component={Link}
              href="/warehouses"
              onClick={handleMobileMenuClose}
            >
              Warehouses
            </MenuItem>
            <MenuItem
              component={Link}
              href="/stock"
              onClick={handleMobileMenuClose}
            >
              Stock Levels
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 2, sm: 3 },
          maxWidth: "lg",
          mx: "auto",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        {error ? (
          <Alert severity="error">Error loading data: {error.message}</Alert>
        ) : isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <InventoryOverview
              products={products}
              warehouses={warehouses}
              stock={stock}
              inventoryOverview={inventoryOverview}
            />

            {/* Charts Row 1: Pie Chart & Warehouse Stock Bar Chart */}
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <CategoryValueChart inventoryOverview={inventoryOverview} />
              </Grid>
              <Grid item xs={12} md={6}>
                <WarehouseStockChart warehouses={warehouses} stock={stock} />
              </Grid>
            </Grid>

            {/* Charts Row 2: Stock Level vs Reorder Point */}
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <StockHealthChart inventoryOverview={inventoryOverview} />
              </Grid>
            </Grid>

            {/* Charts Row 3: Product Distribution & Scatter Chart */}
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} md={7}>
                <ProductDistributionChart
                  products={products}
                  warehouses={warehouses}
                  stock={stock}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <CostQuantityChart inventoryOverview={inventoryOverview} />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}
