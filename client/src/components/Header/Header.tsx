import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  Chip,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderIcon from "@mui/icons-material/Folder";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useThemeMode } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import palette from "../../theme/palette";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeMode();
  const { logout } = useAuth();

  // Check if user is in a tracker view
  const isInTrackerView = location.pathname.startsWith("/tracker/");

  const menuItems = [
    { text: "Trackers", icon: <FolderIcon />, path: "/trackers" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: palette.background.paper,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${palette.border.light}`,
          boxShadow: `0 2px 12px ${palette.shadows.light}`,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 }, px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexGrow: 1 }}>
            <Box
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: palette.gradients.primary,
                boxShadow: `0 4px 12px ${palette.shadows.medium}`,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: `0 6px 16px ${palette.shadows.strong}`,
                },
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: '#fff', fontSize: { xs: 20, sm: 24 } }} />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                background: palette.gradients.primary,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}
            >
              Expense Tracker
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
            <IconButton
              onClick={toggleTheme}
              sx={{ 
                color: palette.text.secondary,
                background: palette.background.subtle,
                "&:hover": {
                  background: palette.border.light,
                  color: palette.text.primary,
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s",
              }}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </IconButton>

            {isMobile ? (
              <IconButton
                edge="end"
                onClick={() => setDrawerOpen(true)}
                sx={{ 
                  ml: 0.5,
                  color: palette.text.secondary,
                  background: palette.background.subtle,
                  "&:hover": {
                    background: palette.border.light,
                    color: palette.text.primary,
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
                <Button
                  startIcon={<FolderIcon fontSize="small" />}
                  onClick={() => navigate("/trackers")}
                  sx={{
                    color: location.pathname === "/trackers" || isInTrackerView 
                      ? '#fff' 
                      : palette.text.primary,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    px: 2.5,
                    py: 0.75,
                    borderRadius: 2.5,
                    background: location.pathname === "/trackers" || isInTrackerView 
                      ? palette.gradients.primary
                      : palette.background.subtle,
                    boxShadow: location.pathname === "/trackers" || isInTrackerView 
                      ? `0 4px 12px ${palette.shadows.medium}` 
                      : "none",
                    "&:hover": {
                      background: location.pathname === "/trackers" || isInTrackerView 
                        ? palette.gradients.primary
                        : palette.border.light,
                      transform: "translateY(-1px)",
                      boxShadow: `0 6px 16px ${palette.shadows.medium}`,
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Trackers
                </Button>
                <Button
                  startIcon={<AccountCircleIcon fontSize="small" />}
                  onClick={() => navigate("/profile")}
                  sx={{
                    color: location.pathname === "/profile" 
                      ? '#fff' 
                      : palette.text.primary,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    px: 2.5,
                    py: 0.75,
                    borderRadius: 2.5,
                    background: location.pathname === "/profile" 
                      ? palette.gradients.primary
                      : palette.background.subtle,
                    boxShadow: location.pathname === "/profile" 
                      ? `0 4px 12px ${palette.shadows.medium}` 
                      : "none",
                    "&:hover": {
                      background: location.pathname === "/profile" 
                        ? palette.gradients.primary
                        : palette.border.light,
                      transform: "translateY(-1px)",
                      boxShadow: `0 6px 16px ${palette.shadows.medium}`,
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Profile
                </Button>
                <Button
                  startIcon={<LogoutIcon fontSize="small" />}
                  onClick={handleLogout}
                  sx={{
                    color: palette.text.accent,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    px: 2.5,
                    py: 0.75,
                    borderRadius: 2.5,
                    background: palette.background.subtle,
                    border: `1px solid ${palette.border.default}`,
                    "&:hover": {
                      background: `${palette.status.error.bg}`,
                      borderColor: palette.status.error.main,
                      color: palette.status.error.main,
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer 
        anchor="right" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: palette.background.paper,
            color: palette.text.primary,
            boxShadow: `-4px 0 20px ${palette.shadows.medium}`,
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar 
                sx={{ 
                  width: 48, 
                  height: 48,
                  background: palette.gradients.primary,
                  boxShadow: `0 4px 12px ${palette.shadows.medium}`,
                }}
              >
                <AccountBalanceWalletIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: "1.1rem", color: palette.text.primary }}>
                  Expense Tracker
                </Typography>
                <Chip 
                  label="Premium" 
                  size="small" 
                  sx={{ 
                    height: 20,
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: palette.status.success.bg,
                    color: palette.primary.main,
                    mt: 0.5,
                    border: `1px solid ${palette.border.light}`,
                  }} 
                />
              </Box>
            </Box>
            <IconButton 
              onClick={() => setDrawerOpen(false)}
              sx={{ 
                color: palette.text.secondary,
                "&:hover": {
                  background: palette.background.subtle,
                  color: palette.text.primary,
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ borderColor: palette.border.light }} />

          <List sx={{ flexGrow: 1, px: 2, py: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    borderRadius: 2.5,
                    py: 1.5,
                    "&.Mui-selected": {
                      background: palette.gradients.primary,
                      color: '#fff',
                      boxShadow: `0 4px 12px ${palette.shadows.medium}`,
                      "& .MuiListItemIcon-root": {
                        color: '#fff',
                      },
                      "&:hover": {
                        background: palette.gradients.primary,
                      },
                    },
                    "&:hover": {
                      background: palette.background.subtle,
                    },
                    transition: "all 0.2s",
                  }}
                >
                  <ListItemIcon sx={{ color: palette.text.secondary, minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: location.pathname === item.path ? 700 : 500,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: palette.border.light }} />

          <Box sx={{ p: 2 }}>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 2.5,
                py: 1.5,
                border: `1px solid ${palette.border.default}`,
                background: palette.background.subtle,
                "&:hover": {
                  background: palette.status.error.bg,
                  borderColor: palette.status.error.main,
                  color: palette.status.error.main,
                  "& .MuiListItemIcon-root": {
                    color: palette.status.error.main,
                  },
                },
                transition: "all 0.2s",
              }}
            >
              <ListItemIcon sx={{ color: palette.text.accent, minWidth: 40 }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: palette.text.accent,
                }}
              />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
