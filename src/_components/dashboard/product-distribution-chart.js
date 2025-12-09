import { Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export const ProductDistributionChart = ({ products, warehouses, stock }) => {
  const productDistributionData = {
    productNames: products.map((p) => {
      // Truncate long product names for better display
      const maxLength = 10;
      return p.name.length > maxLength
        ? `${p.name.substring(0, maxLength)}...`
        : p.name;
    }),
    warehouseSeries: warehouses.map((warehouse) => ({
      data: products.map((product) => {
        const stockItem = stock.find(
          (s) => s.productId === product.id && s.warehouseId === warehouse.id
        );
        return stockItem ? stockItem.quantity : 0;
      }),
      label: `${warehouse.location} (${warehouse.code})`,
      stack: "total",
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
