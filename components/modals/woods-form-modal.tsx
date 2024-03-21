"use client";

import { FormControl, InputLabel, Select } from "@mui/material";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MenuItem from "@mui/material/MenuItem";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { green } from "@mui/material/colors";

const style = {
  dialogtile: {
      color: "white",
      height: "60p",
      background: "#314f32",
      marginBottom: "15px",
      fontSize: "18px",
  }
}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const formSchema = z.object({
  softwood: z.string().min(1, {
    message: "Softwood selection is required",
  }),
  quantityMeasure: z
    .string()
    .or(z.number())
    .refine(
      (value) => {
        if (typeof value === "number") {
          return value > 0;
        }
        return !isNaN(Number(value)) && Number(value) > 0;
      },
      {
        message: "Quantity must be a number greater than 0",
      }
    ),
  length: z.string().min(1, {
    message: "Length is required",
  }),
  finish: z.string().min(1, {
    message: "Finish is required",
  }),
  drying: z.string().min(1, {
    message: "Drying is required",
  }),
  strengthGrade: z.string().min(1, {
    message: "Strength Grade is required",
  }),
  visualQuantity: z.string().min(1, {
    message: "Visual Quality is required",
  }),
  certified: z.string().optional(),
  moisture: z.string().optional(),
  impregnation: z.string().optional(),
  firstName: z.string().min(1, {
    message: "First Name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last Name is required",
  }),
  companyName: z.string().min(1, {
    message: "Company Name is required",
  }),
  deliveryAddress: z.string().min(1, {
    message: "Delivery Address is required",
  }),
  telephone: z.string().regex(phoneRegex, "Invalid Number!"),
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export default function WoodFormModal() {
  const [open, setOpen] = useState(true);
  const [showCompany, setShowCompany] = useState(false);
  const [showWood, setShowWood] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<MyFormData | null>(null);
  const [selectedOptions, setSelectedOptions] = useState({
    softwood: "",
    quantityMeasure: "",
    length: "",
    finish: "",
    drying: "",
    strengthGrade: "",
    visualQuantity: "",
    certified: "",
    moisture: "",
    impregnation: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  type MyFormData = z.infer<typeof formSchema>;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowCompany = () => {
    setShowCompany(true);
    setShowWood(false);
  };

  const handleShowWood = () => {
    setShowCompany(false);
    setShowWood(true);
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {

    try {
      const formData = {
        woods: [
          {
            softWood: data.softwood,
            quantityMeasure: data.quantityMeasure,
            length: data.length,
            finish: data.finish,
            drying: data.drying,
            strengthGrade: data.strengthGrade,
            visualQuantity: data.visualQuantity,
            certified: data.certified,
            moisture: data.moisture,
            impregnation: data.impregnation,
          },
        ],
        company: {
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          deliveryAddress: data.deliveryAddress,
          email: data.email,
          phoneNumber: data.telephone,
        },
      };
      console.log(formData)
      // const response = await axios.post("http://localhost:8080/quotation", formData);

      // console.log(response.data);
      handleClose();
       setFormData(data);
      setShowConfirmation(true)
    } catch (error) {
      console.error("Error submmitting form:", error);
    }
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div>
      <Dialog open={showConfirmation} onClose={handleClose}>
  <DialogTitle style={style.dialogtile}>Confirmation</DialogTitle>
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
           Quantity: {formData.quantityMeasure}
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
    <Button onClick={handleClose}>Close</Button>
  </DialogActions>
</Dialog>
      <><Button onClick={handleOpen}>Open Form</Button><Dialog open={open} onClose={handleClose}>
            <DialogTitle style={style.dialogtile}>
              {showWood ? 'Wood Form' : 'Your Profile'}
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                {showWood && (
                  <>
                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                      <InputLabel id="demo-simple-select-label">SoftWood</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        label="SoftWood"
                        defaultValue={""}
                        {...register("softwood")}
                        error={!!errors.softwood}
                        value={selectedOptions.softwood}
                        onChange={(e) => setSelectedOptions({
                          ...selectedOptions,
                          softwood: e.target.value,
                        })}
                      >
                        {[
                          "Douglas 45x200",
                          "Larch 160x260",
                          "Pine 47x100",
                          "Spruce 22x45",
                          "Spruce SLS 38x140",
                        ].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      {...register("quantityMeasure")}
                      required
                      label="Quantity"
                      error={!!errors.quantityMeasure}
                      fullWidth
                      style={{ marginBottom: "10px" }} />


                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                      <InputLabel id="demo-simple-select-label">Length</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        label="Length"
                        defaultValue={""}
                        {...register("length")}
                        value={selectedOptions.length}
                        error={!!errors.length}
                        onChange={(e) => setSelectedOptions({
                          ...selectedOptions,
                          length: e.target.value,
                        })}
                      >
                        {[
                          "2400mm",
                          "2500mm",
                          "2600mm",
                          "2700mm",
                          "2800mm",
                          "2900mm",
                          "3000mm",
                          "3100mm",
                        ].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>



                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                      <InputLabel id="demo-simple-select-label">Finish</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        label="Finish"
                        defaultValue={""}
                        {...register("finish")}
                        value={selectedOptions.finish}
                        error={!!errors.finish}
                        onChange={(e) => setSelectedOptions({
                          ...selectedOptions,
                          finish: e.target.value,
                        })}
                      >
                        {["Unplanned", "Fine Sawn"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>



                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                      <InputLabel id="demo-simple-select-label">Drying</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        defaultValue={""}
                        label="Drying"
                        {...register("drying")}
                        value={selectedOptions.drying}
                        error={!!errors.drying}
                        onChange={(e) => setSelectedOptions({
                          ...selectedOptions,
                          drying: e.target.value,
                        })}
                      >
                        {["KD", "AD", "Heat Treated"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                      <InputLabel id="demo-simple-select-label">Strength</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        defaultValue={""}
                        label="Strength"
                        {...register("strengthGrade")}
                        value={selectedOptions.strengthGrade}
                        error={!!errors.strengthGrade}
                        onChange={(e) => setSelectedOptions({
                          ...selectedOptions,
                          strengthGrade: e.target.value,
                        })}
                      >
                        {["No Strength grade", "C24", "C18"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth style={{ marginBottom: "10px" }}>
                      <InputLabel id="demo-simple-select-label">
                        Visual Quality
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        required
                        defaultValue={""}
                        label="Visual Quality"
                        {...register("visualQuantity")}
                        value={selectedOptions.visualQuantity}
                        error={!!errors.visualQuantity}
                        onChange={(e) => setSelectedOptions({
                          ...selectedOptions,
                          visualQuantity: e.target.value,
                        })}
                      >
                        {["C(V)", "B (OS I-IV)", "S/F (I-V)"].map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ArrowDownwardIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>Additional Details</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FormControl fullWidth style={{ marginBottom: "10px" }}>
                          <InputLabel id="demo-simple-select-label">Certified</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={""}
                            label="Certified"
                            {...register("certified")}
                            value={selectedOptions.certified}
                            onChange={(e) => setSelectedOptions({
                              ...selectedOptions,
                              certified: e.target.value,
                            })}
                          >
                            {["No Certificate", "FSC or PEFC", "ISPM15"].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth style={{ marginBottom: "10px" }}>
                          <InputLabel id="demo-simple-select-label">Moisture</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={""}
                            label="Moisture"
                            {...register("moisture")}
                            value={selectedOptions.moisture}
                            onChange={(e) => setSelectedOptions({
                              ...selectedOptions,
                              moisture: e.target.value,
                            })}
                          >
                            {["10-14", "18-21", "15-18"].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <FormControl fullWidth style={{ marginBottom: "10px" }}>
                          <InputLabel id="demo-simple-select-label">
                            Impregnation
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={""}
                            label="Impregnation"
                            {...register("impregnation")}
                            value={selectedOptions.impregnation}
                            onChange={(e) => setSelectedOptions({
                              ...selectedOptions,
                              impregnation: e.target.value,
                            })}
                          >
                            {["Impregnated", "Not Impregnated"].map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </AccordionDetails>
                    </Accordion>


                  </>
                )}

                {showCompany && (
                  <>

                    <TextField
                      {...register("firstName")}
                      required
                      label="First Name"
                      error={!!errors.firstName}
                      fullWidth
                      style={{ marginBottom: "10px" }} />

                    <TextField
                      {...register("lastName")}
                      required
                      label="Last Name"
                      error={!!errors.lastName}
                      fullWidth
                      style={{ marginBottom: "10px" }} />

                    <TextField
                      {...register("companyName")}
                      required
                      label="Company Name"
                      error={!!errors.companyName}
                      fullWidth
                      style={{ marginBottom: "10px" }} />

                    <TextField
                      {...register("deliveryAddress")}
                      required
                      label="Company Delivery Address"
                      error={!!errors.deliveryAddress}
                      fullWidth
                      style={{ marginBottom: "10px" }} />

                    <TextField
                      {...register("telephone")}
                      required
                      error={!!errors.telephone}
                      fullWidth
                      label="Company Phone Number"
                      style={{ marginBottom: "10px" }} />

                    <TextField
                      {...register("email")}
                      required
                      error={!!errors.email}
                      fullWidth
                      label="Company Email"
                      style={{ marginBottom: "10px" }} />
                  </>
                )}

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  {showWood && (
                    <Button type="button" onClick={handleShowCompany}>
                      Next
                    </Button>
                  )}
                  {showCompany && (
                    <Button type="button" onClick={handleShowWood}>
                      {" "}
                      Back
                    </Button>
                  )}
                  {showCompany && <Button type="submit">Submit</Button>}
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog></>
  
    </div>
  );
}
