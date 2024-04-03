'use client'

import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

interface ConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  formData: {
    softwood: string;
    quantityMeasure: string | number;
    quantityUnit: string;
    length: string;
    finish: string;
    drying: string;
    strengthGrade: string;
    visualQuantity: string;
    certified?: string;
    moisture?: string;
    impregnation?: string;
  } | null;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  handleClose,
  formData,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          color: "white",
          height: "60px",
          background: "#314f32",
          marginBottom: "15px",
          fontSize: "18px",
        }}
      >
        Confirmation
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Thank you for your order. Your order details are:
        </DialogContentText>
        {formData && (
          <>
            <Typography variant="body1">
              Softwood: {formData.softwood}
            </Typography>
            <Typography variant="body1">
              Quantity: {formData.quantityMeasure}{formData.quantityUnit}
            </Typography>
            <Typography variant="body1">
              Length: {formData.length}
            </Typography>
            <Typography variant="body1">
              Finish: {formData.finish}
            </Typography>
            <Typography variant="body1">
              Drying: {formData.drying}
            </Typography>
            <Typography variant="body1">
              Strength Grade: {formData.strengthGrade}
            </Typography>
            <Typography variant="body1">
              Visual Quality: {formData.visualQuantity}
            </Typography>
            {formData.certified && (
              <Typography variant="body1">
                Certified: {formData.certified}
              </Typography>
            )}
            {formData.moisture && (
              <Typography variant="body1">
                Moisture: {formData.moisture}
              </Typography>
            )}
            {formData.impregnation && (
              <Typography variant="body1">
                Impregnation: {formData.impregnation}
              </Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{ backgroundColor: "#314f32", color: "white" }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
