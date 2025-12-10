import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Transfer = {
  id: number;
  productId: number;
  fromWarehouseId: number;
  toWarehouseId: number;
  quantity: number;
  date: string;
};

type TransfersTableProps = {
  transfers: Transfer[];
  getProductName: (productId: number) => string;
  getWarehouseName: (warehouseId: number) => string;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    minWidth: 200,
    renderCell: (params: any) => {
      if (!params.value) return <Box />;
      return <Box>{formatDate(params.value)}</Box>;
    },
  },
  {
    field: "product",
    headerName: "Product",
    flex: 1.5,
    minWidth: 200,
  },
  {
    field: "from",
    headerName: "From",
    flex: 1.2,
    minWidth: 180,
  },
  {
    field: "to",
    headerName: "To",
    flex: 1.2,
    minWidth: 180,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 0.8,
    minWidth: 120,
    align: "center",
    headerAlign: "center",
  },
];

export const TransfersTable = ({
  transfers,
  getProductName,
  getWarehouseName,
}: TransfersTableProps) => {
  const rows = transfers
    .slice()
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .map((t) => ({
      id: t.id,
      date: t.date,
      product: getProductName(t.productId),
      from: getWarehouseName(t.fromWarehouseId),
      to: getWarehouseName(t.toWarehouseId),
      quantity: t.quantity,
    }));

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSizeOptions={[]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        autoHeight={false}
        disableRowSelectionOnClick
        getRowHeight={() => 52}
        sx={{
          width: "100%",
          height: 628,
          "& .MuiDataGrid-main": {
            overflow: "hidden",
          },
          "& .MuiDataGrid-virtualScroller": {
            overflow: "hidden !important",
          },
          "& .MuiDataGrid-virtualScrollerContent": {
            height: "520px !important",
            overflow: "hidden !important",
          },
        }}
      />
    </Box>
  );
};
