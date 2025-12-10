import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { tealChartColors } from "@/_theme/theme";

interface InventoryOverviewItem {
  category: string;
  totalQuantity: number;
  unitCost: number;
}

export const CategoryValueChart = ({
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
            Inventory Value by Category
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

  const categoryValueData = Object.values(
    inventoryOverview.reduce((acc, product) => {
      const value = product.totalQuantity * product.unitCost;
      if (!acc[product.category]) {
        acc[product.category] = { label: product.category, value: 0 };
      }
      acc[product.category].value += value;
      return acc;
    }, {} as Record<string, { label: string; value: number }>)
  ).map((item, index) => ({ ...item, id: index }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Inventory Value by Category
        </Typography>
        <Box sx={{ width: "100%", height: 300 }}>
          <PieChart
            colors={tealChartColors}
            series={[
              {
                data: categoryValueData,
                highlightScope: {
                  fade: "global",
                  highlight: "item",
                },
                valueFormatter: (value) => `$${value.value.toFixed(2)}`,
                arcLabel: (item) => `$${item.value.toFixed(0)}`,
                arcLabelMinAngle: 20,
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
              },
            }}
            height={280}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
