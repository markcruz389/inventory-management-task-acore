import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h5" component="h2">
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you are looking for does not exist.
        </Typography>
        <Button variant="contained" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
