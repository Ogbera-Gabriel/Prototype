import React from "react";
import { TextField } from "@mui/material";


interface FormFieldsProps {
  register: any; 
  errors: any; 
}

const CompanyFormFields: React.FC<FormFieldsProps> = ({ register, errors }) => {
  return (
    <>
      <TextField
        {...register("firstName")}
        required
        label="First Name"
        error={!!errors.firstName}
        fullWidth
        style={{ marginBottom: "10px" }}
      />

      <TextField
        {...register("lastName")}
        required
        label="Last Name"
        error={!!errors.lastName}
        fullWidth
        style={{ marginBottom: "10px" }}
      />

      <TextField
        {...register("companyName")}
        required
        label="Company Name"
        error={!!errors.companyName}
        fullWidth
        style={{ marginBottom: "10px" }}
      />

      <TextField
        {...register("deliveryAddress")}
        required
        label="Company Delivery Address"
        error={!!errors.deliveryAddress}
        fullWidth
        style={{ marginBottom: "10px" }}
      />

      <TextField
        {...register("telephone")}
        required
        error={!!errors.telephone}
        fullWidth
        label="Company Phone Number"
        style={{ marginBottom: "10px" }}
      />

      <TextField
        {...register("email")}
        required
        error={!!errors.email}
        fullWidth
        label="Company Email"
        style={{ marginBottom: "10px" }}
      />
    </>
  );
};

export default CompanyFormFields;
