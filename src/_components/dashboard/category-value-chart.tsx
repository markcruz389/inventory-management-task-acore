import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface InventoryOverviewItem {
  category: string;
  totalQuantity: number;
  unitCost: number;
}

export const CategoryValueChart = ({
  inventoryOverview,
}: {
  inventoryOverview: InventoryOverviewItem[];
}) => {
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
            series={[
              {
                data: categoryValueData,
                highlightScope: {
                  fade: "global",
                  highlight: "item",
                },
                valueFormatter: (value) => `$${value.value.toFixed(2)}`,
              },
            ]}
            height={280}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
