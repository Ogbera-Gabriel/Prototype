"use client";

import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@mui/material";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
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

import ConfirmationDialog from "@/components/modals/confimation-modal";
import CompanyFormFields from "./company-modal";
import { useRouter } from "next/navigation";

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

  const handleChangeQuantityMeasure = (event :React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptions({
      ...selectedOptions,
      quantityMeasure: event.target.value,
    });
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
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL!,
        formData
      );

      console.log(response.data);

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
          <DialogTitle
            sx={{
              color: "white",
              height: "60px",
              background: "#314f32",
              marginBottom: "15px",
              fontSize: {
                xs: "13px",
                sm: "18px",
              },
            }}
          >
            {showWood
              ? `Wood Type: ${selectedOptions.softwood} ${selectedOptions.finish} ${selectedOptions.length} ${selectedOptions.quantityMeasure} Rounded ${selectedOptions.strengthGrade} ${selectedOptions.drying} ${selectedOptions.certified} ${selectedOptions.visualQuantity} ${selectedOptions.impregnation}`
              : "Your Profile"}
          </DialogTitle>
          <DialogContent>
            <div style={{ display: "flex" }}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                style={{ flex: 1, paddingBlock: "20px", marginRight: "20px" }}
              >
                {showWood && (
                  <div>
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
                          required
                          error={!!errors.softwood}
                          style={{ marginBottom: "10px" }}
                        />
                      )}
                    />

                    <TextField
                      {...register("quantityMeasure")}
                      onChange={handleChangeQuantityMeasure}
                      type="number"
                      required
                      label="Quantity"
                      error={!!errors.quantityMeasure}
                      fullWidth
                      style={{ marginBottom: "10px" }}
                    />

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
                          required
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
                        label="Finish*"
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
                          required
                          error={!!errors.drying}
                          style={{ marginBottom: "10px" }}
                        />
                      )}
                    />

                    <Autocomplete
                      fullWidth
                      options={["No Strength Grade", "C24", "C18"]}
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
                          required
                          error={!!errors.strengthGrade}
                          style={{ marginBottom: "10px" }}
                        />
                      )}
                    />

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
                          required
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
                  </div>
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
              {showWood && (
                <div
                  className="specify"
                  style={{ flex: 1, marginRight: 2, marginLeft: 2 }}
                >
                  <h3>Specifications</h3>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Category:</div>
                    <div className="specify_thriddiv">Sawn timber</div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">SoftWood:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.softwood}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Quantity:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.quantityMeasure}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Finish:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.finish}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Length:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.length}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Drying:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.drying}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Strength Grade:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.strengthGrade}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Edges:</div>
                    <div className="specify_thriddiv">Rounded</div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Visual:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.visualQuantity}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Certificate:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.certified}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Impregnated:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.impregnation}
                    </div>
                  </div>
                  <div className="specify_firstdiv">
                    <div className="specify_seconddiv">Moisture:</div>
                    <div className="specify_thriddiv">
                      {selectedOptions.moisture}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
}
