import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Header = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    signOut();
  };

  // Get user's initials for the avatar
  const getUserInitials = () => {
    if (!user || !user.attributes) return "U";
    const email = user.attributes.email || "";
    return email.charAt(0).toUpperCase();
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <DashboardIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Service Request Portal
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box display="flex" alignItems="center">
          <Tooltip title="Account settings">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <Avatar sx={{ bgcolor: "secondary.main", width: 35, height: 35 }}>
                {getUserInitials()}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem disabled>
              <Typography variant="body2">
                {user?.attributes?.email || "User"}
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
              <ExitToAppIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
