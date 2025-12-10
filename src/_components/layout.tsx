import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<HTMLElement | null>(
    null
  );

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <InventoryIcon sx={{ mr: { xs: 1, sm: 2 } }} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
          }}
        >
          Inventory Management System
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "block", sm: "none" },
          }}
        >
          Inventory
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button color="inherit" component={Link} href="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} href="/warehouses">
            Warehouses
          </Button>
          <Button color="inherit" component={Link} href="/stock">
            Stock Levels
          </Button>
        </Box>
        <IconButton
          color="inherit"
          aria-label="menu"
          aria-controls="mobile-menu"
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="mobile-menu"
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            component={Link}
            href="/products"
            onClick={handleMobileMenuClose}
          >
            Products
          </MenuItem>
          <MenuItem
            component={Link}
            href="/warehouses"
            onClick={handleMobileMenuClose}
          >
            Warehouses
          </MenuItem>
          <MenuItem
            component={Link}
            href="/stock"
            onClick={handleMobileMenuClose}
          >
            Stock Levels
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Inventory Management System. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px - 80px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
