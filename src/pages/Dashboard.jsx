import React, { useState, useEffect } from "react";
import { Container, Box, Paper, Typography } from "@mui/material";
import { DataStore } from "@aws-amplify/datastore";
import { ServiceRequest } from "../../models";
// import { Storage } from "aws-amplify";

import LoadingSpinner from "../components/LoadingSpinner";
import { CreateServiceRequestButton } from "../components/ServiceRequest";
import ServiceRequestTable from "../components/Dashboard/ServiceRequestTable";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [s3Files, setS3Files] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();

    // Subscribe to changes in ServiceRequest model
    const subscription = DataStore.observe(ServiceRequest).subscribe(() => {
      fetchServiceRequests();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchServiceRequests(), fetchS3Files()]);
    setLoading(false);
  };

  const fetchServiceRequests = async () => {
    try {
      const data = await DataStore.query(ServiceRequest);
      setServiceRequests(data);
      return data;
    } catch (error) {
      console.error("Error fetching service requests:", error);
      return [];
    }
  };

  const fetchS3Files = async () => {
    try {
      // const data = await Storage.list("");
      // setS3Files(data.results);
      // return data;
    } catch (error) {
      console.error("Error fetching S3 files:", error);
      return [];
    }
  };

  const handleRequestCreated = () => {
    fetchServiceRequests();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Service Request Dashboard
        </Typography>
        <Typography variant="body1" color="textSecondary">
          View and manage service requests
        </Typography>
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
