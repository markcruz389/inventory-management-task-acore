import {
  Box,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const DashboardSkeleton = () => {
  return (
    <>
      {/* Summary Cards Skeleton */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={4} key={item}>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Skeleton
                    variant="circular"
                    width={24}
                    height={24}
                    sx={{ mr: 1 }}
                  />
                  <Skeleton variant="text" width={120} height={28} />
                </Box>
                <Skeleton variant="text" width={100} height={64} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Table Skeleton */}
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <TableCell key={item}>
                  <Skeleton variant="text" width={80} height={24} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3, 4, 5].map((row) => (
              <TableRow key={row}>
                {[1, 2, 3, 4, 5, 6].map((cell) => (
                  <TableCell key={cell}>
                    <Skeleton
                      variant="text"
                      width={cell === 1 ? 100 : 80}
                      height={24}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
