import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { useAlerts } from "@/_hooks/queries/use-alerts";
import Link from "next/link";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

export const AlertsSummary = () => {
  const { data: alerts = [], isLoading, error } = useAlerts();

  if (isLoading || error) {
    return null;
  }

  const criticalCount = alerts.filter(
    (a) => a.stockStatus === "critical"
  ).length;
  const lowCount = alerts.filter((a) => a.stockStatus === "low").length;
  const totalAlerts = criticalCount + lowCount;

  if (totalAlerts === 0) {
    return null;
  }

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <WarningIcon sx={{ mr: 1, color: "warning.main" }} />
              <Typography variant="h6" component="h2">
                Low Stock Alerts
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {criticalCount > 0 && (
                <Chip
                  icon={<ErrorIcon />}
                  label={`${criticalCount} Critical`}
                  color="error"
                  size="small"
                />
              )}
              {lowCount > 0 && (
                <Chip
                  label={`${lowCount} Low Stock`}
                  color="warning"
                  size="small"
                />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary">
              {totalAlerts} product{alerts.length !== 1 ? "s" : ""} require
              attention
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="warning"
              component={Link}
              href="/alerts"
              sx={{ whiteSpace: "nowrap" }}
            >
              View All Alerts
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
