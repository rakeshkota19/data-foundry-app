import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useAuthenticator } from "@aws-amplify/ui-react";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate, useLocation } from "react-router-dom";
import { routes } from "../../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, authStatus } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
  ]);
  const isAuthenticated = authStatus === "authenticated";

  const handleSignOut = () => {
    signOut();
    navigate(routes.home);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  const getButtonStyle = (path) => ({
    mx: 1,
    opacity: location.pathname === path ? 1 : 0.85,
    borderBottom: location.pathname === path ? "2px solid white" : "none",
    borderRadius: 0,
    paddingBottom: "4px",
    textTransform: "none",
  });

  return (
    // TODO make the header mobile friendly
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          onClick={() => navigateTo(routes.home)}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="h6" component="div" sx={{ mr: 3 }}>
            Service Portal
          </Typography>
        </Box>

        <Box>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => navigateTo(routes.home)}
            sx={getButtonStyle("/")}
          >
            Home
          </Button>

          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                startIcon={<DashboardIcon />}
                onClick={() => navigateTo(routes.dashboard)}
                sx={getButtonStyle("/dashboard")}
              >
                Dashboard
              </Button>

              <Button
                color="inherit"
                startIcon={<FolderIcon />}
                onClick={() => navigateTo(routes.files)}
                sx={getButtonStyle("/files")}
              >
                Files
              </Button>
            </>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Box display="flex" alignItems="center">
          {isAuthenticated ? (
            <Box display="flex" alignItems="center">
              <Typography> Hi, User</Typography>

              <Button color="inherit" onClick={handleSignOut}>
                <ExitToAppIcon sx={{ mr: 1 }} />
                Log out
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => navigateTo(routes.login)}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
