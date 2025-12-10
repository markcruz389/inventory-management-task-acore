import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#009688",
      light: "#33ab9f",
      dark: "#00695f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF7043",
      light: "#FF8A65",
      dark: "#E64A19",
      contrastText: "#ffffff",
    },
  },
});

// Complementary color palette for charts - teal-based with good contrast
export const tealChartColors = [
  "#009688", // Teal - primary
  "#FF7043", // Deep Orange - complementary warm tone
  "#7B1FA2", // Purple - triadic contrast
  "#FFB300", // Amber - warm contrast
  "#1976D2", // Blue - analogous but distinct
  "#E91E63", // Pink - complementary vibrant
  "#4CAF50", // Green - analogous but different shade
  "#3F51B5", // Indigo - related but distinct
];
