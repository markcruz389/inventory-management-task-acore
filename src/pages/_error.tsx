import { NextPageContext } from "next";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/router";

interface ErrorProps {
  statusCode: number;
}

function Error({ statusCode }: ErrorProps) {
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
          {statusCode || "Error"}
        </Typography>
        <Typography variant="h5" component="h2">
          {statusCode === 404
            ? "Page not found"
            : statusCode === 500
            ? "Internal server error"
            : "An error occurred"}
        </Typography>
        <Button variant="contained" onClick={() => router.push("/")}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
