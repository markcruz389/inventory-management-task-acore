import { Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { tealChartColors } from "@/_theme/theme";

interface InventoryOverviewItem {
  name: string;
  totalQuantity: number;
  reorderPoint: number;
}

export const StockHealthChart = ({
  inventoryOverview,
  productsError,
  stockError,
}: {
  inventoryOverview: InventoryOverviewItem[];
  productsError?: Error | null;
  stockError?: Error | null;
}) => {
  if (productsError || stockError) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Stock Level vs Reorder Point
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
            colors={[tealChartColors[0], tealChartColors[2]]}
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
