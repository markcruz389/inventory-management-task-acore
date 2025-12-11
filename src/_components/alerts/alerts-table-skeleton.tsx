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

export const AlertsTableSkeleton = () => {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton variant="text" width={120} height={24} />
              </TableCell>
              <TableCell align="center">
                <Skeleton variant="text" width={100} height={24} />
              </TableCell>
              <TableCell align="center">
                <Skeleton variant="text" width={100} height={24} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={80} height={24} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={80} height={24} />
              </TableCell>
              <TableCell align="right">
                <Skeleton variant="text" width={100} height={24} />
              </TableCell>
              <TableCell align="center">
                <Skeleton variant="text" width={100} height={24} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" width={200} height={24} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="rectangular" width={80} height={24} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="rectangular" width={80} height={24} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width={60} height={24} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width={60} height={24} />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width={60} height={24} />
                </TableCell>
                <TableCell align="center">
                  <Skeleton variant="rectangular" width={120} height={32} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

