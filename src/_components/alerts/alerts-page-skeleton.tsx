import {
  Container,
  Box,
  Skeleton,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { AlertsTableSkeleton } from "./alerts-table-skeleton";

export const AlertsPageSkeleton = () => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Header Skeleton */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width={180} height={36} />
      </Box>

      {/* Summary Cards Skeleton */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={6} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={40} height={48} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={40} height={48} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table Skeleton */}
      <AlertsTableSkeleton />
    </Container>
  );
};
