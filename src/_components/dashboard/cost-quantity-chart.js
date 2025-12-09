import { Card, CardContent, Typography, Box } from "@mui/material";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

export const CostQuantityChart = ({ inventoryOverview }) => {
  const costVsQuantityData = inventoryOverview.map((product) => ({
    x: product.unitCost,
    y: product.totalQuantity,
    id: product.name,
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Unit Cost vs Stock Quantity
        </Typography>
        <Box sx={{ width: "100%", height: 300 }}>
          <ScatterChart
            series={[
              {
                data: costVsQuantityData,
                label: "Products",
              },
            ]}
            xAxis={[{ label: "Unit Cost ($)" }]}
            yAxis={[{ label: "Stock Quantity" }]}
            height={280}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
