import React from "react";
import { Container, Box, Paper, Typography } from "@mui/material";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";

const Login = () => {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (authStatus === "authenticated") {
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from);
    }
  }, [authStatus, navigate, location]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please sign in to access the service portal
          </Typography>
        </Box>

        <Authenticator />
      </Paper>
    </Container>
  );
};

export default Login;
