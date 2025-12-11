import { Typography, Grid, Box } from "@mui/material";
import { useProducts } from "@/_hooks/queries/use-products";
import { useWarehouses } from "@/_hooks/queries/use-warehouses";
import { useStock } from "@/_hooks/queries/use-stock";
import {
  DashboardSkeleton,
  CategoryValueChart,
  StockHealthChart,
  ProductDistributionChart,
  InventoryOverview,
} from "@/_components/dashboard";
import { AlertsSummary } from "@/_components/dashboard/alerts-summary";

export default function Home() {
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

  // Get products with stock across all warehouses
  const inventoryOverview = products.map((product: any) => {
    const productStock = stock.filter((s: any) => s.productId === product.id);
    const totalQuantity = productStock.reduce(
      (sum: number, s: any) => sum + s.quantity,
      0
    );
    return {
      ...product,
      totalQuantity,
      isLowStock: totalQuantity < product.reorderPoint,
    };
  });

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        px: { xs: 2, sm: 3 },
        pb: 2,
        maxWidth: "lg",
        mx: "auto",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <AlertsSummary />
          <InventoryOverview
            products={products}
            warehouses={warehouses}
            stock={stock}
            inventoryOverview={inventoryOverview}
            productsError={productsError}
            warehousesError={warehousesError}
            stockError={stockError}
          />

          {/* Charts Row 1: Stock Level vs Reorder Point */}
          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
            <Grid item xs={12}>
              <StockHealthChart
                inventoryOverview={inventoryOverview}
                productsError={productsError}
                stockError={stockError}
              />
            </Grid>
          </Grid>

          {/* Charts Row 2: Inventory Value by Category & Product Distribution */}
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} md={4}>
              <CategoryValueChart
                inventoryOverview={inventoryOverview}
                productsError={productsError}
                stockError={stockError}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <ProductDistributionChart
                products={products}
                warehouses={warehouses}
                stock={stock}
                productsError={productsError}
                warehousesError={warehousesError}
                stockError={stockError}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
