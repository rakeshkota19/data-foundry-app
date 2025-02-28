// src/components/Files/FilesPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import GetAppIcon from "@mui/icons-material/GetApp";
import { list, getUrl, downloadData } from "@aws-amplify/storage";

import LoadingSpinner from "../components/LoadingSpinner";

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    loadImageUrls();
  }, [files]);

  const fetchFiles = async (path) => {
    setLoading(true);
    try {
      const response = await list({
        path: "auth-images/",
      });

      console.log("vinay", typeof response, response);

      const filteredFiles = response.items.filter(
        (file) => !file.path.endsWith("/") && file.size > 0
      );
      setFiles(filteredFiles);
    } catch (error) {
      console.error("Error fetching files from S3:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadImageUrls = async () => {
    const imageFiles = files.filter((file) => isImageFile(file.path));

    for (const file of imageFiles) {
      try {
        const result = await getUrl({ path: file.path });
        setImageUrls((prev) => ({
          ...prev,
          [file.path]: result.url,
        }));
      } catch (e) {
        console.error("Error getting URL for", file.path, e);
      }
    }
  };

  const isImageFile = (filePath) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    const extension = filePath.split(".").pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  // const handleDownload = async (filePath) => {
  //   try {
  //     const blob = await downloadData({ key: filePath });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = getFileNameFromPath(filePath);
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  const getFileNameFromPath = (path) => {
    // Extract filename from the path
    const parts = path.split("/");
    return parts[parts.length - 1] || path;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Files
        </Typography>
        <Typography variant="body1" color="textSecondary">
          View files from S3 storage
        </Typography>
      </Box>

      {loading ? (
        <LoadingSpinner message="Loading files..." />
      ) : (
        <Grid container spacing={3}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      height: 200,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "background.default",
                    }}
                  >
                    {isImageFile(file.path) && imageUrls[file.path] ? (
                      <CardMedia
                        component="img"
                        sx={{
                          height: "100%",
                          objectFit: "contain",
                          maxWidth: "100%",
                        }}
                        image={imageUrls[file.path]}
                        alt={getFileNameFromPath(file.path)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <DescriptionIcon
                          sx={{ fontSize: 64, color: "text.secondary" }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          align="center"
                          sx={{ mt: 1 }}
                        >
                          {file.path.split(".").pop().toUpperCase()}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body1"
                      component="h2"
                      noWrap
                      title={file.path}
                    >
                      {getFileNameFromPath(file.path)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {file.size > 1024 * 1024
                        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                        : `${(file.size / 1024).toFixed(2)} KB`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", py: 5 }}>
                <Typography variant="h6" color="textSecondary">
                  No files found
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default FilesPage;
