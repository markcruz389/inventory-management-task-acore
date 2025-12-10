import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<HTMLElement | null>(
    null
  );

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(path);
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
          <Button
            color="inherit"
            component={Link}
            href="/"
            sx={{
              borderBottom: isActive("/") ? 2 : 0,
              borderColor: "inherit",
              borderRadius: 0,
              pb: 0.5,
            }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/products"
            sx={{
              borderBottom: isActive("/products") ? 2 : 0,
              borderColor: "inherit",
              borderRadius: 0,
              pb: 0.5,
            }}
          >
            Products
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/warehouses"
            sx={{
              borderBottom: isActive("/warehouses") ? 2 : 0,
              borderColor: "inherit",
              borderRadius: 0,
              pb: 0.5,
            }}
          >
            Warehouses
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/stock"
            sx={{
              borderBottom: isActive("/stock") ? 2 : 0,
              borderColor: "inherit",
              borderRadius: 0,
              pb: 0.5,
            }}
          >
            Stock Levels
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/transfers"
            sx={{
              borderBottom: isActive("/transfers") ? 2 : 0,
              borderColor: "inherit",
              borderRadius: 0,
              pb: 0.5,
            }}
          >
            Transfers
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
            href="/"
            onClick={handleMobileMenuClose}
            selected={isActive("/")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  backgroundColor: "currentColor",
                },
              },
            }}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            component={Link}
            href="/products"
            onClick={handleMobileMenuClose}
            selected={isActive("/products")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  backgroundColor: "currentColor",
                },
              },
            }}
          >
            Products
          </MenuItem>
          <MenuItem
            component={Link}
            href="/warehouses"
            onClick={handleMobileMenuClose}
            selected={isActive("/warehouses")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  backgroundColor: "currentColor",
                },
              },
            }}
          >
            Warehouses
          </MenuItem>
          <MenuItem
            component={Link}
            href="/stock"
            onClick={handleMobileMenuClose}
            selected={isActive("/stock")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  backgroundColor: "currentColor",
                },
              },
            }}
          >
            Stock Levels
          </MenuItem>
          <MenuItem
            component={Link}
            href="/transfers"
            onClick={handleMobileMenuClose}
            selected={isActive("/transfers")}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  backgroundColor: "currentColor",
                },
              },
            }}
          >
            Transfers
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
