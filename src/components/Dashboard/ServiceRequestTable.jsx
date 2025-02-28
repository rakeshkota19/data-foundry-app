import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Box, Typography, useMediaQuery, useTheme } from "@mui/material";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Define which columns to show based on screen size
  const baseColumns = [
    {
      field: "id",
      headerName: "Case ID",
      flex: 1,
      minWidth: 110,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Request Name",
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "severity",
      headerName: "Severity",
      flex: 0.8,
      minWidth: 100,
      align: "center",
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          <Chip
            label={params.value}
            color={getSeverityChipColor(params.value)}
            size="small"
          />
        </Box>
      ),
    },
    {
      field: "creationDate",
      headerName: "Created On",
      flex: 1,
      minWidth: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "resolutionDate",
      headerName: "Resolution By",
      flex: 1,
      minWidth: 110,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "reporterName",
      headerName: "Reporter",
      flex: 1,
      minWidth: 120,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      minWidth: 120,
      align: "left",
      headerAlign: "left",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        "& .MuiDataGrid-root": {
          overflow: "visible",
        },
      }}
    >
      <DataGrid
        rows={serviceRequests}
        columns={baseColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        disableRowSelectionOnClick
        loading={loading}
        density="comfortable"
        autoHeight={false}
        sx={{
          width: isMobile ? "max-content" : "100%",
          minWidth: "100%",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.action.hover,
            whiteSpace: "normal",
            wordWrap: "break-word",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: "2rem",
            padding: theme.spacing(1),
            alignItems: "center",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: theme.palette.action.hover,
          },
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: theme.palette.action.selectedOpacity,
          },
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "auto",
          },
          "& .MuiDataGrid-main": {
            overflow: "auto",
          },
          ...(isMobile && {
            "& .MuiDataGrid-columnHeader": {
              overflow: "visible",
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
            "& .MuiDataGrid-cell": {
              padding: "8px",
              whiteSpace: "normal",
              wordWrap: "break-word",
            },
          }),
        }}
        components={{
          NoRowsOverlay: () => (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              p={2}
            >
              <Typography color="text.secondary" align="center">
                No service requests found. Create one to get started.
              </Typography>
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default ServiceRequestTable;
