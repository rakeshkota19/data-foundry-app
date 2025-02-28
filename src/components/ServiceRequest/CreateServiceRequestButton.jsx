import React, { useState } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ServiceRequestForm from "./ServiceRequestForm";

const CreateServiceRequestButton = ({ onRequestCreated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitSuccess = () => {
    if (onRequestCreated) {
      onRequestCreated();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setIsModalOpen(true)}
        sx={{ mb: 3 }}
      >
        Create Service Request
      </Button>

      <ServiceRequestForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleSubmitSuccess}
      />
    </>
  );
};

export default CreateServiceRequestButton;
