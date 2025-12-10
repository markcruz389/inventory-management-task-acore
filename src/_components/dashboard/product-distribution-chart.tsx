import { Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { tealChartColors } from "@/_theme/theme";

interface Product {
  id: number;
  name: string;
}

interface Warehouse {
  id: number;
  code: string;
  location: string;
}

interface StockItem {
  productId: number;
  warehouseId: number;
  quantity: number;
}

export const ProductDistributionChart = ({
  products,
  warehouses,
  stock,
  productsError,
  warehousesError,
  stockError,
}: {
  products: Product[];
  warehouses: Warehouse[];
  stock: StockItem[];
  productsError?: Error | null;
  warehousesError?: Error | null;
  stockError?: Error | null;
}) => {
  if (productsError || warehousesError || stockError) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Product Distribution Across Warehouses
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: "4rem",
                color: "error.main",
                mb: 2,
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              Unable to load chart data
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                mt: 1,
              }}
            >
              Please try again later
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const productDistributionData = {
    productNames: products.map((p) => {
      // Truncate long product names for better display
      const maxLength = 10;
      return p.name.length > maxLength
        ? `${p.name.substring(0, maxLength)}...`
        : p.name;
    }),
    warehouseSeries: warehouses.map((warehouse, index) => ({
      data: products.map((product) => {
        const stockItem = stock.find(
          (s) => s.productId === product.id && s.warehouseId === warehouse.id
        );
        return stockItem ? stockItem.quantity : 0;
      }),
      label: `${warehouse.location} (${warehouse.code})`,
      stack: "total",
      color: tealChartColors[index % tealChartColors.length],
    })),
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Product Distribution Across Warehouses
        </Typography>
        <Box sx={{ width: "100%", height: 300 }}>
          <BarChart
            colors={tealChartColors}
            xAxis={[
              {
                scaleType: "band",
                data: productDistributionData.productNames,
              },
            ]}
            series={productDistributionData.warehouseSeries}
            height={280}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
