"use client";

import { Autocomplete, FormControl, InputLabel, Select } from "@mui/material";
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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MenuItem from "@mui/material/MenuItem";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { green } from "@mui/material/colors";
import ConfirmationDialog from "@/components/modals/confimation-modal";
import CompanyFormFields from "./company-modal";
import { useRouter } from "next/navigation";

const style = {
  dialogtile: {
    color: "white",
    height: "60p",
    background: "#314f32",
    marginBottom: "15px",
    fontSize: "18px",
  },
};

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

  const router = useRouter();

  const handleShowCompany = () => {
    setShowCompany(true);
    setShowWood(false);
  };

  const handleShowWood = () => {
    setShowCompany(false);
    setShowWood(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setSelectedOptions({
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
    router.push("/offer");
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    debugger;
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
      console.log(formData);
      // const response = await axios.post(
      //   process.env.NEXT_PUBLIC_SERVER_URL!,
      //   formData
      // );

      // console.log(response.data);

      handleClose();
      setFormData(data);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error submmitting form:", error);
    }
  };

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <div>
      <ConfirmationDialog
        open={showConfirmation}
        handleClose={handleCloseConfirmation}
        formData={formData}
      />
      <>
        <Button onClick={handleOpen}>Open Form</Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle style={style.dialogtile}>
            {showWood ? "Wood Form" : "Your Profile"}
          </DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              style={{ paddingBlock: "20px", width: "500px" }}
            >
              {showWood && (
                <>
                  {/* <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="demo-simple-select-label">
                      SoftWood
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      label="SoftWood"
                      defaultValue={""}
                      {...register("softwood")}
                      error={!!errors.softwood}
                      value={selectedOptions.softwood}
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          softwood: e.target.value,
                        })
                      }
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
                  </FormControl> */}

                  <Autocomplete
                    fullWidth
                    options={[
                      "Douglas 45x200",
                      "Larch 160x260",
                      "Pine 47x100",
                      "Spruce 22x45",
                      "Spruce SLS 38x140",
                    ]}
                    freeSolo
                    value={selectedOptions.softwood}
                    onChange={(event: any, newValue: string | null) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        softwood: newValue ?? "",
                      })
                    }
                    onInputChange={(event, newInputValue) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        softwood: newInputValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Softwood"
                        {...register("softwood")}
                        error={!!errors.softwood}
                        style={{ marginBottom: "10px" }} 
                      />
                    )}
                  />

                  <TextField
                    {...register("quantityMeasure")}
                    required
                    label="Quantity"
                    error={!!errors.quantityMeasure}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  />

                  {/* <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Length
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      label="Length"
                      defaultValue={""}
                      {...register("length")}
                      value={selectedOptions.length}
                      error={!!errors.length}
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          length: e.target.value,
                        })
                      }
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
                  </FormControl> */}

                  <Autocomplete
                    fullWidth
                    options={[
                      "2400mm",
                      "2500mm",
                      "2600mm",
                      "2700mm",
                      "2800mm",
                      "2900mm",
                      "3000mm",
                      "3100mm",
                    ]}
                    freeSolo
                    value={selectedOptions.length}
                    onChange={(event: any, newValue: string | null) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        length: newValue ?? "",
                      })
                    }
                    onInputChange={(event, newInputValue) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        length: newInputValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Length"
                        {...register("length")}
                        error={!!errors.length}
                        style={{ marginBottom: "10px" }} 
                      />
                    )}
                  />

                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Finish
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      label="Finish"
                      defaultValue={""}
                      {...register("finish")}
                      value={selectedOptions.finish}
                      error={!!errors.finish}
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          finish: e.target.value,
                        })
                      }
                    >
                      {["Unplanned", "Fine Sawn"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Drying
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      defaultValue={""}
                      label="Drying"
                      {...register("drying")}
                      value={selectedOptions.drying}
                      error={!!errors.drying}
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          drying: e.target.value,
                        })
                      }
                    >
                      {["KD", "AD", "Heat Treated"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  <Autocomplete
                    fullWidth
                    options={["KD", "AD", "Heat Treated"]}
                    freeSolo
                    value={selectedOptions.drying}
                    onChange={(event: any, newValue: string | null) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        drying: newValue ?? "",
                      })
                    }
                    onInputChange={(event, newInputValue) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        drying: newInputValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Drying"
                        {...register("drying")}
                        error={!!errors.drying}
                        style={{ marginBottom: "10px" }} 
                      />
                    )}
                  />

                  {/* <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Strength
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      defaultValue={""}
                      label="Strength"
                      {...register("strengthGrade")}
                      value={selectedOptions.strengthGrade}
                      error={!!errors.strengthGrade}
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          strengthGrade: e.target.value,
                        })
                      }
                    >
                      {["No Strength grade", "C24", "C18"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  <Autocomplete
                    fullWidth
                    options={["No Strength grade", "C24", "C18"]}
                    freeSolo
                    value={selectedOptions.strengthGrade}
                    onChange={(event: any, newValue: string | null) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        strengthGrade: newValue ?? "",
                      })
                    }
                    onInputChange={(event, newInputValue) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        strengthGrade: newInputValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Strength"
                        {...register("strengthGrade")}
                        error={!!errors.strengthGrade}
                        style={{ marginBottom: "10px" }} 
                      />
                    )}
                  />

                  {/* <FormControl fullWidth style={{ marginBottom: "10px" }}>
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
                      onChange={(e) =>
                        setSelectedOptions({
                          ...selectedOptions,
                          visualQuantity: e.target.value,
                        })
                      }
                    >
                      {["C(V)", "B (OS I-IV)", "S/F (I-V)"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  <Autocomplete
                    fullWidth
                    options={["C(V)", "B (OS I-IV)", "S/F (I-V)"]}
                    freeSolo
                    value={selectedOptions.visualQuantity}
                    onChange={(event: any, newValue: string | null) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        visualQuantity: newValue ?? "",
                      })
                    }
                    onInputChange={(event, newInputValue) =>
                      setSelectedOptions({
                        ...selectedOptions,
                        visualQuantity: newInputValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Visual Quality"
                        {...register("visualQuantity")}
                        error={!!errors.visualQuantity}
                        style={{ marginBottom: "10px" }} 
                      />
                    )}
                  />

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDownwardIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Typography>Additional Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <FormControl fullWidth style={{ marginBottom: "10px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Certified
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={""}
                          label="Certified"
                          {...register("certified")}
                          value={selectedOptions.certified}
                          onChange={(e) =>
                            setSelectedOptions({
                              ...selectedOptions,
                              certified: e.target.value,
                            })
                          }
                        >
                          {["No Certificate", "FSC or PEFC", "ISPM15"].map(
                            (option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl> */}

                      <Autocomplete
                        fullWidth
                        options={["No Certificate", "FSC or PEFC", "ISPM15"]}
                        freeSolo
                        value={selectedOptions.certified}
                        onChange={(event: any, newValue: string | null) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            certified: newValue ?? "",
                          })
                        }
                        onInputChange={(event, newInputValue) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            certified: newInputValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Certified"
                            {...register("certified")}
                            error={!!errors.certified}
                            style={{ marginBottom: "10px" }} 
                          />
                        )}
                      />

                      {/* <FormControl fullWidth style={{ marginBottom: "10px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Moisture
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue={""}
                          label="Moisture"
                          {...register("moisture")}
                          value={selectedOptions.moisture}
                          onChange={(e) =>
                            setSelectedOptions({
                              ...selectedOptions,
                              moisture: e.target.value,
                            })
                          }
                        >
                          {["10-14", "18-21", "15-18"].map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl> */}
                      <Autocomplete
                        fullWidth
                        options={["10-14", "18-21", "15-18"]}
                        freeSolo
                        value={selectedOptions.moisture}
                        onChange={(event: any, newValue: string | null) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            moisture: newValue ?? "",
                          })
                        }
                        onInputChange={(event, newInputValue) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            moisture: newInputValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Moisture"
                            {...register("moisture")}
                            error={!!errors.impregnation}
                            style={{ marginBottom: "10px" }}
                          />
                        )}
                      />
                      <Autocomplete
                        fullWidth
                        options={["Impregnated", "Not Impregnated"]}
                        freeSolo
                        value={selectedOptions.impregnation}
                        onChange={(event: any, newValue: string | null) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            impregnation: newValue ?? "",
                          })
                        }
                        onInputChange={(event, newInputValue) =>
                          setSelectedOptions({
                            ...selectedOptions,
                            impregnation: newInputValue,
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Impregnation"
                            {...register("impregnation")}
                            error={!!errors.impregnation}
                          />
                        )}
                      />
                    </AccordionDetails>
                  </Accordion>
                </>
              )}

              {showCompany && (
                <CompanyFormFields register={register} errors={errors} />
              )}

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {showWood && (
                  <Button
                    type="button"
                    onClick={handleShowCompany}
                    style={{ backgroundColor: "#314f32", color: "white" }}
                  >
                    Next
                  </Button>
                )}
                {showCompany && (
                  <Button type="button" onClick={handleShowWood}>
                    {" "}
                    Back
                  </Button>
                )}
                {showCompany && (
                  <Button
                    type="submit"
                    style={{ backgroundColor: "#314f32", color: "white" }}
                  >
                    Submit
                  </Button>
                )}
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}
