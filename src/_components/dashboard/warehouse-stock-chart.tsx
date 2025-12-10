import { Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

interface Warehouse {
  id: number;
  code: string;
}

interface StockItem {
  warehouseId: number;
  quantity: number;
}

export const WarehouseStockChart = ({
  warehouses,
  stock,
}: {
  warehouses: Warehouse[];
  stock: StockItem[];
}) => {
  const warehouseStockData = warehouses.map((warehouse) => {
    const warehouseStock = stock.filter((s) => s.warehouseId === warehouse.id);
    const totalQuantity = warehouseStock.reduce(
      (sum, s) => sum + s.quantity,
      0
    );
    return { warehouse: warehouse.code, quantity: totalQuantity };
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Stock Distribution by Warehouse
        </Typography>
        <Box sx={{ width: "100%", height: 300 }}>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: warehouseStockData.map((d) => d.warehouse),
              },
            ]}
            series={[
              {
                data: warehouseStockData.map((d) => d.quantity),
                label: "Total Stock",
              },
            ]}
            height={280}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
