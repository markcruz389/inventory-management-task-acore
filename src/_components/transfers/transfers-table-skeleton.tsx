import {
  Box,
  Skeleton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const TransfersTableSkeleton = () => {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <TableContainer component={Paper} sx={{ height: 628 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="text" width={120} height={24} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={150} height={24} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={130} height={24} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={130} height={24} />
              </TableCell>
              <TableCell align="center">
                <Skeleton variant="text" width={80} height={24} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width={180} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={200} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={180} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" width={180} height={24} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="text" width={60} height={24} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
