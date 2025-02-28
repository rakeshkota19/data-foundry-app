import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  FormHelperText,
  CircularProgress,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { format, addDays } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/api";

const severityOptions = [
  { value: "Low", days: 5 },
  { value: "Medium", days: 3 },
  { value: "High", days: 1 },
];

const initialFormState = {
  name: "",
  description: "",
  creationDate: "",
  severity: "",
  reporterName: "",
  reporterEmail: "",
  location: "",
};

const client = generateClient();

const ServiceRequestForm = ({ open, onClose, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateResolutionDate = () => {
    if (!formData.creationDate) return "";

    const creationDate = new Date(formData.creationDate);
    const severityOption = severityOptions.find(
      (option) => option.value === formData.severity
    );

    if (!severityOption || !creationDate) return "";
    const daysToAdd = severityOption ? severityOption.days : 5;

    return format(addDays(creationDate, daysToAdd), "yyyy-MM-dd");
  };

  const resolutionDate = calculateResolutionDate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Service Request Name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.reporterName.trim()) {
      newErrors.reporterName = "Reporter Name is required";
    }

    if (!formData.reporterEmail.trim()) {
      newErrors.reporterEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.reporterEmail)) {
      newErrors.reporterEmail = "Invalid email address";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await client.models.ServiceRequest.create({
        id: uuidv4(),
        name: formData.name,
        description: formData.description,
        creationDate: formData.creationDate,
        severity: formData.severity,
        resolutionDate,
        reporterName: formData.reporterName,
        reporterEmail: formData.reporterEmail,
        location: formData.location,
      });

      setFormData({ ...initialFormState });
      setErrors({});
      onSubmitSuccess();
      onClose();
    } catch (error) {
      console.error("Error creating service request:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create service request. Server Error.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...initialFormState });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">Create Service Request</Typography>
      </DialogTitle>

      <DialogContent dividers>
        {errors.submit && (
          <Box
            sx={{
              bgcolor: "error.light",
              p: 2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography color="error">{errors.submit}</Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Service Request Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(errors.name)}
              helperText={errors.name}
              placeholder="E.g., Unable to upload data"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              error={Boolean(errors.description)}
              helperText={errors.description}
              placeholder="Describe the issue in detail"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="creationDate"
              label="Creation Date"
              type="date"
              value={formData.creationDate}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="severity-label">Severity</InputLabel>
              <Select
                labelId="severity-label"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                label="Severity"
              >
                {severityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="reporterName"
              label="Reporter Name"
              value={formData.reporterName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(errors.reporterName)}
              helperText={errors.reporterName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="reporterEmail"
              label="Contact Information"
              type="email"
              value={formData.reporterEmail}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(errors.reporterEmail)}
              helperText={errors.reporterEmail}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={Boolean(errors.location)}
              helperText={errors.location}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Resolution Date"
              value={resolutionDate}
              fullWidth
              variant="outlined"
              disabled
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleCancel} color="inherit" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceRequestForm;
