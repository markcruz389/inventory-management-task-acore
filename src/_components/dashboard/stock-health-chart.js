import { Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export const StockHealthChart = ({ inventoryOverview }) => {
  const stockHealthData = {
    productNames: inventoryOverview.map((p) => p.name),
    currentStock: inventoryOverview.map((p) => p.totalQuantity),
    reorderPoints: inventoryOverview.map((p) => p.reorderPoint),
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stock Level vs Reorder Point
        </Typography>
        <Box sx={{ width: "100%", height: 300 }}>
          <BarChart
            yAxis={[
              {
                scaleType: "band",
                data: stockHealthData.productNames,
              },
            ]}
            series={[
              {
                data: stockHealthData.currentStock,
                label: "Current Stock",
              },
              {
                data: stockHealthData.reorderPoints,
                label: "Reorder Point",
              },
            ]}
            layout="horizontal"
            height={280}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
