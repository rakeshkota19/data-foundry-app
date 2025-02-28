import React, { useState, useEffect } from "react";
import { Container, Box, Paper } from "@mui/material";

import LoadingSpinner from "../components/LoadingSpinner";
import { CreateServiceRequestButton } from "../components/ServiceRequest";
import ServiceRequestTable from "../components/Dashboard/ServiceRequestTable";
import { generateClient } from "aws-amplify/api";
const client = generateClient();

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    fetchData();

    const subscription = client.models.ServiceRequest.observeQuery().subscribe(
      () => {
        fetchServiceRequests();
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    fetchServiceRequests();
  };

  const fetchServiceRequests = async () => {
    try {
      setLoading(true);
      const data = await client.models.ServiceRequest.list();
      setServiceRequests(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching service requests:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleRequestCreated = () => {
    fetchServiceRequests();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <h3> Service Request Dashboard</h3>
        <p>View and manage service requests</p>
      </Box>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CreateServiceRequestButton onRequestCreated={handleRequestCreated} />
      </Box>

      <Paper elevation={2} sx={{ p: 3 }}>
        {loading ? (
          <LoadingSpinner message="Fetching service requests..." />
        ) : (
          <ServiceRequestTable
            serviceRequests={serviceRequests}
            loading={loading}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Dashboard;
