import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Box, Typography } from "@mui/material";

const getSeverityChipColor = (severity) => {
  switch (severity) {
    case "High":
      return "error";
    case "Medium":
      return "warning";
    case "Low":
      return "success";
    default:
      return "default";
  }
};

const ServiceRequestTable = ({ serviceRequests, loading }) => {
  const columns = [
    {
      field: "id",
      headerName: "Case ID",
      flex: 0.7,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value.substring(0, 8)}...
        </Typography>
      ),
    },
    { field: "name", headerName: "Request Name", flex: 1.5 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "severity",
      headerName: "Severity",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getSeverityChipColor(params.value)}
          size="small"
        />
      ),
    },
    { field: "creationDate", headerName: "Created On", flex: 1 },
    { field: "resolutionDate", headerName: "Resolution By", flex: 1 },
    { field: "reporterName", headerName: "Reporter", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
  ];

  return (
    <div style={{ width: "100%", height: 500 }}>
      <DataGrid
        rows={serviceRequests}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 25]}
        disableSelectionOnClick
        loading={loading}
        autoHeight
        density="comfortable"
        initialState={{
          sorting: {
            sortModel: [{ field: "creationDate", sort: "desc" }],
          },
        }}
        sx={{
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: "1.25rem",
          },
        }}
        components={{
          NoRowsOverlay: () => (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography color="text.secondary">
                No service requests found. Create one to get started.
              </Typography>
            </Box>
          ),
        }}
      />
    </div>
  );
};

export default ServiceRequestTable;
