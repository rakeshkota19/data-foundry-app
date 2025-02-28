import React from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { routes } from "../utils/constants";

const HomePage = () => {
  const navigate = useNavigate();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const isAuthenticated = authStatus === "authenticated";

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 4, md: 6 }, borderRadius: 2 }}>
        <Box textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 500 }}
          >
            Welcome to Service Portal
          </Typography>

          {!isAuthenticated && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate(routes.login)}
              sx={{ mt: 2, px: 4, py: 1.5 }}
            >
              Get Started
            </Button>
          )}

          {isAuthenticated && (
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(routes.dashboard)}
                sx={{ px: 3 }}
              >
                View Dashboard
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(routes.files)}
                sx={{ px: 3 }}
              >
                Browse Files
              </Button>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h5">Features</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              mt: 3,
            }}
          >
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Service Request Management
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create and track service requests
              </Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                File Repository
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Access files from S3 storage
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
