import { Box, Card, CardContent, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type AlertsErrorProps = {
  message?: string;
};

export const AlertsError = ({ message }: AlertsErrorProps) => {
  return (
    <Card
      sx={{
        mt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 400,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: 64, sm: 80 },
              height: { xs: 64, sm: 80 },
              borderRadius: "50%",
              bgcolor: "error.main",
            }}
          >
            <ErrorOutlineIcon
              sx={{
                fontSize: { xs: "2.5rem", sm: "3rem" },
                color: "white",
              }}
            />
          </Box>
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.125rem", sm: "1.5rem" },
            fontWeight: 500,
            color: "text.primary",
            mb: 1,
            textAlign: "center",
          }}
        >
          {message || "Unable to load alerts data"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" },
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Please try again later
        </Typography>
      </CardContent>
    </Card>
  );
};

